const express = require('express');
const {
  transactionsCollection,
  usersCollection,
  categoriesCollection,
  walletsCollection,
} = require('./lib/collection');
const router = express.Router();

router.get('/', async function (req, res) {
  await transactionsCollection.deleteMany({});
  await usersCollection.deleteMany({});
  await categoriesCollection.deleteMany({});
  await walletsCollection.deleteMany({});
  return res.send('done');
});

module.exports = router;
