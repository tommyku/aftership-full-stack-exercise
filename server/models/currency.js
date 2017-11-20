'use strict';
module.exports = (sequelize, DataTypes) => {
  const Currency = sequelize.define('Currency', {
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    timestamps: false
  });
  Currency.associate = (models) => {
    Currency.belongsToMany(models.User, { through: 'UserCurrencies' });
  };
  return Currency;
};
