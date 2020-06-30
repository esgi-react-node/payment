const sequelize = require("../../lib/sequelize");
const Rate = require('./Rate');
const Merchant = require('./Merchant');
const Transaction = require('./Transaction');
const User = require('./User');
const Operation = require("./Operation");
const Address = require('./Address');

sequelize
  .sync({ alter: true })
  .then((result) => console.log("Sequelize models synced"))
  .catch((error) => console.error("Error while syncing models", error));

module.exports = {
  sequelize,
  Rate,
  Merchant,
  Operation,
  Transaction,
  User,
  Address,
};
