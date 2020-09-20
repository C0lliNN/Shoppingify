const express = require('express');
const { validateUser, User, TOKEN_EXPIRATION_TIME } = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async (request, response) => {
  const { value, error } = validateUser(request.body);
  if (error) {
    return response.status(400).send({ message: error.message });
  }

  const existingUser = await User.findOne({ email: value.email });

  if (existingUser) {
    return response.status(400).send({ message: 'Email already in use!' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(value.password, salt);

  const user = await User.create({
    ...value,
    password: hashedPassword,
  });

  response.status(201).send({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: user.generateToken(),
    expiresIn: TOKEN_EXPIRATION_TIME,
  });
});

module.exports = router;
