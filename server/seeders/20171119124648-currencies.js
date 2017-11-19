'use strict';

const fetch = require('node-fetch');

module.exports = {
  up: (queryInterface) => {
    return fetch('https://openexchangerates.org/api/currencies.json')
      .then(res => res.json())
      .then((json) => {
        const currencies = Object.keys(json).map((key) => {
          return { code: key, name: json[key] };
        });
        return queryInterface.bulkInsert('Currencies', currencies, {});
      });
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Currencies', null, {});
  }
};
