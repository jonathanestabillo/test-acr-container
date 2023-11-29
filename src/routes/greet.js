var express = require('express');
var router = express.Router();

// GET greet endpoint
router.get('/', function(req, res, next) {
  res.send('Create New Image Tag and Delete It on Close');
});

module.exports = router;
