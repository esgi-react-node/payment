const mongoose = require("mongoose");
const db = require("../lib/db");

const Schema = new mongoose.Schema(
  {
    id: Number,
    amount: String,
    cart: Object,
    customerId: String,
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
