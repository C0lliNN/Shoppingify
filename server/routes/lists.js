const express = require('express');
const { List, validateList } = require('../models/list');
const { getTokenFromHeader, getUserId } = require('../utility');
const router = express.Router();
const validateObjectId = require('../middlewares/validate-object-id');

router.get('/', async (request, response) => {
  const token = getTokenFromHeader(request.header('Authorization'));
  const userId = getUserId(token);
  const lists = await List.find({ user: userId });
  response.send(lists);
});

router.post('/', async (request, response) => {
  const { value, error } = validateList(request.body);

  if (error) {
    return response.status(400).send({ message: error.message });
  }

  const token = getTokenFromHeader(request.header('Authorization'));
  const userId = getUserId(token);

  const list = new List(value);
  list.user = userId;
  await list.save();

  response.status(201).send(list);
});

router.patch('/:id/complete', validateObjectId, async (request, response) => {
  const id = request.params.id;
  const list = await List.findById(id);
  if (!list) {
    return response.status(404).send({ message: 'List not founded' });
  }

  if (list.status !== 'active') {
    return response
      .status(400)
      .send({ message: 'Only active lists can change its status' });
  }

  list.status = 'completed';
  await list.save();

  response.send(list);
});

router.patch('/:id/cancel', validateObjectId, async (request, response) => {
  const id = request.params.id;
  const list = await List.findById(id);
  if (!list) {
    return response.status(404).send({ message: 'List not founded' });
  }

  if (list.status !== 'active') {
    return response
      .status(400)
      .send({ message: 'Only active lists can change its status' });
  }

  list.status = 'canceled';
  await list.save();

  response.send(list);
});

module.exports = router;
