const Axios = require('axios');
const Merchant = require('../models/sequelize/Merchant');

class MerchantService {

  static async _getMerchant(transaction) {
    let merchant = transaction.Merchant;
    if(!merchant) {
      merchant = await Merchant.findByPk(transaction.MerchantId);
    }
    return merchant;
  }

  static async confirmTransaction(transaction) {
    let merchant = await this._getMerchant(transaction);
    Axios.post(`${merchant.confirmUrl}/${transaction.orderId}`).catch(console.error);
  }

  static async cancelTransaction(transaction) {
    let merchant = await this._getMerchant(transaction);
    Axios.post(`${merchant.cancelUrl}/${transaction.orderId}`).catch(console.error);
  }
}

module.exports = MerchantService;
