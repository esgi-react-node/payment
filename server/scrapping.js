const fs = require('fs');
const Scrapper = require('./lib/Scrapper');
const { Rate } = require('./models/sequelize');

const scrapper = new Scrapper("https://api.exchangeratesapi.io/latest", {method: 'GET'},
  (data, response) => data,
  async (result) => {
    const { base, date } = result;
    // Add EUR base to the list of rates
    const rates = {
      [base]: 1,
      ...result.rates
    };

    return Object.entries(rates).forEach(async ([key,value]) => {
      const rate = await Rate.findOne({ where: { key }});
      if (!rate) {
        return await Rate.create({ key, value, date });
      }
      rate.value = value;
      rate.date = date;
      await rate.save();
    });
  }
);
scrapper.scrap();
