'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    userId: { type: DataTypes.INTEGER, unique: 'user_id_session_key' },
    sessionKey: { type: DataTypes.STRING, unique: 'user_id_session_key' },
    expiredAt: DataTypes.DATE
  }, {
    timestamps: true
  });
  Session.associate = (models) => {
    Session.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Session;
};
