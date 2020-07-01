const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");
const Address = require("./Address");

class Merchant extends Model {}
Merchant.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    KBISUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cancelUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    credit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Merchant",
    paranoid: true,
  }
);

Address.belongsTo(Merchant);
Merchant.hasOne(Address);

module.exports = Merchant;
