/* eslint-disable no-undef */
const { start, stop } = require('../../../startup/server');
const { dropDatabase } = require('../../../startup/database');
const request = require('supertest');
const { User } = require('../../../models/User');
const { List } = require('../../../models/list');

let app;

beforeEach(async () => {
  app = await start();
});

afterEach(async () => {
  stop();
  await dropDatabase();
});

describe('validate-object-id middleware', () => {
  let user = null;
  beforeEach(() => {
    user = new User({
      name: 'Raphael Collin',
      email: 'test@test.com',
      password: '111111111',
    });
  });
  it('should send 404 if the id is invalid', async () => {
    await request(app)
      .patch('/api/v1/lists/123/complete')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .expect(404);
  });
  it('should send 200 if it is a valid objectId', async () => {
    const list = await List.create({
      name: 'October 2020 List',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: 'Banana',
          category: {
            _id: '5f455552f75a6016403b9971',
            name: 'Fruit',
          },
          quantity: 3,
        },
        {
          _id: '5f455552f75a6016403b9972',
          name: 'Apple',
          category: {
            _id: '5f455552f75a6016403b9971',
            name: 'Fruit',
          },
          quantity: 4,
        },
      ],
      status: 'active',
      user: user.id,
    });
    await request(app)
      .patch(`/api/v1/lists/${list.id}/complete`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .expect(200);
  });
});
