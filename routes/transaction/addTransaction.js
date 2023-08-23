const express = require('express');
const {
  transactionsCollection,
  categoriesCollection,
  walletsCollection,
} = require('../../lib/collection');

const router = express.Router();
router.post('/', async function (req, res) {
  try {
    const transactionInfo = req.body;
    const { amount, type, email, category, date, wallet } = transactionInfo;

    let updateDoc;
    if (type === 'expense') updateDoc = { expense: amount };
    else if (type === 'revenue') updateDoc = { revenue: amount };

    // updating user info
    await walletsCollection.updateOne(
      { email, name: wallet },
      { $inc: updateDoc }
    );

    // checking if type already exist or not
    const categoryInfo = await categoriesCollection.findOne({ category });
    if (!categoryInfo) await categoriesCollection.insertOne({ category });

    const status = await transactionsCollection.insertOne({
      ...transactionInfo,
      date: new Date(date),
    });
    if (!status.acknowledged)
      return res.send({ okay: false, msg: 'Could not add the transaction' });

    return res.send({ okay: true, msg: 'Transaction added successfully' });
  } catch (err) {
    console.log(err);
    return res.send({ okay: false, msg: 'Something went wrong' });
  }
});

module.exports = router;
