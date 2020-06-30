const mongoose = require("mongoose");
const db = require("../lib/db");

const Schema = new mongoose.Schema(
  {
    id:Number,
    tag: String,
    status: String,
    createdAt:Date,
    updatedAt:Date,
    deletedAt:Date,
    Merchant: Array,
  },
  {
    collection: "Transactions",
  }
);

const Transaction = mongoose.model("Transaction", Schema);

module.exports = Transaction;
