const mongoose = require("mongoose");
const db = require("../lib/db");

const Schema = new mongoose.Schema(
  {
    id: Number,
    type: String,
    amout: Number,
    status: String,
    createdAt:Date,
    updatedAt:Date,
    deletedAt:Date,
    TransactionId:Object,
    RateId:Object

  },
  {
    collection: "Operations",
  }
);

const Operation = mongoose.model("Operation", Schema);

module.exports = Operation;
