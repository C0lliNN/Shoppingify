const request = require('supertest');
const { start, stop } = require('../../../startup/server');
const { dropDatabase } = require('../../../startup/database');
const { List } = require('../../../models/list');
const { User } = require('../../../models/user');

let app = null;
let token = null;
let listId = null;

beforeEach(async () => {
  app = await start();
  await seedDatabase();
});

afterEach(async () => {
  await stop();
  await dropDatabase();
});

function exec(code) {
  return request(app)
    .get(`/api/v1/lists/${listId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(code);
}

describe('get-list middleware', () => {
  it('should return 404 if the listId is not a valid objectId', async () => {
    listId = '1123123';
    await exec(404);
  });
  it('should return 404 if the listId is not founded', async () => {
    listId = '507f1f77bcf86cd799439011';
    await exec(404);
  });
  it('should work correctly and return 200 if the is valid', async () => {
    await exec(200);
  });
});

async function seedDatabase() {
  const user = await User.create({
    name: 'Raphael',
    email: 'test@test.com',
    password: '111111111111111',
  });

  token = user.generateToken();

  const list = await List.create({
    name: 'September 2020 List',
    items: [
      {
        _id: '5f455552f75a6016403b9971',
        name: 'Banana',
        category: {
          _id: '5f455552f75a6016403b9971',
          name: 'Fruit',
        },
        quantity: 2,
      },
      {
        _id: '5f455552f75a6016403b9972',
        name: 'Apple',
        category: {
          _id: '5f455552f75a6016403b9971',
          name: 'Fruit',
        },
        quantity: 3,
      },
    ],
    status: 'canceled',
    user: user.id,
  });

  listId = list.id;
}
