const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");
const { generateCredentials } = require('../../lib/credentials');
const Address = require("./Address");
const User = require("./User");
// const Transaction = require("./Transaction");
const denormalize = require("./hooks/denormalizationMerchant");

class Merchant extends Model {
  isOwner(user) {
    return this.UserId === user.id;
  }

  generateCredentials() {
    const {token, secret} = generateCredentials();
    this.token = token;
    this.secret = secret;
    return this.save();
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

Merchant.addHook("afterCreate", (merchant) => {
  denormalize(Merchant, merchant.id, "create");
});
Merchant.addHook("afterUpdate", (merchant) => {
  denormalize(Merchant, merchant.id, "update");
});
Merchant.addHook("afterDestroy", (merchant) => {
  denormalize(Merchant, merchant.id, "delete");
});

module.exports = Merchant;
