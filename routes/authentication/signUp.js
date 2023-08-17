const express = require('express');
const { usersCollection } = require('../../lib/collection');
const router = express.Router();

router.post('/', async function (req, res) {
  try {
    const userInfo = req.body;
    console.log(userInfo);
    const status = await usersCollection.insertOne(userInfo);
    if (!status.acknowledged)
      return res.send({ okay: false, msg: 'Can not create a user.' });

    return res.send({ okay: true, msg: 'User created successfully.' });
  } catch (err) {
    console.log(err);
    return res.send({ okay: false, msg: 'Can not create a user.' });
  }
});

module.exports = router;
