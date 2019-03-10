const express = require('express');
const bodyParser = require('body-parser');
const Ajv = require('ajv');
const routeSchema = require('../schema/email.json');

const router = express.Router();
const ajv = new Ajv();

const validate = ajv.compile(routeSchema);

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', (req, res) => {
  res.render('form');
});

router.post('/', urlencodedParser, (req, res) => {
  const valid = validate(req.body.name);

  if (!valid) {
    console.log('You did not enter correctly the email or nikname');
    res.send('You did not enter correctly the email or nikname');
  }

  res.send('Thank you for entering the email or nikname ');
});

module.exports = router;
