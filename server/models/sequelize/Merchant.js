const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");

class Merchant extends Model {}
Merchant.init(
  {
    name: {
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

module.exports = Merchant;
