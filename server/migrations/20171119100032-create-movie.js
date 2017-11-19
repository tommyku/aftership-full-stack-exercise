'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      producer: {
        type: Sequelize.STRING
      },
      distributor: {
        type: Sequelize.STRING
      },
      director: {
        type: Sequelize.STRING
      },
      writer: {
        type: Sequelize.STRING
      },
      actors: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Movies');
  }
};
