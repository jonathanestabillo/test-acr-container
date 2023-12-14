var express = require('express');
var router = express.Router();

// GET greet endpoint
router.get('/', async function(req, res, next) {
  const DB_NAME = process.env.DB_NAME;
  const db = req.dbClient.db(DB_NAME);
  const collection = db.collection('Users');
  const users = await collection.find().toArray();
  res.send(`Hello ${users[0].firstName} ${users[0].lastName}`);
});

module.exports = router;
