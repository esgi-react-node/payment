const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");
const Merchant = require("./Merchant");
const Currency = require("./Currency");

class Transaction extends Model {}
Transaction.init(
  {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Transaction",
    paranoid: true,
  }
);

Transaction.belongsTo(Merchant);
Merchant.hasMany(Transaction);

Transaction.belongsTo(Currency);
Currency.hasMany(Transaction);

module.exports = Transaction;
