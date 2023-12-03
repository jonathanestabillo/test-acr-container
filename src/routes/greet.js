var express = require('express');
var router = express.Router();

// GET greet endpoint
router.get('/', function(req, res, next) {
  res.send('Production Testing');
});

module.exports = router;
