const express = require('express');
const { categoriesCollection } = require('../../lib/collection');
const router = express.Router();

router.get('/', async function (req, res) {
  try {
    const categories = await categoriesCollection.find({}).toArray();
    return res.send({ okay: true, data: categories });
  } catch (err) {
    console.log(err);
    return res.send({ okay: false, msg: 'Something went wrong' });
  }
});

module.exports = router;
