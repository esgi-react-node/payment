const express = require("express");
const handleValidationError = require("../helpers/handleValidationError");
const { Transaction } = require("../models/sequelize");
const router = express.Router();

router.get('/:id', async (req, res) => {
  const transaction = await Transaction.findByPk(req.params.id);
  const {validUrl, cancelUrl} = req.query;
  transaction.amount = transaction.amount / 100;
  const cart = transaction.cart.map(el => ({...el, price: el.price/100}))
  return res.render('payment', {
    transaction,
    cart,
    validUrl,
    cancelUrl
  })
})

module.exports = router;
