const express = require('express');
const { walletsCollection } = require('../../lib/collection');
const router = express.Router();

router.get('/:email', async function (req, res) {
  try {
    const { email } = req.params;
    const wallets = await walletsCollection.find({ email }).toArray();
    return res.send({ okay: true, data: wallets });
  } catch (err) {
    console.log(err);
    return res.send({ okay: false, error: 'Something went wrong' });
  }
});

module.exports = router;
