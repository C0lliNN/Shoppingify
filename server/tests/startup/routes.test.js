/* eslint-disable no-undef */

const { start, stop } = require('../../startup/server');
const { initDatabase, dropDatabase } = require('../../startup/database');
const { User } = require('../../models/User');
const request = require('supertest');
const bcrypt = require('bcrypt');

let app;

beforeEach(async () => {
  app = await start();
  await initDatabase();
});

afterEach(async () => {
  stop();
  await dropDatabase();
});

describe('/api/v1/users routes should not be protected', () => {
  it('should send 201 if no Authorization is defined', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'Raphael Collin',
        email: 'raphael@test.com',
        password: '1111111',
      })
      .expect(201);
  });
});

describe('api/v1/auth routes should not be protected', () => {
  it('should send 200 if no Authorization is defined', async () => {
    const hashedPassword = await bcrypt.hash('11111111', 10);
    const user = await User.create({
      name: 'Raphael Collin',
      email: 'test@test.com',
      password: hashedPassword,
    });
    await request(app)
      .post('/api/v1/auth')
      .send({ email: user.email, password: '11111111' })
      .expect(200);
  });
});

describe('api/v1/itens routes should be protected', () => {
  it('should send 400 if no Authorization is defined', async () => {
    await request(app).get('/api/v1/itens').expect(401);
  });
  it('should send 200 if Authorization is defined', async () => {
    const user = new User({
      name: 'Raphael Collin',
      email: 'test@test.com',
      password: '111111111',
    });

    await request(app)
      .get('/api/v1/itens')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .expect(200);
  });
});

describe('api/v1/lists routes should be protected', () => {
  it('should send 400 if no Authorization is defined', async () => {
    await request(app).get('/api/v1/lists').expect(401);
  });
  it('should send 200 if Authorization is defined', async () => {
    const user = new User({
      name: 'Raphael Collin',
      email: 'test@test.com',
      password: '111111111',
    });

    await request(app)
      .get('/api/v1/lists')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .expect(200);
  });
});
