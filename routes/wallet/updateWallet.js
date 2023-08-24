const express = require('express');
const { walletsCollection } = require('../../lib/collection');
const router = express.Router();

router.patch('/', async function (req, res) {
  const { email, name, pervName } = req.body;
  try {
    // checking if the wallet already exists or not
    const walletInfo = await walletsCollection.findOne({ email, name });
    if (walletInfo)
      return res.send({ okay: false, msg: `Wallet ${name} already exists` });

    const updateStatus = await walletsCollection.updateOne(
      { email, name: pervName },
      { $set: { name: name } }
    );

    if (!updateStatus.acknowledged)
      return res.send({ okay: false, msg: 'Can not update wallet' });

    return res.send({ okay: true, msg: 'Wallet name updated' });
  } catch (err) {
    console.log(err);
    return res.send({ okay: false, msg: 'Something went wrong' });
  }
});

module.exports = router;
