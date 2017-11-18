const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// create express app
const app = express();

// Logging requests to STDOUT
app.use(logger('dev'));

// Parse incoming data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Wrong castle');
});

app.listen(3000, () => console.log('Server running'));
