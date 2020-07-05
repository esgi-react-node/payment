const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");
const Merchant = require("./Merchant");
const Address = require("./Address");
const denormalizeTransaction = require("./hooks/denormalizationTransaction");

class Transaction extends Model {
  isOwner(merchant) {
    return this.MerchantId === merchant.id;
  }
}
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
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tag: {
      type: DataTypes.STRING
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

Transaction.addHook("afterCreate", (transaction) => {
  denormalizeTransaction(Transaction, transaction.id, "create");
});
Transaction.addHook("afterUpdate", (transaction) => {
  denormalizeTransaction(Transaction, transaction.id, "update");
});
Transaction.addHook("afterDestroy", (transaction) => {
  denormalizeTransaction(Transaction, transaction.id, "delete");
});

module.exports = Transaction;
