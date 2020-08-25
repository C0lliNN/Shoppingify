const { start, stop } = require('../config/server');
const request = require('supertest');
const { Todo } = require('../models/todo');
const { dropDatabase } = require('../config/database');
const mongoose = require('mongoose');

let app = null;

beforeEach(async () => {
  app = await start();
  await Todo.create({
    title: 'Clean my Bedroom',
    description: 'Do it as soon as possible!',
  });
});

afterEach(() => {
  stop();
  dropDatabase();
});

describe('GET /todos', () => {
  it('should return 200', async () => {
    await request(app).get('/api/v1/todos').expect(200);
  });
  it('should return an Array', async () => {
    const response = await request(app).get('/api/v1/todos').expect(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
  it('should return all items', async () => {
    const response = await request(app).get('/api/v1/todos').expect(200);
    expect(response.body.length).toBe(1);
  });
  it('should contain an array of todo', async () => {
    const { body } = await request(app).get('/api/v1/todos').expect(200);
    expect(mongoose.Types.ObjectId.isValid(body[0]._id)).toBeTruthy();
    expect(typeof body[0].title).toBe('string');
    expect(typeof body[0].description).toBe('string');
  });
}, 10000);

describe('POST /todos', () => {
  it('should return 201 if the input is valid', async () => {
    await request(app)
      .post('/api/v1/todos')
      .send({
        title: 'Finish Node Course',
        description: 'From Maximilian',
      })
      .expect(201);
  });
  it('should return a object if the input is valid', async () => {
    const { body } = await request(app)
      .post('/api/v1/todos')
      .send({
        title: 'Finish Node Course',
        description: 'From Maximilian',
      })
      .expect(201);

    expect(mongoose.Types.ObjectId.isValid(body._id)).toBeTruthy();
    expect(typeof body.title).toBe('string');
    expect(typeof body.description).toBe('string');
  });
});
