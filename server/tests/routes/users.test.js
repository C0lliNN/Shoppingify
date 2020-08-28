/* eslint-disable no-undef */
const request = require('supertest');
const { start, stop } = require('../../startup/server');
const { initDatabase, dropDatabase } = require('../../startup/database');

let app = null;

beforeEach(async () => {
  app = await start();
  await initDatabase();
});

afterEach(async () => {
  stop();
  await dropDatabase();
});

test('It should return true', () => {
  expect(true).toBe(true);
});

describe('POST /users', () => {
  // Payload specif validation is already tested in models/user.test.js
  it('should send 400 if the payload is invalid', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({ name: 'Raphael', password: '9565268953' })
      .expect(400);
  });

  it('should send the error message if the payload is invalid', async () => {
    const { body } = await request(app)
      .post('/api/v1/users')
      .send({ name: 'Raphael', password: '9565268953' })
      .expect(400);
    expect(typeof body).toBe('object');
    expect(body.message).toBeTruthy();
  });

  it('should send 201 if payload is valid', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({ name: 'Raphael', email: 'test@test.com', password: '888975279' })
      .expect(201);
  });

  it('should send user object if payload is valid', async () => {
    const { body } = await request(app)
      .post('/api/v1/users')
      .send({ name: 'Raphael', email: 'test@test.com', password: '888975279' })
      .expect(201);

    expect(typeof body).toBe('object');
    expect(body._id).toBeTruthy();
    expect(body.name).toBeTruthy();
    expect(body.password).toBeFalsy();
    expect(body.email).toBeTruthy();
    expect(body.token).toBeTruthy();
    expect(body.expiresIn).toBeTruthy();
  });
});
