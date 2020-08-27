/* eslint-disable no-undef */

const request = require('supertest');
const { start, stop } = require('../config/server');
const { initDatabase, dropDatabase } = require('../config/database');
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const faker = require('faker');

let app = null;
let token = null;

beforeEach(async () => {
  app = await start();
  await initDatabase();

  const user = await User.create({
    name: faker.name.firstName('male'),
    email: faker.internet.email(),
    password: '2342342',
  });

  token = jwt.sign({ _id: user.id }, process.env.JWT_KEY);
});

afterEach(async () => {
  stop();
  await dropDatabase();
});

describe('request to a route protected by the auth middleware', () => {
  it('should return 400 and a message if no token is provided', async () => {
    const { body } = await request(app).get('/api/v1/itens').expect(400);
    expect(typeof body).toBe('object');
    expect(body.message).toBeTruthy();
    expect(body.message).toBe('A token must be provided');
  });
  it('should return 400 and a message if the token is malformed', async () => {
    const { body } = await request(app)
      .get('/api/v1/itens')
      .set('X-Auth-Token', '123')
      .expect(400);
    expect(typeof body).toBe('object');
    expect(body.message).toBeTruthy();
    expect(body.message).toBe('Invalid Token');
  });
  it('should return 403 and a message if the token is invalid', async () => {
    const { body } = await request(app)
      .get('/api/v1/itens')
      .set(
        'X-Auth-Token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      )
      .expect(400);
    expect(typeof body).toBe('object');
    expect(body.message).toBeTruthy();
    expect(body.message).toBe('Invalid Token');
  });
  it('should call the next handler in the pipeline if the token is valid', async () => {
    await request(app)
      .get('/api/v1/itens')
      .set('X-Auth-Token', token)
      .expect(200);
  });
});
