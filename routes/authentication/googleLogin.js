const express = require('express');
const { usersCollections } = require('../../lib/collection');
const router = express.Router();

router.post('/', async function (req, res) {
  try {
    const userInfo = req.body;
    const user = await usersCollections.findOne({ email: userInfo.email });
    if (!user) {
      const newUser = await usersCollections.insertOne(userInfo);
      if (!newUser.acknowledged)
        return res.send({ okay: false, msg: 'Can not crate the user' });
      return res.send({ okay: true, msg: 'User Created' });
    }
    return res.send({ okay: true, msg: `Logged in as ${userInfo.name}` });
  } catch (err) {
    console.log(err);
    return res.send({ okay: false, msg: 'Something went wrong' });
  }
});

module.exports = router;
