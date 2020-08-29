const request = require('supertest');
const { start, stop } = require('../../../startup/server');
const { dropDatabase } = require('../../../startup/database');

let app = null;
let payload = null;

function exec(code) {
  return request(app).post('/api/v1/users').send(payload).expect(code);
}

beforeEach(async () => {
  app = await start();
  payload = {
    name: 'Raphael',
    email: 'test@test.com',
    password: '888975279',
  };
});

afterEach(async () => {
  stop();
  await dropDatabase();
});

describe('POST /users', () => {
  // Payload specif validation is already tested in models/user.test.js
  it('should send 400 and a message if the payload is invalid', async () => {
    payload.email = null;

    const { body } = await exec(400);

    expect(typeof body).toBe('object');
    expect(body.message).toBeTruthy();
  });
  it('should send 201 and a user object if payload is valid', async () => {
    const { body } = await exec(201);

    expect(typeof body).toBe('object');
    expect(body._id).toBeTruthy();
    expect(body.name).toBeTruthy();
    expect(body.password).toBeFalsy();
    expect(body.email).toBeTruthy();
    expect(body.token).toBeTruthy();
    expect(body.expiresIn).toBeTruthy();
  });
});
