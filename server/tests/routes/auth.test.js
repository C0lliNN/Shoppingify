/* eslint-disable no-undef */

const { start, stop } = require('../../config/server');
const { initDatabase, dropDatabase } = require('../../config/database');
const { User } = require('../../models/User');
const request = require('supertest');
const bcrypt = require('bcrypt');
const { FALSY_VALUES } = require('../../utility');
const { internet } = require('faker');
let app = null;

beforeEach(async () => {
  app = await start();
  await initDatabase();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('11111111', salt);
  await User.create({
    name: 'Test',
    email: 'test@test.com',
    password: hashedPassword,
  });
});

afterEach(async () => {
  stop();
  await dropDatabase();
});

describe('POST /auth', () => {
  it('should send 400 and a message if the email is falsy', async () => {
    FALSY_VALUES.forEach(async (value) => {
      const { body } = await request(app)
        .post('/api/v1/auth')
        .send({ email: value })
        .expect(400);
      expect(body).toBeTruthy();
      expect(body.message).toBeTruthy();
      expect(body.message).toMatch(/email/);
    });
  });
  it('should send 400 and a message if the password is falsy', async () => {
    FALSY_VALUES.forEach(async (value) => {
      const { body } = await request(app)
        .post('/api/v1/auth')
        .send({ email: internet.email(), password: value })
        .expect(400);
      expect(body).toBeTruthy();
      expect(body.message).toBeTruthy();
      expect(body.message).toMatch(/password/);
    });
  });
  it('should send 400 and a message if the email was not founded', async () => {
    const { body } = await request(app)
      .post('/api/v1/auth')
      .send({ email: 'test2@test.com', password: '11111111' })
      .expect(400);

    expect(typeof body).toBe('object');
    expect(body.message).toBeTruthy();
  });
  it('should send 400 and a message if the password is not correct', async () => {
    const { body } = await request(app)
      .post('/api/v1/auth')
      .send({ email: 'test@test.com', password: '22222222' })
      .expect(400);

    expect(typeof body).toBe('object');
    expect(body.message).toBeTruthy();
  });
  it('should send 200, the token and the expiration time it both the email and password match a record', async () => {
    const { body } = await request(app)
      .post('/api/v1/auth')
      .send({ email: 'test@test.com', password: '11111111' })
      .expect(200);

    expect(typeof body).toBe('object');
    expect(body.token).toBeTruthy();
    expect(body.expiresIn).toBeTruthy();
  });
});