const express = require('express');
const { transactionCollection } = require('../../lib/collection');
const { ObjectId } = require('mongodb');
const router = express.Router();

router.delete('/', async function (req, res) {
  try {
    const { _id } = req.body;
    const deleteStatus = await transactionCollection.deleteOne({
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
