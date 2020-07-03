const { Merchant } = require('../models/sequelize');

const merchantAccessFilterOwnerOrAdmin = async (req,res) => {
  if (!req.user) { return res.sendStatus(403) }
  const merchant = await Merchant.findByPk(req.params.id);
  if (!merchant) { return res.sendStatus(404) }
  if (!req.user.isAdmin() && !merchant.isOwner(req.user)) { return res.sendStatus(403) }
  return merchant;
}

const merchantAccessFilterAdmin = async (req,res) => {
  if (!req.user || !req.user.isAdmin()) { return res.sendStatus(403) }
  const merchant = await Merchant.findByPk(req.params.id);
  if (!merchant) { return res.sendStatus(404) }
  return merchant;
}

module.exports = {
  merchantAccessFilterOwnerOrAdmin,
  merchantAccessFilterAdmin
};
