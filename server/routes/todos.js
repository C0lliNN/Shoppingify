const express = require('express');
const debug = require('debug')('todos');
const { Todo, validateTodo } = require('../models/todo');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (request, response) => {
  try {
    const todos = await Todo.find().sort('title');
    response.send(todos);
  } catch (error) {
    debug(error.message);
    response.status(500).send(error.message);
  }
});

router.post('/', async (request, response) => {
  const { value, error } = validateTodo(request.body);
  if (error) {
    return response.status(400).send(error.message);
  }
  try {
    const todo = await Todo.create(value);
    response.status(201).send(todo);
  } catch (error) {
    debug(error.message);
    response.status(500).send(error.message);
  }
});

router.delete('/:id', async (request, response) => {
  const todoId = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    return response.status(400).send('Invalid ObjectID');
  }

  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return response.sendStatus(404);
    }

    await todo.deleteOne();
    response.sendStatus(200);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

module.exports = router;
