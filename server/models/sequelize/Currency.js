const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");
const Rate = require("./Rate");

// Generation du model
class Currency extends Model {}
Currency.init(
  {
    base: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Currency",
    paranoid: true,
  }
);

Rate.belongsTo(Currency);
Currency.hasMany(Rate);

module.exports = Currency;
