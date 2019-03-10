const express = require('express');
const config = require('config');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

const myConfig = config.get('person:name');
console.log(myConfig);

module.exports = router;
