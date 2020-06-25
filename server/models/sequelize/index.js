const sequelize = require("../../lib/sequelize");
const Currency = require('./Currency');
const Rate = require('./Rate');

sequelize
  .sync({ alter: true })
  .then((result) => console.log("Sequelize models synced"))
  .catch((result) => console.error("Error while syncing models"));

module.exports = {
  sequelize,
  Currency,
  Rate
};
