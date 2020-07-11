const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    id: Number,
    amount: Number,
    cart: Object,
    customerId: String,
    orderId: Number,
    tag: String,
    status: String,
    Merchant:Object,
    billing:Object,
    shipping:Object,
    createdAt:Date,
    updatedAt:Date,
    deletedAt:Date
  },
  {
    collection: "Transactions",
  }
);

const Transaction = mongoose.model("Transaction", Schema);

module.exports = Transaction;
