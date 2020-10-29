const express = require('express');
const { Item, validateItem } = require('../models/item');
const getItem = require('../middlewares/get-item');
const authorization = require('../middlewares/authorization');
const router = express.Router();

router.param('item', getItem);

router.get('/', async (request, response) => {
  const items = await Item.find({ user: request.user._id }).sort(
    'category.name name'
  );
  response.send(items);
});

router.get('/:id', async (request, response) => {
  const item = await Item.findById(request.params.id);
  response.send(item);
})

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

router.delete('/:item', authorization('item'), async (request, response) => {
  const item = request.item;
  await item.deleteOne();
  response.sendStatus(200);
});

module.exports = router;
