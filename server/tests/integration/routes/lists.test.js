/* eslint-disable no-undef */

const request = require('supertest');
const { start, stop } = require('../../../startup/server');
const { dropDatabase } = require('../../../startup/database');
const bcrypt = require('bcrypt');
const { User } = require('../../../models/User');
const jwt = require('jsonwebtoken');
const { List } = require('../../../models/list');

let app = null;
let userId = null;
let token = null;
let payload = null;

function execPostRequest(code) {
  return request(app)
    .post('/api/v1/lists')
    .set('Authorization', `Bearer ${token}`)
    .send(payload)
    .expect(code);
}

function execPatchRequest(type, id, code) {
  if (type !== 'complete' && type !== 'cancel') {
    throw new Error('Invalid Type');
  }
  return request(app)
    .patch(`/api/v1/lists/${id}/${type}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(code);
}

beforeEach(async () => {
  app = await start();

  payload = {
    name: 'July Shopping List',
    itens: [
      {
        _id: '5f3ae6bc45c56326083561c5',
        name: 'Apple',
        category: {
          _id: '5f3ae6bc45c56326083561c5',
          name: 'Fruit',
        },
        quantity: 2,
      },
    ],
    status: 'active',
  };

  await seedDatabase();
});

afterEach(async () => {
  stop();
  await dropDatabase();
});

describe('GET /lists', () => {
  it('should send 200 and an array on list registered by the user', async () => {
    const { body } = await request(app)
      .get('/api/v1/lists')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(Array.isArray(body));
    expect(body.length).toBe(2);
    expect(body[0]._id).toBeTruthy();
    expect(body[0].name).toBeTruthy();
    expect(body[0].status).toBeTruthy();
    expect(body[0].itens).toBeTruthy();
  });
});

describe('POST /lists', () => {
  it('should send 400 if the payload is invalid', async () => {
    payload.name = null;

    await execPostRequest(400);
  });
  it('should send 201 and an list object if the payload is valid', async () => {
    const { body } = await execPostRequest(201);

    expect(body).toMatchObject(payload);

    const list = await List.findOne({ name: payload.name });
    expect(list).toBeTruthy();
  });
});

describe('PATCH /lists/:id/complete', () => {
  it('should send 404 if the id is not a valid objectId', async () => {
    await execPatchRequest('complete', '123', 404);
  });
  it('should send 404 if the id does not have any match', async () => {
    await execPatchRequest('complete', '5f3ae6bc45c56326083561c5', 404);
  });
  it('should send 400 if the list has a status different of "active"', async () => {
    const list = await List.findOne({ name: 'September 2020 List' });
    await execPatchRequest('complete', list.id, 400);
  });
  it('should send 200 and the list should be updated in the db if id is valid', async () => {
    const list = await List.findOne({ name: 'October 2020 List' });
    await execPatchRequest('complete', list.id, 200);

    const updatedList = await List.findOne({ name: 'October 2020 List' });
    expect(updatedList.status).toBe('completed');
  });
});

describe('PATCH /lists/:id/cancel', () => {
  it('should send 404 if the id is not a valid objectId', async () => {
    await execPatchRequest('cancel', '123', 404);
  });
  it('should send 404 if the id does not have any match', async () => {
    await execPatchRequest('cancel', '5f3ae6bc45c56326083561c5', 404);
  });
  it('should send 400 if the list has a status different of "active"', async () => {
    const list = await List.findOne({ name: 'September 2020 List' });

    await execPatchRequest('cancel', list.id, 400);
  });
  it('should send 200 and the list should be updated in the db if id is valid', async () => {
    const list = await List.findOne({ name: 'October 2020 List' });

    await execPatchRequest('cancel', list.id, 200);

    const updatedList = await List.findOne({ name: 'October 2020 List' });
    expect(updatedList.status).toBe('canceled');
  });
});

async function seedDatabase() {
  const hashedPassword = await bcrypt.hash('1111111', 10);
  const user = await User.create({
    name: 'Raphael',
    email: 'test@test.com',
    password: hashedPassword,
  });
  userId = user._id;
  token = jwt.sign({ _id: userId }, process.env.JWT_KEY);
  await List.create(
    {
      name: 'September 2020 List',
      itens: [
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
      user: userId,
    },
    {
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
      user: userId,
    }
  );

  const user2 = await User.create({
    name: 'John',
    email: 'john@test.com',
    password: hashedPassword,
  });

  await List.create({
    name: 'October 2020 List',
    itens: [
      {
        _id: '5f455552f75a6016403b9971',
        name: 'Orange',
        category: {
          _id: '5f455552f75a6016403b9971',
          name: 'Fruit',
        },
        quantity: 3,
      },
    ],
    status: 'active',
    user: user2.id,
  });
}
