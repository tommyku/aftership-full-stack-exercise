'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCurrency = sequelize.define('UserCurrency', {
    userId: DataTypes.STRING,
    currencyId: DataTypes.STRING
  }, {
    timestamps: true
  });
  UserCurrency.associate = (models) => {
    UserCurrency.belongsTo(models.User);
    UserCurrency.belongsTo(models.Currency);
  };
  return UserCurrency;
};
