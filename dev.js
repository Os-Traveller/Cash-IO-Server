const express = require('express');
const {
  transactionsCollection,
  usersCollection,
  categoriesCollection,
} = require('./lib/collection');
const router = express.Router();

router.get('/', async function (req, res) {
  // delete all transactions
  await transactionsCollection.deleteMany({});
  // delete all users
  await usersCollection.deleteMany({});
  await categoriesCollection.deleteMany({});
  return res.send('done');
});

module.exports = router;
