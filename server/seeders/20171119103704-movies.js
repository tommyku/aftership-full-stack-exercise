'use strict';

const fs = require('fs');
const parse = require('csv-parse/lib/sync');

module.exports = {
  up: (queryInterface) => {
    const data = [];
    const movies = {};
    const records = parse(
      fs.readFileSync(__dirname + '/../data/Film_Locations_in_San_Francisco.csv'),
      { delimiter: ',' }
    );
    records.forEach((data) => {
      if (data[0] === '' || movies[data[0]]) return;
      movies[data[0]] = {
        year: data[1],
        producer: data[4],
        distributor: data[5],
        director: data[6],
        writer: data[7],
        actors: [data[8], data[9], data[10]].filter((item) => item !== '').join(', ')
      };
    });
    Object.keys(movies).forEach((key) => {
      data.push(
        Object.assign(
          { title: key },
          movies[key]
        )
      );
    });
    return queryInterface.bulkDelete('Movies', null, {})
      .then(() => {
        return queryInterface.bulkInsert('Movies', data, {});
      });
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Movies', null, {});
  }
};
