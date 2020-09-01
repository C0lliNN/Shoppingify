const express = require('express');
const { Item, validateItem } = require('../models/item');
const router = express.Router();

router.get('/', async (request, response) => {
  const itens = await Item.find({ user: request.user._id }).sort(
    'category.name name'
  );
  response.send(itens);
});

router.post('/', async (request, response) => {
  const { value, error } = validateItem(request.body);

  if (error) {
    return response.status(400).send({ message: error.message });
  }

  const item = new Item(value);

  const userId = request.user._id;
  item.user = userId;

  await item.save();
  response.status(201).send(item);
});

module.exports = router;
