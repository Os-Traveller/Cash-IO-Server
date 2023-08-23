const express = require('express');
const {
  transactionsCollection,
  usersCollection,
} = require('../../lib/collection');
const { ObjectId } = require('mongodb');
const router = express.Router();

router.delete('/', async function (req, res) {
  try {
    const { _id, email, type, amount } = req.body;

    // updating user balance and other information
    let updateDoc;

    if (type === 'expense') updateDoc = { expense: -amount };
    else if (type === 'revenue') updateDoc = { revenue: -amount };

    await usersCollection.updateOne({ email }, { $inc: updateDoc });

    const deleteStatus = await transactionsCollection.deleteOne({
      _id: new ObjectId(_id),
    });

    if (!deleteStatus.acknowledged)
      return res.send({ okay: false, msg: 'Transaction can not be deleted' });
    return res.send({ okay: true, msg: 'Transaction has been deleted' });
  } catch (err) {
    console.log(err);
    return res.send({ okay: false, msg: 'Something went wrong' });
  }
});

module.exports = router;
