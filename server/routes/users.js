const express = require('express');
const { validateUser, User, TOKEN_EXPIRATION_TIME } = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Item } = require('../models/item');
const { Category } = require('../models/category');

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

  const category = await Category.create({
    name: 'Fruit',
    user: user.id,
  });

  await Item.create(
    {
      name: 'Apple',
      note: 'Best Apple',
      image:
        'https://www.freshfruitportal.com/assets/uploads/2020/07/hot81z.jpg',
      user: user.id,
      category,
    },
    {
      name: 'Abacate',
      note: 'From Brazil',
      image:
        'https://lifestyle.uai.com.br/wp-content/uploads/sites/9/2019/11/aabacate-950x631.jpg',
      category,
      user: user.id,
    },
    {
      name: 'Chicken',
      note: 'Christmas Chicken',
      image: 'https://www.dinneratthezoo.com/wp-content/uploads/2018/10/smoked-chicken-4.jpg',
      user: user.id,
      category: {
        name: 'Meat and Fish'
      }
    }
  );

  response.status(201).send({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: user.generateToken(),
    expiresIn: TOKEN_EXPIRATION_TIME,
  });
});

module.exports = router;
