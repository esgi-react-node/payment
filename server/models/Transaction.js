const mongoose = require("mongoose");
const db = require("../lib/db");

const Schema = new mongoose.Schema(
  {
    tag: String,
    status: String,
    Merchand: Array,
  },
  {
    collection: "Transactions",
  }
);

const Transaction = mongoose.model("Transaction", Schema);

module.exports = Transaction;
