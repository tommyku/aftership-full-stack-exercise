const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const bcrypt = require('bcrypt');
const User = require('../models').User;

/**
 * @api {post} /sign_up Sign up as a user
 * @apiGroup User
 * @apiParamExample {json} Request Example:
 *   {
 *     "username": "username",
 *     "password": "password"
 *     "appId": "1234"
 *   }
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 200 Success
 *     {
 *       "success": {
 *         "username": "username"
 *         "appId": "1234"
 *       }
 *     }
 * @apiErrorExample {json} Invalid Parameter
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "errors": {
 *         "appId": {
 *           "location": "body",
 *           "param": "appId",
 *           "msg": "Invalid value"
 *         }
 *       }
 *     }
 * @apiErrorExample {json} User Existed
 *     HTTP/1.1 409 Conflict
 *     {
 *       "errors": {
 *         "username": {
 *           "msg": "exists"
 *         }
 *       }
 *     }
 **/
router.post('/sign_up', [
  check('username').exists().isLength({ min: 1 }),
  check('password').exists().isLength({ min: 8 }),
  check('appId').exists()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const userData = matchedData(req);
  User.findOne({ where: { username: userData.username }})
    .then((user) => {
      if (user) {
        return res.status(409)
          .json({ errors: { username: { msg: 'exists' } }});
      }
      const passwordDigest = bcrypt.hashSync(userData.password, 8);
      User.create({
        username: userData.username,
        passwordDigest: passwordDigest,
        appId: userData.appId
      }).then(() => {
        return res.status(200)
          .json({ success: {
            username: userData.username,
            token: jwt.sign({ username: userData.username }, process.env.JWT_SECRET, { expiresIn: 1440 })
          }});
      });
    });
});

router.post('/sign_in', [
  check('username').exists(),
  check('password').exists()
], (req, res) => {
});

module.exports = router;

