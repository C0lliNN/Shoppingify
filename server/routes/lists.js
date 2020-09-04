const express = require('express');
const { List, validateList } = require('../models/list');
const router = express.Router();
const validateObjectId = require('../middlewares/validate-object-id');
const validateModel = require('../middlewares/validate-model');

router.get('/', async (request, response) => {
  const userId = request.user._id;
  const lists = await List.find({ user: userId });
  response.send(lists);
});

router.get(
  '/:id',
  validateObjectId,
  validateModel(List),
  async (request, response) => {
    response.send(request.model);
  }
);

router.post('/', async (request, response) => {
  const { value, error } = validateList(request.body);

  if (error) {
    return response.status(400).send({ message: error.message });
  }

  const userId = request.user._id;

  const list = new List(value);
  list.user = userId;
  await list.save();

  response.status(201).send(list);
});

router.patch(
  '/:id/complete',
  validateObjectId,
  validateModel(List),
  async (request, response) => {
    const list = request.model;

    if (list.status !== 'active') {
      return response
        .status(400)
        .send({ message: 'Only active lists can change its status' });
    }

    list.status = 'completed';
    await list.save();

    response.send(list);
  }
);

router.patch(
  '/:id/cancel',
  validateObjectId,
  validateModel(List),
  async (request, response) => {
    const list = request.model;

    if (list.status !== 'active') {
      return response
        .status(400)
        .send({ message: 'Only active lists can change its status' });
    }

    list.status = 'canceled';
    await list.save();

    response.send(list);
  }
);

module.exports = router;
