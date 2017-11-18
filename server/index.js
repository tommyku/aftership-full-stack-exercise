// Dependencies
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
// Controllers
const homeController = require('./controllers/home.js');

// Create express app
const app = express();

// Logging requests to STDOUT
app.use(logger('common'));

// Folder to serve static files
app.use(express.static('public'));

// Parse incoming data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Register controllers
app.use('/', homeController);

app.listen(8080, () => console.log('Server running'));
