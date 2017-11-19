'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    title: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    funFact: DataTypes.TEXT,
  }, {
    timestamps: false,
  });
  Location.associate = (models) => {
    Location.belongsToMany(models.Movie, { through: 'MovieLocation' });
  };
  return Location;
};
