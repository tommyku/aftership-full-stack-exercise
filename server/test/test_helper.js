const jwt = require('jsonwebtoken');

module.exports = {
  app: require('../app.js'),
  model: require('../models'),
  jwtSign: (username) => jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: 1440 })
};
