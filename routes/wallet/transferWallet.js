const express = require('express');
const { walletsCollection } = require('../../lib/collection');
const router = express.Router();

router.post('/', async function (req, res) {
  try {
    const { from, to, amount, email } = req.body;
    await walletsCollection.updateOne(
      { email, name: from },
      { $inc: { revenue: -amount } }
    );
    await walletsCollection.updateOne(
      { email, name: to },
      { $inc: { revenue: amount } }
    );
    return res.send({ okay: true, msg: 'Money Transferred' });
  } catch (err) {
    console.log(err);
    return res.send({ okay: false, msg: 'Something went wrong' });
  }
});

module.exports = router;
