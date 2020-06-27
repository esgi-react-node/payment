const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");
const Currency = require("./Currency");

class Merchant extends Model {}
Merchant.init(
  {
    name: {
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
Merchant.belongsTo(Currency);
Currency.hasMany(Merchant);

module.exports = Merchant;
