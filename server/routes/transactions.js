const express = require("express");
const handleValidationError = require("../helpers/handleValidationError");
const { Operation, Transaction } = require("../models/sequelize");
const router = express.Router();

// CGET
router.get("/", (req, res) => {
  Transaction.findAll({
    paranoid: false
  })
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

// POST
router.post("/", async (req, res) => {
  const {amount, tag, merchantId} = req.body;
  const transaction = await Transaction.create({
    tag,
    status: 'pending',
    MerchantId: merchantId
  });
  Operation.create({
    type: 'payin',
    amount,
    status: 'pending',
    TransactionId: transaction.id
  }).then((data) => res.status(201).json(data))
    .catch((error) => {
      handleValidationError(res, error);
    });
});

// GET
router.get("/:id", (req, res) => {
  Transaction.findByPk(req.params.id, {
    include: [{
      model: Operation
    }]
  })
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// REFUND
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
