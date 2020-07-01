const express = require("express");
const handleValidationError = require("../helpers/handleValidationError");
const { Merchant, Address } = require("../models/sequelize");
const router = express.Router();

router.get('/', (req, res) => {
  Merchant.findAll()
    .then(merchants => {
      return res.json(merchants);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

router.get("/:id", (req,res) => {
  Merchant.findByPk(req.params.id)
    .then(merchant => res.json(merchant))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

router.post('/', async (req, res) => {
  const merchantData = {...req.body};
  merchantData.status = 'pending';
  merchantData.credit = 0;

  let merchant = null;
  await Merchant.create(merchantData)
    .then(merch => merchant = merch)
    .catch(err => handleValidationError(err, res))

  const merchantAddressData = merchantData.address;
  merchantAddressData.MerchantId = merchant.id;

  const merchantAddress = await Address.create(merchantAddressData);

  const merchantObj = merchant.toJSON();
  merchantObj.address = merchantAddress.toJSON();

  res.status(201).json(merchantObj);
})

router.put("/:id/validate", async (req, res) => {
  const merchant = await Merchant.findByPk(req.params.id);
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

module.exports = router;
