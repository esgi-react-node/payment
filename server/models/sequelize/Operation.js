const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");
const Transaction = require("./Transaction");
const Rate = require('./Rate');

class Operation extends Model {}
Operation.init(
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Operation",
    paranoid: true,
  }
);

Operation.belongsTo(Transaction);
Transaction.hasMany(Operation);

Operation.belongsTo(Rate);
Rate.hasMany(Operation);


module.exports = Operation;
