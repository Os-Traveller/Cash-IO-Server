const express = require('express');
const { transactionCollection, usersCollection } = require('./lib/collection');
const router = express.Router();

router.get('/', async function (req, res) {
  // delete all transactions
  await transactionCollection.deleteMany({});
  await usersCollection.updateOne(
    { email: 'faisal@gmail.com' },
    { $set: { balance: 0, revenue: 0, expense: 0 } }
  );

  res.send('done');
});

module.exports = router;
