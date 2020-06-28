const sequelize = require("../../lib/sequelize");
const Rate = require('./Rate');

sequelize
  .sync({ alter: true })
  .then((result) => console.log("Sequelize models synced"))
  .catch((result) => console.error("Error while syncing models"));

module.exports = {
  sequelize,
  Rate
};
