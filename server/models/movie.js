'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    producer: DataTypes.STRING,
    distributor: DataTypes.STRING,
    director: DataTypes.STRING,
    writer: DataTypes.STRING,
    actors: DataTypes.STRING
  }, {
    timestamps: false,
  });
  Movie.associate = (models) => {
    Movie.belongsToMany(models.Location, { through: 'MovieLocation' });
  };
  return Movie;
};
