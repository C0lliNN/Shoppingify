const express = require('express');
const Joi = require('joi');
const { User, TOKEN_EXPIRATION_TIME } = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async (request, response) => {
  const validator = Joi.object({
    email: Joi.string().email({ tlds: false }).required(),
    password: Joi.string().required(),
  });

  const { value, error } = validator.validate(request.body);

  if (error) {
    return response.status(400).send({ message: error.message });
  }

  const user = await User.findOne({ email: value.email });

  if (!user) {
    return response.status(400).send({ message: 'Email not founded!' });
  }

  const validPassword = await bcrypt.compare(value.password, user.password);

  if (!validPassword) {
    return response.status(400).send({ message: 'Invalid Password!' });
  }

  response.status(200).send({
    token: user.generateToken(),
    expiresIn: TOKEN_EXPIRATION_TIME,
    name: user.name,
  });
});

module.exports = router;
