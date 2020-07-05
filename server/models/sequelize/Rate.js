const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");
const denormalizeOperation = require("./hooks/denormalizationTransaction");
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

const onHookRate = (rate) => denormalizeOperation(Operation, rate.transaction.id);
Rate.addHook("afterCreate", onHookRate);
Rate.addHook("afterUpdate", onHookRate);
Rate.addHook("afterDestroy", onHookRate);

module.exports = Rate;
