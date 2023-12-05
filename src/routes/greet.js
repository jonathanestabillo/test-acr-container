var express = require('express');
var router = express.Router();

// GET greet endpoint
router.get('/', function(req, res, next) {
  res.send('The Docker Registry Server value is: ' + process.env.DOCKER_REGISTRY_SERVER_URL);
});

module.exports = router;
