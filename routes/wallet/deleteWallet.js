const express = require('express');
const { walletsCollection } = require('../../lib/collection');
const router = express.Router();

router.delete('/', async function (req, res) {
  try {
    const { name, email } = req.body;
    const deleteWalletStatus = await walletsCollection.deleteOne({
      email,
      name,
    });
    if (!deleteWalletStatus.acknowledged)
      return res.send({ okay: false, msg: 'Wallet cannot be deleted' });

    return res.send({ okay: true, msg: 'Wallet has been deleted' });
  } catch (err) {
    console.log(err);
    return res.send({ okay: false, msg: 'Something went wrong' });
  }
});

module.exports = router;
