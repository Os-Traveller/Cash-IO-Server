const express = require('express');
const { transactionCollection } = require('../../lib/collection');
const router = express.Router();

router.get('/:email', async function (req, res) {
  try {
    const email = req.params.email;
    const transactions = await transactionCollection.find({ email }).toArray();
    if (!transactions || transactions.length === 0)
      return res.send({ okay: false, msg: 'Nothing Found' });

    return res.send({ okay: true, data: transactions });
  } catch (err) {
    console.log(err);
    return res.send({ okay: false, msg: 'Something went wrong' });
  }
});

module.exports = router;
