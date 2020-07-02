const express = require("express");
const handleValidationError = require("../helpers/handleValidationError");
const { Merchant, Address, Transaction, Operation } = require("../models/sequelize");
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.user.isAdmin()) {
    return Merchant.findAll({where: {UserId: req.user.id}})
      .then(merchants => res.json(merchants))
      .catch(err => {
        console.error(err);
        return res.sendStatus(500);
      });
  }
  return Merchant.findAll()
    .then(merchants => res.json(merchants))
    .catch(err => {
      console.error(err);
      return res.sendStatus(500);
    });
})

router.get("/:id", (req,res) => {
  Merchant.findByPk(req.params.id)
    .then(merchant => {
      if (!merchant) {
        return res.sendStatus(404);
      }
      if (req.user.isAdmin() || merchant.isOwner(req.user)) {
        return res.json(merchant);
      }
      return res.sendStatus(403);
    })
    .catch(err => {
      console.error(err);
      return res.sendStatus(500);
    });
})

router.post('/', (req, res) => {
  const merchantData = {...req.body};
  merchantData.status = 'pending';
  merchantData.credit = 0;
  merchantData.UserId = req.user.id;

  const merchantAddressData = merchantData.address;

  return Merchant.create(merchantData)
    .then(merchant => {
      merchantAddressData.MerchantId = merchant.id;
      Address.create(merchantAddressData)
        .then(address => {
          const merchantObj = merchant.toJSON();
          merchantObj.address = address.toJSON();
          res.status(201).json(merchantObj);
        })
        .catch(err => handleValidationError(res, err));
    })
    .catch(err => handleValidationError(res, err));
})

router.put("/:id/validate", async (req, res) => {
  const merchant = await Merchant.findByPk(req.params.id);
  if (!merchant) { return res.sendStatus(404) }

  merchant.status = 'validated';
  merchant.save()
    .then(merchant => res.status(200).send(merchant))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

router.get("/:id/credentials", async (req, res) => {
  // Generate credentials
})

router.delete("/:id/credentials", async (req,res) => {
  // revoke credentials
})

router.get("/:id/transactions", async (req, res) => {
  const merchant = await Merchant.findByPk(req.params.id);
  if (!merchant) { return res.sendStatus(404) }
  if (!req.user.isAdmin() && !merchant.isOwner(req.user)) { return res.sendStatus(403) }

  return Transaction.findAll({
    where: {MerchantId: merchant.id},
    include: [{
      model: Operation
    }, {
      model: Address,
      as: 'billing'
    }, {
      model: Address,
      as: 'shipping'
    }]
  })
    .then(transactions => res.json(transactions))
    .catch(err => {
      console.error(err);
      return res.sendStatus(500);
    })
})
module.exports = router;
