const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");
const Address = require("./Address");
const User = require("./User");

class Merchant extends Model {
  isOwner(user) {
    return this.UserId === user.id;
  }
}
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
    },
    token: {
      type: DataTypes.STRING,
      unique: true
    },
    secret: {
      type: DataTypes.STRING,
      unique: true
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

Merchant.belongsTo(User);
User.hasMany(Merchant);

module.exports = Merchant;
