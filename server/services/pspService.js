const axios = require('axios');

class PspService {
  static processPayment(amount, CCinfos) {
    return axios.get('http://psp:3000',
      {params: {
        amount,
        creditCardNumber: CCinfos.CCNumber,
        expirationDate: CCinfos.expirationDate,
        secureCode: CCinfos.secureCode
      }}
    );
  }
}

module.exports = PspService
