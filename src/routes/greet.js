var express = require('express');
var router = express.Router();

// GET greet endpoint
router.get('/', function(req, res, next) {
  res.send('KEYVAULT value is: ' + process.env.TEST_SECRET);
});

module.exports = router;
