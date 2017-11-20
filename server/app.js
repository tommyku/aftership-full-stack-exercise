// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Configurations
const logger = require('./config/logger.js');
const clientConfig = require('./config/client.js');
// Controllers
const homeController = require('./controllers/home.js');
const userController = require('./controllers/user.js');
const usercurrencyController = require('./controllers/usercurrency.js');

// Create express app
const app = express();

// Logging requests to STDOUT
if (process.env.NODE_ENV !== 'test') {
  app.use(logger());
}

// Folder to serve static files
app.use(express.static('public'));

// CORS
app.use(cors({ origin: clientConfig.clientURL }));

// Parse incoming data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Register controllers
app.use('/', homeController);
app.use('/user', userController);
app.use('/usercurrency', usercurrencyController);

// Fallback to apidoc if all others fail
app.get('*', (req, res) => {
  res.redirect(404, './apidoc');
});

module.exports = app;
