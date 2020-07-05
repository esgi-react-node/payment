const mongoose = require("mongoose");
const db = require("../lib/db");

const Schema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    KBISUrl: String,
    currency: String,
    contactName: String,
    email: String,
    phoneNumber: String,
    confirmUrl: String,
    cancelUrl: String,
    status: String,
    credit: String,
    Address:Object,
    createdAt:Date,
    updatedAt:Date,
    deletedAt:Date

  },
  {
    collection: "Merchants",
  }
);

const Merchant = mongoose.model("Merchant", Schema);

module.exports = Merchant;
