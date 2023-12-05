var express = require('express');
var router = express.Router();

// GET greet endpoint
router.get('/', function(req, res, next) {
  res.send('MY_NAME value is: ' + process.env.MY_NAME);
});

module.exports = router;
