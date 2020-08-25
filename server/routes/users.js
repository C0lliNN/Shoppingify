const express = require('express');
const { validateUser, User } = require('../models/User');
const debug = require('debug')('users');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async (request, response) => {
  const { value, error } = validateUser(request.body);
  if (error) {
    return response.status(400).send({ message: error.message });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, salt);

    const user = await User.create({
      ...value,
      password: hashedPassword,
    });

    response
      .status(201)
      .send({ _id: user._id, name: user.name, email: user.email });
  } catch (error) {
    debug(error.message);
    response.status(500).send(error.message);
  }
});

module.exports = router;
