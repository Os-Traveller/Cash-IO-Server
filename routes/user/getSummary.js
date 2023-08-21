const express = require('express');
const { usersCollection } = require('../../lib/collection');
const router = express.Router();

router.get('/:email', async function (req, res) {
  try {
    const email = req.params.email;
    const userSummary = await usersCollection.findOne({ email });
    if (!userSummary)
      return res.send({ okay: false, data: {}, msg: 'User not found' });

    return res.send({
      okay: true,
      data: {
        balance: userSummary.revenue - userSummary.expense,
        expense: userSummary.expense,
        revenue: userSummary.revenue,
      },
    });
  } catch (err) {
    console.log(err);
    return res.send({ okay: false, msg: 'Something went wrong' });
  }
});

module.exports = router;
