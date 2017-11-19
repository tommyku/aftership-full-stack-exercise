const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const logger = (() => {
  if (process.env.NODE_ENV === 'production') {
    const logStream = fs.createWriteStream(
      path.join(__dirname, '/../logs/access.log'),
      { flags: 'a' }
    );
    return morgan('common', { steam: logStream });
  } else {
    return morgan('common');
  }
});

module.exports = logger;
