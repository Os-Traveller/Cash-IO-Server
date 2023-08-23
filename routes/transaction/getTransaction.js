const express = require('express');
const { transactionsCollection } = require('../../lib/collection');
const router = express.Router();

router.get('/:email', async function (req, res) {
  try {
    const email = req.params.email;
    const transactions = await transactionsCollection
      .find({ email })
      .sort({ date: -1 })
      .toArray();
    return res.send({ okay: true, data: transactions });
  } catch (err) {
    console.log(err);
    return res.send({ okay: false, msg: 'Something went wrong' });
  }
});

module.exports = router;
