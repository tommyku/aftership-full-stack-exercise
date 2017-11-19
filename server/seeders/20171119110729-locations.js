'use strict';

const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const Movie = require('../models').Movie;
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_GEOCODING_KEY,
  Promise: Promise
});
const locations = {};
const records = parse(
  fs.readFileSync(__dirname + '/../data/Film_Locations_in_San_Francisco.csv'),
  { delimiter: ',' }
);
records.forEach((data) => {
  if (data[0] === '' || data[2] === '') return;
  if (locations[data[2]] == undefined) {
    locations[data[2]] = [];
  }
  locations[data[2]].push({
    movie: data[0],
    funFact: data[3]
  });
});

module.exports = {
  up: (queryInterface) => {
    const data = [];
    const locations = [];
    const promises = Object.keys(movies).map((movieName) => {
      return Movie.findAll({ where: { title: movieName }}).then((movie) => {
        movies[movieName].forEach((location) => {
          data.push({
            movieId: movie.id,
            title: location.title,
            funFact: location.funFact
          });
        });
      });
    });
    return Promise.all(promises).then(() => {
      const promises = data.slice(1, 50).map((location) => {
        return googleMapsClient.geocode({
          address: location.title
        }).asPromise(
        ).then((response) => {
          if (response && response.status === 200 && response.json.results.length) {
            locations.push(
              Object.assign(
                response.json.results[0].geometry.location,
                location
              )
            );
          }
        });
      });
      return Promise.all(promises);
    }).then(() => {
      return queryInterface.bulkDelete('Locations', null, {});
    }).then(() => {
      return queryInterface.bulkInsert('Locations', locations, {});
    });
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Locations', null, {});
  }
};
