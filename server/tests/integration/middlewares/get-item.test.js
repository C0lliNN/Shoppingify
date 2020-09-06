const request = require('supertest');
const { start, stop } = require('../../../startup/server');
const { dropDatabase } = require('../../../startup/database');
const { Item } = require('../../../models/item');
const { User } = require('../../../models/user');

let app = null;
let token = null;
let itemId = null;

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
    .delete(`/api/v1/items/${itemId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(code);
}

describe('get-item middleware', () => {
  it('should return 404 if the itemId is not a valid objectId', async () => {
    itemId = '1123123';
    await exec(404);
  });
  it('should return 404 if the itemId is not founded', async () => {
    itemId = '507f1f77bcf86cd799439011';
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

  const item = await Item.create({
    name: 'Banana',
    category: {
      _id: '5f455552f75a6016403b9971',
      name: 'fruit',
    },
    user: user.id,
  });

  itemId = item.id;
}
