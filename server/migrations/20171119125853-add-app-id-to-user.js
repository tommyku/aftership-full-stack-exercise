'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'appId', Sequelize.STRING);
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('Users', 'appId');
  }
};
