const axios = require('axios');

class PspService {
  static processPayment(amount, CCinfos) {
    return axios.get('http://psp',
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
