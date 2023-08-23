const express = require('express');
const { walletsCollection } = require('../../lib/collection');
const router = express.Router();

router.post('/', async function (req, res) {
  try {
    const walletInfo = req.body;
    const { name, email } = req.params;

    // checking if the wallet is already created
    const wallet = await walletsCollection.findOne({ email, name });
    if (wallet)
      return res.send({ okay: false, msg: 'Already created this wallet' });

    const insertStatus = await walletsCollection.insertOne({
      ...walletInfo,
      expense: 0,
    });
    if (!insertStatus.acknowledged)
      return res.send({ okay: false, msg: 'Could not added the wallet' });

    return res.send({ okay: true, msg: 'Wallet created successfully' });
  } catch (err) {
    console.log(err);
    return res.send({ okay: false, msg: 'Something went wrong!' });
  }
});

module.exports = router;
