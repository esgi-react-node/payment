const express = require("express");
const handleValidationError = require("../helpers/handleValidationError");
const {merchantAccessFilterOwnerOrAdmin, merchantAccessFilterAdmin} = require("../helpers/merchantAccessFilter");
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

router.get("/:id", async (req,res) => {
  const merchant = await merchantAccessFilterOwnerOrAdmin(req,res);
  return res.json(merchant);
});

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
  const merchant = await merchantAccessFilterAdmin(req,res);

  merchant.status = 'validated';
  merchant.generateCredentials()
    .then(merchant => res.status(200).send(merchant))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

router.get("/:id/credentials", async (req, res) => {
  const merchant = await merchantAccessFilterOwnerOrAdmin(req,res);

  merchant.generateCredentials()
    .then(merchant => res.json(merchant))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

router.delete("/:id/credentials", async (req,res) => {
  const merchant = await merchantAccessFilterOwnerOrAdmin(req,res);

  merchant.token = null;
  merchant.secret = null;
  merchant.save()
    .then(merchant => res.json(merchant))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

router.get("/:id/transactions", async (req, res) => {
  const merchant = await merchantAccessFilterOwnerOrAdmin(req,res);

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
