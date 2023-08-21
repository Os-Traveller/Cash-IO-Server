const express = require('express');
const { transactionCollection, usersCollection } = require('./lib/collection');
const router = express.Router();

router.get('/', async function (req, res) {
  // delete all transactions
  await usersCollection.updateMany(
    {},
    { $set: { revenue: 0, expense: 0 }, $unset: { balance: '' } }
  );
  await transactionCollection.deleteMany({});
  return res.send('done');
});

module.exports = router;
