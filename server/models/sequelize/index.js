const sequelize = require("../../lib/sequelize");
const Rate = require('./Rate');
const Merchant = require('./Merchant');
const Transaction = require('./Transaction');
const User = require('./User');

sequelize
  .sync({ alter: true })
  .then((result) => console.log("Sequelize models synced"))
  .catch((result) => console.error("Error while syncing models"));

module.exports = {
  sequelize,
  Rate,
  Merchant,
  Transaction,
  User
};
