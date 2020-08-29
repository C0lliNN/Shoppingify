const express = require('express');
const { List, validateList } = require('../models/list');
const router = express.Router();
const validateObjectId = require('../middlewares/validate-object-id');
const validateListMiddleware = require('../middlewares/validate-list');

router.get('/', async (request, response) => {
  const userId = request.user._id;
  const lists = await List.find({ user: userId });
  response.send(lists);
});

router.get(
  '/:id',
  validateObjectId,
  validateListMiddleware,
  async (request, response) => {
    response.send(request.list);
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
  validateListMiddleware,
  async (request, response) => {
    const list = request.list;

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
  validateListMiddleware,
  async (request, response) => {
    const list = request.list;

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
