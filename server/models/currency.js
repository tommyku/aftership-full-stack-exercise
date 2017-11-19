'use strict';
module.exports = (sequelize, DataTypes) => {
  var Currency = sequelize.define('Currency', {
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    timestams: false
  });
  Currency.associate = (models) => {
    Currency.belongsToMany(models.User, { through: 'UserCurrencies' });
  };
  return Currency;
};
