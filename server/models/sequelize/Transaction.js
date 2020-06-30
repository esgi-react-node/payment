const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");
const Merchant = require("./Merchant");
const Address = require("./Address");

class Transaction extends Model {}
Transaction.init(
  {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cart: {
      type: DataTypes.JSON,
      allowNull: false
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: "Transaction",
    paranoid: true,
  }
);

Transaction.belongsTo(Merchant);
Merchant.hasMany(Transaction);

Transaction.belongsTo(Address, {as: 'billing'});
Transaction.belongsTo(Address, {as: 'shipping'});
Address.hasMany(Transaction);

module.exports = Transaction;
