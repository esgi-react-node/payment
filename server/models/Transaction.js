const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    id: Number,
    amount: String,
    cart: Object,
    customerId: String,
    tag: String,
    status: String,
    Merchant:Object,
    Billing:Object,
    Shipping:Object
  },
  {
    collection: "Transactions",
  }
);

const Transaction = mongoose.model("Transaction", Schema);

module.exports = Transaction;
