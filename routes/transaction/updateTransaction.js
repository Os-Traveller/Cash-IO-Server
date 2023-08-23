const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const {
  transactionsCollection,
  walletsCollection,
} = require('../../lib/collection');

router.post('/', async function (req, res) {
  try {
    const data = req.body;
    const {
      _id,
      email,
      amount,
      prevAmount,
      type,
      prevType,
      wallet,
      prevWallet,
      category,
      description,
    } = data;

    const updateStatus = await transactionsCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { amount, category, type, description, wallet } }
    );

    // updating user information
    if (wallet !== prevWallet) {
      await walletsCollection.updateOne(
        { email, name: prevWallet },
        { $inc: { [prevType]: -prevAmount } }
      );
      await walletsCollection.updateOne(
        { email, name: wallet },
        { $inc: { [type]: amount } }
      );
    } else {
      await walletsCollection.updateOne(
        { email, name: wallet },
        { $inc: { [type]: amount, [prevType]: -prevAmount } }
      );
    }

    if (!updateStatus.acknowledged)
      return res.send({ okay: false, msg: `Transaction can't be updated` });

    return res.send({ okay: true, msg: 'Transaction has been updated' });
  } catch (err) {
    console.log(err);
    return res.send({ okay: false, msg: 'Something went wrong' });
  }
});

module.exports = router;
