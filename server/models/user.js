'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true },
    passwordDigest: DataTypes.STRING
  }, {
    timestamps: true,
    paranoid: true,
  });
  User.associate = (models) => {
    User.hasMany(models.Session, { foreignKey: 'userId' });
  };
  return User;
};
