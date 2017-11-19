// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
// Configurations
const logger = require('./config/logger.js');
// Controllers
const homeController = require('./controllers/home.js');
const userController = require('./controllers/user.js');

// Create express app
const app = express();

// Logging requests to STDOUT
if (process.env.NODE_ENV !== 'test') {
  app.use(logger());
}

// Folder to serve static files
app.use(express.static('public'));

// Parse incoming data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Register controllers
app.use('/', homeController);
app.use('/user', userController);

module.exports = app;
