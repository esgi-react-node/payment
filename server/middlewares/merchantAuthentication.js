const { Merchant, User } = require("../models/sequelize");
const { extractCredentials } = require("../lib/credentials");
const excludedRoutes = require('../constants/excludedRoutes');

const verifiyMerchant = (req, res, next) => {
  if (excludedRoutes.some(link => req.path.match(link))) { return next(); }
  if (req.user instanceof User) { return next(); }

  let authHeader = req.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Basic")) {
    res.sendStatus(401);
    return;
  }
  authHeader = authHeader.replace("Basic ", "");

  const {token, secret} = extractCredentials(authHeader);
  Merchant.findOne({where: {token, secret}})
    .then(merchant => {
      req.merchant = merchant;
      next()
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(401)
    });

};

module.exports = verifiyMerchant;
