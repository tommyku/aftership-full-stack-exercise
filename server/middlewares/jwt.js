const jwt = require('jsonwebtoken');
const User = require('../models').User;

module.exports = function(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403)
          .json({ errors: { token: { msg: 'is invalid' }}});
      } else {
        User.findOne({ where: {username: decoded.username }})
          .then((user) => {
            if (!user) {
              return res.status(403)
                .json({ errors: { token: { msg: 'is invalid' }}});
            }
            req.user = user;
            next();
          });
      }
    });
  } else {
    return res.status(403)
      .json({ errors: { token: { msg: 'is required' }}});
  }
};
