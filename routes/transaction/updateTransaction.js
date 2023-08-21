const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const {
  transactionCollection,
  usersCollection,
} = require('../../lib/collection');

router.post('/', async function (req, res) {
  try {
    const data = req.body;
    const {
      _id,
      amount,
      category,
      type,
      description,
      email,
      prevType,
      prevAmount,
    } = data;

    const updateStatus = await transactionCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { amount, category, type, description } }
    );

    // updating user information
    let updateDoc;
    if (prevType !== type) {
      // type changes
      if (type === 'expense')
        updateDoc = { expense: amount, revenue: -prevAmount };
      else if (type === 'revenue')
        updateDoc = { expense: -amount, revenue: amount };
    } else {
      // no type changes
      if (type === 'expense') {
        updateDoc = { expense: amount - prevAmount };
      } else if (type === 'revenue') {
        updateDoc = { revenue: amount - prevAmount };
      }
    }

    await usersCollection.updateOne({ email }, { $inc: updateDoc });

    if (!updateStatus.acknowledged)
      return res.send({ okay: false, msg: `Transaction can't be updated` });

    return res.send({ okay: true, msg: 'Transaction has been updated' });
  } catch (err) {
    console.log(err);
    return res.send({ okay: false, msg: 'Something went wrong' });
  }
});

module.exports = router;
