const {
  transactionsCollection,
  walletsCollection,
} = require('../../lib/collection');
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

router.delete('/', async function (req, res) {
  try {
    const { _id, email, type, amount, wallet } = req.body;

    // updating user's wallet balance and other information

    if (type === 'expense')
      await walletsCollection.updateOne(
        { email, name: wallet },
        { $inc: { [type]: -amount } }
      );

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
