'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MovieLocations', {
      movieId: {
        type: Sequelize.INTEGER
      },
      locationId: {
        type: Sequelize.INTEGER
      }
    }).then(() => {
      return queryInterface.addIndex(
        'MovieLocations',
        ['movieId', 'locationId'],
        { unique: true }
      );
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('MovieLocations');
  }
};
