const JWTVerifyToken = require("../lib/auth").verifyToken;
const { User } = require("../models/sequelize");
const excludedRoutes = require('../constants/excludedRoutes');

const verifyToken = (req, res, next) => {
  if(excludedRoutes.some(link => req.path.match(link))) { return next(); }

  let authHeader = req.get("Authorization");
  const [headerAuthType, headerToken] = authHeader.split(' ');
  if (!authHeader || !['Bearer', 'Basic'].includes(headerAuthType)) {
    res.sendStatus(401);
    return;
  }

  // User Authorization
  if (headerAuthType === 'Bearer') {
    return JWTVerifyToken(headerToken)
      .then(async (payload) => {
        const user = await User.findOne({where: {username: payload.username}});
        req.user = user;
        next();
      })
      .catch((err) => {
        console.error(err);
        return res.sendStatus(401)
      });
  }

  // Go to merchant middleware
  if (headerAuthType === 'Basic') {
    return next()
  }
};

module.exports = verifyToken;
