const request = require('supertest');
const { start, stop } = require('../../../startup/server');
const { dropDatabase } = require('../../../startup/database');
const { User } = require('../../../models/user');
const { Item } = require('../../../models/item');

let app = null;
let token = null;
let payload = null;

function execGetAllRequest() {
  return request(app)
    .get('/api/v1/items')
    .set('Authorization', `Bearer ${token}`)
    .expect(200);
}

function execDeleteRequest(code, id) {
  return request(app)
    .delete(`/api/v1/items/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(code);
}

function execPostRequest(code) {
  return request(app)
    .post('/api/v1/items')
    .send(payload)
    .set('Authorization', `Bearer ${token}`)
    .expect(code);
}

beforeEach(async () => {
  app = await start();

  payload = {
    name: 'Apple',
    note: 'My First List',
    category: {
      _id: '5f455552f75a6016403b9971',
      name: 'fruit',
    },
  };

  await seedDatabase();
});

afterEach(async () => {
  await stop();
  await dropDatabase();
});

describe('GET /items', () => {
  it('should send 200', async () => {
    await execGetAllRequest();
  });
  it('should send an array with all items register by the user', async () => {
    const { body } = await execGetAllRequest();

    expect(Array.isArray(body)).toBeTruthy();
    expect(body).toHaveLength(2);
  });
  it('should send an array of Item', async () => {
    const { body } = await execGetAllRequest();

    expect(body[0]._id).toBeTruthy();
    expect(body[0].category).toBeTruthy();
    expect(body[0].user).toBeTruthy();
  });
});

describe('DELETE /items/:item', () => {
  it('should send 404 if the id does not have any match', async () => {
    await execDeleteRequest(404, '5f455552f75a6016403b9971');
  });
  it('should send 403 if the user does not own the list', async () => {
    const item = await Item.findOne({ name: 'Orange' });
    await execDeleteRequest(403, item.id);
  });
  it('should send 200 and a list object if the id is valid', async () => {
    const item = await Item.findOne({ name: 'Banana' });
    await execDeleteRequest(200, item.id);
  });
});

describe('POST /items', () => {
  it('should send 400 and a message if the payload is invalid', async () => {
    payload.name = null;

    const { body } = await execPostRequest(400);

    expect(typeof body).toBe('object');
    expect(body.message).toBeTruthy();
  });
  it('should send 201 and the item if the payload is valid', async () => {
    const { body } = await execPostRequest(201);

    expect(typeof body).toBe('object');
    expect(body._id).toBeTruthy();
    expect(body.name).toBeTruthy();
    expect(body.category).toBeTruthy();

    const item = Item.findOne({ name: payload.name });
    expect(item).not.toBeNull();
  });
});

async function seedDatabase() {
  const user = await User.create({
    name: 'Raphael',
    email: 'test@test.com',
    password: '111111111',
  });

  user.id = user._id;
  token = user.generateToken();

  await Item.create(
    {
      name: 'Banana',
      category: {
        _id: '5f455552f75a6016403b9971',
        name: 'fruit',
      },
      user: user.id,
    },
    {
      name: 'Abacate',
      category: {
        _id: '5f455552f75a6016403b9971',
        name: 'fruit',
      },
      user: user.id,
    }
  );

  await Item.create({
    name: 'Orange',
    category: { _id: '5f455552f75a6016403b9971', name: 'fruit' },
    user: '5f455552f75a6016403b9971',
  });
}
