const request = require('supertest');
const { start, stop } = require('../../../startup/server');
const { dropDatabase } = require('../../../startup/database');
const { Item } = require('../../../models/item');
const { User } = require('../../../models/user');

let app = null;
let token = null;
let id1 = null;
let id2 = null;

beforeEach(async () => {
  app = await start();
  await seedDatabase();
});

afterEach(async () => {
  await stop();
  await dropDatabase();
});

describe('authorization middleware', () => {
  it('should return 200 if the path has no params', async () => {
    await request(app)
      .get('/api/v1/items')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
  it('should return 403 if the user does not own the resource', async () => {
    await request(app)
      .delete(`/api/v1/items/${id2}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(403);
  });
  it('should return 200 if the user owns the resource', async () => {
    await request(app)
      .delete(`/api/v1/items/${id1}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});

async function seedDatabase() {
  const user = await User.create({
    name: 'Raphael',
    email: 'test@test.com',
    password: '111111111111111',
  });

  const user2 = await User.create({
    name: 'Raphael',
    email: 'test2@test.com',
    password: '111111111111111',
  });

  token = user.generateToken();

  let item = await Item.create({
    name: 'Banana',
    category: {
      _id: '5f455552f75a6016403b9971',
      name: 'fruit',
    },
    user: user.id,
  });

  id1 = item.id;

  item = await Item.create({
    name: 'Abacate',
    category: {
      _id: '5f455552f75a6016403b9971',
      name: 'fruit',
    },
    user: user2.id,
  });

  id2 = item.id;
}
