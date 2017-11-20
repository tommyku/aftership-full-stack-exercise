const express = require('express');
const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const { Currency, UserCurrency } = require('../models');
const router = express.Router();

router.use(require('../middlewares/jwt'));

router.get('/', (req, res) => {
  req.user.getCurrencies()
    .then((currencies) => {
      res.status(200)
        .json({
          success: {
            currencies: currencies.map((currency) => ({ code: currency.code, name: currency.name }))
          }
        });
    });
});

router.post('/', [
  check('code').exists().isLength(3)
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const code = matchedData(req).code;
  const user = req.user;

  user.getCurrencies({ where: { code }})
    .then((currencies) => {
      if (currencies.length > 0) {
        return res.status(409)
          .json({ errors: { code: 'exists' }});
      } else {
        Currency.findOne({
          where: { code }
        }).then((currency) => {
          if (!currency) {
            return res.status(422)
              .json({ errors: { code: 'is invalid' }});
          }
          UserCurrency.create({
            userId: user.id,
            currencyId: currency.id
          }).then(() => {
            return res.status(201)
              .json({ success: true });
          });
        });
      }
    });
});

router.delete('/', [
  check('code').exists().isLength(3)
], (req, res) => {
  const user = req.user;
  const code = matchedData(req).code;

  user.getCurrencies({ where: { code }})
    .then((currencies) => {
      if (currencies.length == 0) {
        return res.status(404)
          .json({ errors: { code: 'not found' }});
      } else {
        UserCurrency.destroy({ where: { userId: user.id, currencyId: currencies[0].id }})
          .then(() => {
            return res.status(200)
              .json({ success: true });
          });
      }
    });
});

module.exports = router;
