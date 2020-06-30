const axios = require('axios');

class PspService {
  static processPayment(amount, CCinfos) {
    return axios.get('http://psp:3000',
      {params: {
        amount,
        creditCardNumber: CCinfos.CCNumber,
        creditCardOwner: CCinfos.CCOwner,
        expirationDate: CCinfos.CCExpirationDate,
        secureCode: CCinfos.CCSecureCode
      }}
    );
  }
}

module.exports = PspService
