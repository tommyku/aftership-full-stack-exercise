const express = require('express');
const router = express.Router();

/**
 * @api {get} / Redirect to static host of the app
 * @apiGroup Home
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 301 Move Permanently
 * @apiErrorExample {json} Server Error
 *     HTTP/1.1 500 Internal Server Error
 **/
router.get('/', (_, res) => {
  res.redirect(301, 'https://sfmovie.ck2ustudio.com/');
});

module.exports = router;
