'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true },
    passwordDigest: DataTypes.STRING,
    appId: DataTypes.STRING
  }, {
    timestamps: true,
    paranoid: true,
  });
  User.associate = (models) => {
    User.belongsToMany(models.Currency, { through: 'UserCurrencies' });
  };
  return User;
};
