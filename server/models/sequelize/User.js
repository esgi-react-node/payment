const sequelize = require("../../lib/sequelize");
const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");

// Generation du model
class User extends Model {}
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email non valide",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: DataTypes.STRING,
    lastname: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    },
  },
  {
    sequelize,
    modelName: "User",
    paranoid: true,
  }
);

User.addHook("beforeCreate", async (user, options) => {
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;
