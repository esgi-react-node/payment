const axios = require('axios');

class PspService {
  static processPayment(transactionId, amount, CCinfos) {
    return axios.get('http://psp:3000',
      {
        data: {
          transactionId,
          amount,
          creditCardNumber: CCinfos.CCNumber,
          creditCardOwner: CCinfos.CCOwner,
          expirationDate: CCinfos.CCExpirationDate,
          secureCode: CCinfos.CCSecureCode
        }
      }
    ).then(()=>{}).catch(console.error);
  }
}

module.exports = PspService
