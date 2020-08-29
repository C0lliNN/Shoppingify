/* eslint-disable no-undef */
const { start, stop } = require('../../../startup/server');
const { dropDatabase } = require('../../../startup/database');
const request = require('supertest');
const { User } = require('../../../models/User');
const { List } = require('../../../models/list');

let app;
let token1;
let list1Id;
let token2;

beforeEach(async () => {
  app = await start();
  await seedDatabase();
});

afterEach(async () => {
  stop();
  await dropDatabase();
});

function exec(listId, token, code) {
  return request(app)
    .patch(`/api/v1/lists/${listId}/complete`)
    .set('Authorization', `Bearer ${token}`)
    .expect(code);
}

describe('validate-list middleware', () => {
  it('should send 404 and a message if the list was not founded', async () => {
    const { body } = await exec('5f455552f75a6016403b9971', token1, 404);

    expect(body).toBeTruthy();
    expect(body.message).toBeTruthy();
    expect(body.message).toMatch(/list not founded/i);
  });
  it('should send 403 if the list does not belong to the user', async () => {
    const { body } = await exec(list1Id, token2, 403);
    expect(body).toBeTruthy();
    expect(body.message).toBeTruthy();
    expect(body.message).toMatch(/.*access.*/i);
  });
  it('should send 200 if list was founded and belongs to the user', async () => {
    await exec(list1Id, token1, 200);
  });
});

async function seedDatabase() {
  const user = await User.create({
    name: 'Raphael Collin',
    email: 'test@test.com',
    password: '111111111',
  });

  token1 = user.generateToken();

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

  list1Id = list.id;

  const user2 = await User.create({
    name: 'Philippe Olivier',
    email: 'philippe@test.com',
    password: '112312312',
  });

  token2 = user2.generateToken();

  await List.create({
    name: 'December 2020 List',
    itens: [
      {
        _id: '5f455552f75a6016403b9971',
        name: 'Apple',
        category: {
          _id: '5f455552f75a6016403b9971',
          name: 'Fruit',
        },
        quantity: 3,
      },
      {
        _id: '5f455552f75a6016403b9972',
        name: 'Strawberry',
        category: {
          _id: '5f455552f75a6016403b9971',
          name: 'Fruit',
        },
        quantity: 4,
      },
    ],
    status: 'active',
    user: user2.id,
  });
}
