var express = require('express');
var router = express.Router();

// GET greet endpoint
router.get('/', async function(req, res, next) {
  //const dbClient = await MongoClient.connect(process.env.MONGO_URL);
  const db = req.dbClient.db('dabblefox_dev');
  const collection = db.collection('Users');
  const users = await collection.find().toArray();
  res.send(`Hello ${users[0].firstName} ${users[0].lastName}`);
});

module.exports = router;
