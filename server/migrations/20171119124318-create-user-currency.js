'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserCurrencies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      currencyId: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('UserCurrencies');
  }
};
