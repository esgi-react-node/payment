const express = require("express");
const handleValidationError = require("../helpers/handleValidationError");
const { Operation, Transaction, Address } = require("../models/sequelize");
const TransactionMongo = require('../models/mongoose/Transaction');
const PspService = require('../services/pspService');
const MerchantService = require('../services/MerchantService');
const router = express.Router();

const notMerchantOrAdmin = (req) => {
  return (!req.user || !req.user.isAdmin()) && !req.merchant;
}

// get all transactions
router.get("/", (req, res) => {
  if(notMerchantOrAdmin(req)) {
    return res.sendStatus(403);
  }
  const options = {
    paranoid: true,
    include: [{model: Operation}]
  }

  if(req.merchant) {
    options.where = { MerchantId: req.merchant.id }
  }
  return Transaction.findAll(options)
    .then((data) => res.json(data))
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
});

router.get("/search", (req, res) => {
  const searchParams = {...req.query};
  TransactionMongo.find(searchParams)
    .then(transactions => res.json(transactions))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

// create a transaction
router.post("/", async (req, res) => {
  if (!req.merchant) { return res.sendStatus(403) }
  const {customerId, orderId, tag, billing, shipping, cart, amount} = req.body;
  const billingAddress = await Address.create(billing);
  const shippingAddress = await Address.create(shipping);
  Transaction.create({
    customerId,
    billingId: billingAddress.id,
    shippingId: shippingAddress.id,
    cart,
    orderId,
    tag,
    amount,
    status: 'created',
    MerchantId: req.merchant.id
  }).then((transaction) => {
    res.status(201).json({
      transaction,
      checkoutUrl: `http://localhost:3000/process/${transaction.id}`
    })
  })
    .catch((error) => {
      handleValidationError(res, error);
    });
});

// get single transaction
router.get("/:id", (req, res) => {
  if (notMerchantOrAdmin(req)) {
    return res.sendStatus(403);
  }
  return Transaction.findByPk(req.params.id, {
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
    .then(transaction => {
      if (req.merchant && !transaction.isOwner(req.merchant)) {
        return res.sendStatus(403);
      }
      return transaction ? res.json(transaction) : res.sendStatus(404)
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// payment process
router.post("/:id/payment", async (req, res) => {
  let {amount, validUrl} = req.body;
  amount *= 100;
  const creditCardInfo = {...req.body};
  const transaction = await Transaction.findByPk(req.params.id)
  if (transaction.status === 'paid') { return res.status(500).send('Transaction already paid')}
  await Operation.create({
    type: 'capture',
    amount,
    status: 'pending',
    TransactionId: transaction.id
  });
  transaction.status = 'pending';
  await transaction.save();
  res.redirect(validUrl);
  PspService.processPayment(transaction.id, amount, creditCardInfo);
})

// refund transaction
router.post("/:id/refund", async (req, res) => {
  const { amount } = req.body;
  const transaction = await Transaction.findByPk(req.params.id, {
    include: [{
      model: Operation
    }]
  });

  if (!req.merchant || !transaction.isOwner(req.merchant)) {
    return res.sendStatus(403);
  }

  const payinOperation = transaction.Operations.find(op => op.type === 'capture');
  const refundOperations = transaction.Operations.filter(op => op.type === 'refund');
  const refundedAmount = refundOperations.reduce((acc, el) => acc += el.amount, 0);
  const leftToRefund = payinOperation.amount - refundedAmount;

  if(amount > payinOperation.amount || amount > leftToRefund) {
    return res.status(500).send('Refund amount can\'t be above intial payment or inital payment minus already refunded amount');
  }

  Operation.create({
    type: 'refund',
    amount,
    status: 'done',
    TransactionId: transaction.id
  }).then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch((err) => {
      console.error(err);
      return res.status(500).send('Can\'t create refund');
    });
});

router.post("/:id/cancel", async (req, res) => {
  const {cancelUrl} = req.body;
  const transaction = await Transaction.findByPk(req.params.id);
  if (transaction.status === 'paid') { return res.sendStatus(403) }
  transaction.status = 'cancel';
  await transaction.save();
  await MerchantService.cancelTransaction(transaction);
  res.redirect(cancelUrl);
})

router.put("/:id/confirm", async (req,res) => {
  const transaction = await Transaction.findByPk(req.params.id,{
    include:[{
      model:Operation
    }]
  });

  const captureOperation = transaction.Operations.find(op => op.type === 'capture');
  captureOperation.status = 'done';
  await captureOperation.save();

  if (captureOperation.amount === transaction.amount) {
    transaction.status = 'paid';
    await transaction.save();
  }

  MerchantService.confirmTransaction(transaction);
  return res.sendStatus(200);
})

module.exports = router;
