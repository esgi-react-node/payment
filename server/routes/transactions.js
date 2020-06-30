const express = require("express");
const handleValidationError = require("../helpers/handleValidationError");
const { Operation, Transaction, Address } = require("../models/sequelize");
const PspService = require('../services/pspService');
const router = express.Router();

// get all transactions
router.get("/", (req, res) => {
  Transaction.findAll({
    paranoid: false
  })
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

// create a transaction
router.post("/", async (req, res) => {
  const {customerId, tag, billing, shipping, cart, amount, merchantId} = req.body;
  const billingAddress = await Address.create(billing);
  const shippingAddress = await Address.create(shipping);
  Transaction.create({
    customerId,
    billingId: billingAddress.id,
    shippingId: shippingAddress.id,
    cart,
    tag,
    amount,
    status: 'created',
    MerchantId: merchantId
  }).then((data) => res.status(201).json(data))
    .catch((error) => {
      handleValidationError(res, error);
    });
});

// get single transaction
router.get("/:id", (req, res) => {
  Transaction.findByPk(req.params.id, {
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
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// payment process
router.post("/:id/payment", async (req, res) => {
  const {creditCardInfo, amount} = req.body;
  const transaction = await Transaction.findByPk(req.params.id)
  if (transaction.status === 'payed') { return res.status(500).send('Transaction already payed')}
  const operation = await Operation.create({
    type: 'capture',
    amount,
    status: 'pending',
    TransactionId: transaction.id
  });
  PspService.processPayment(amount, creditCardInfo).then(async () => {
    operation.status = 'done';
    await operation.save();
    if (amount === transaction.amount) {
      transaction.status = 'payed';
      await transaction.save();
    }
    return res.sendStatus(200);
  }).catch(err => {
    console.error(err);
    res.sendStatus(500);
  })
})

// refund transaction
router.post("/:id/refund", async (req, res) => {
  const { amount } = req.body;
  const transaction = await Transaction.findByPk(req.params.id, {
    include: [{
      model: Operation
    }]
  });
  const payinOperation = transaction.Operations.find(op => op.type === 'payin');
  const refundOperations = transaction.Operations.filter(op => op.type === 'refund');
  const refundedAmount = refundOperations.reduce((acc, el) => acc += el.amount, 0);
  const leftToRefund = payinOperation.amount - refundedAmount;

  if(amount > payinOperation.amount || amount > leftToRefund) {
    return res.status(500).send('Refund amount can\'t be above intial payment or inital payment minus already refunded amount');
  }

  Operation.create({
    type: 'refund',
    amount,
    status: 'pending',
    TransactionId: transaction.id
  }).then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch((err) => {
      console.error(err);
      return res.status(500).send('Can\'t create refund');
    });
});



module.exports = router;
