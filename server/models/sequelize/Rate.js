const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");

// Generation du model
class Rate extends Model {}
Rate.init(
  {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type:DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Rate",
    paranoid: true,
  }
);

module.exports = Rate;
