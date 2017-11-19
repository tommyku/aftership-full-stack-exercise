'use strict';
module.exports = (sequelize, DataTypes) => {
  var MovieLocation = sequelize.define('MovieLocation', {
    movieId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  return MovieLocation;
};
