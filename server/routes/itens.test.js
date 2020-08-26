/* eslint-disable no-undef */

const request = require('supertest');
const { start, stop } = require('../config/server');
const { initDatabase, dropDatabase } = require('../config/database');
const bcrypt = require('bcrypt');
const { User } = require('../models/User');
const { Item } = require('../models/item');
const jwt = require('jsonwebtoken');

let app = null;
let userId = null;
let token = null;

beforeEach(async () => {
  app = await start();
  await initDatabase();
  const hashedPassword = await bcrypt.hash('1111111', 10);
  const user = await User.create({
    name: 'Raphael',
    email: 'test@test.com',
    password: hashedPassword,
  });
  userId = user._id;
  token = jwt.sign({ _id: userId }, process.env.JWT_KEY);
  await Item.create(
    {
      name: 'Banana',
      category: {
        _id: '5f455552f75a6016403b9971',
        name: 'fruit',
        user: userId,
      },
      user: userId,
    },
    {
      name: 'Abacate',
      category: {
        _id: '5f455552f75a6016403b9971',
        name: 'fruit',
        user: userId,
      },
      user: userId,
    }
  );

  const user2 = await User.create({
    name: 'John',
    email: 'john@test.com',
    password: hashedPassword,
  });

  await Item.create({
    name: 'Orange',
    category: { _id: '5f455552f75a6016403b9971', name: 'fruit', user: userId },
    user: user2.id,
  });
});

afterEach(async () => {
  stop();
  await dropDatabase();
});

describe('GET /itens', () => {
  it('should send 200', async () => {
    await request(app)
      .get('/api/v1/itens')
      .set('X-Auth-Token', token)
      .expect(200);
  });
  it('should send an array with all itens register by the user', async () => {
    const { body } = await request(app)
      .get('/api/v1/itens')
      .set('X-Auth-Token', token)
      .expect(200);

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBe(2);
  });
  it('should send an array of Item', async () => {
    const { body } = await request(app)
      .get('/api/v1/itens')
      .set('X-Auth-Token', token)
      .expect(200);

    expect(body[0]._id).toBeTruthy();
    expect(body[0].category).toBeTruthy();
    expect(body[0].user).toBeTruthy();
  });
});

describe('POST /itens', () => {
  it('should send 400 if no token is provided', async () => {
    await request(app).post('/api/v1/itens').expect(400);
  });
  it('should send 400 if token is invalid', async () => {
    await request(app)
      .post('/api/v1/itens')
      .set('X-Auth-Token', '123')
      .expect(400);
  });
  it('should send 400 and a message if the payload is invalid', async () => {
    const { body } = await request(app)
      .post('/api/v1/itens')
      .send({ name: 'Banana' })
      .set('X-Auth-Token', token)
      .expect(400);
    expect(typeof body).toBe('object');
    expect(body.message).toBeTruthy();
  });
  it('should send 201 and the item if the payload is valid', async () => {
    const { body } = await request(app)
      .post('/api/v1/itens')
      .send({
        name: 'Apple',
        category: {
          _id: '5f455552f75a6016403b9971',
          name: 'fruit',
        },
        user: userId,
      })
      .set('X-Auth-Token', token)
      .expect(201);
    expect(typeof body).toBe('object');
    expect(body._id).toBeTruthy();
    expect(body.name).toBeTruthy();
    expect(body.category).toBeTruthy();
  });
});
