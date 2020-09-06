const express = require('express');
const { List, validateList } = require('../models/list');
const getList = require('../middlewares/get-list');
const authorization = require('../middlewares/authorization');
const router = express.Router();

router.param('list', getList);

router.get('/', async (request, response) => {
  const userId = request.user._id;
  const lists = await List.find({ user: userId });
  response.send(lists);
});

router.get('/active', async (request, response) => {
  const userId = request.user._id;
  const activeList = await List.findOne({ user: userId, status: 'active' });
  response.send(activeList);
});

router.get('/:list', authorization('list'), (request, response) => {
  response.send(request.list);
});

router.post('/', async (request, response) => {
  const { value, error } = validateList(request.body);

  if (error) {
    return response.status(400).send({ message: error.message });
  }

  const userId = request.user._id;

  const activeList = await List.findOne({ user: userId, status: 'active' });

  if (activeList) {
    return response
      .status(400)
      .send({ message: 'You already have a active list' });
  }

  const list = new List(value);
  list.user = userId;
  await list.save();

  response.status(201).send(list);
});

router.patch(
  '/:list/complete',
  authorization('list'),
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
  '/:list/cancel',
  authorization('list'),
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
