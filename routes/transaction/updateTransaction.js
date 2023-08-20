const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { transactionCollection } = require('../../lib/collection');

router.post('/', async function (req, res) {
  try {
    const data = req.body;
    const { _id, amount, category, type, description } = data;

    const updateStatus = await transactionCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { amount, category, type, description } },
      { upsert: true }
    );

    if (!updateStatus.acknowledged)
      return res.send({ okay: false, msg: `Transaction can't be updated` });

    return res.send({ okay: true, msg: 'Transaction has been updated' });
  } catch (err) {
    console.log(err);
    return res.send({ okay: false, msg: 'Something went wrong' });
  }
});

module.exports = router;
