const mongoose = require("mongoose");

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
    token: String,
    secret: String,
    Address:Object,
    User:Object,
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
