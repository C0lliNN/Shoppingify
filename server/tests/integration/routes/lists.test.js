const request = require('supertest');
const { start, stop } = require('../../../startup/server');
const { dropDatabase } = require('../../../startup/database');
const bcrypt = require('bcrypt');
const { User } = require('../../../models/user');
const { List } = require('../../../models/list');

let app = null;
let token = null;
let payload = null;

function execGetListRequest(code, id) {
  return request(app)
    .get(`/api/v1/lists/${id}`)
    .expect(code)
    .set('Authorization', `Bearer ${token}`);
}

function execGetActiveListRequest() {
  return request(app)
    .get('/api/v1/lists/active')
    .expect(200)
    .set('Authorization', `Bearer ${token}`);
}

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
    items: [
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
  await stop();
  await dropDatabase();
});

describe('GET /lists', () => {
  it('should send 200 and an array on list registered by the user', async () => {
    const { body } = await request(app)
      .get('/api/v1/lists')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(Array.isArray(body)).toBeTruthy();
    expect(body).toHaveLength(2);
    expect(body[0]._id).toBeTruthy();
    expect(body[0].name).toBeTruthy();
    expect(body[0].status).toBeTruthy();
    expect(body[0].items).toBeTruthy();
  });
});
describe('GET /lists/active', () => {
  it('should send 200 and a falsy value if there is no active list', async () => {
    const activeList = await List.findOne({ name: 'October 2020 List' });
    await execPatchRequest('complete', activeList.id, 200);

    const { body } = await execGetActiveListRequest();

    expect(body._id).toBeFalsy();
    expect(body.name).toBeFalsy();
  });
  it('should send 200 and the data if there is one active list', async () => {
    const { body } = await execGetActiveListRequest();

    expect(body.name).toBe('October 2020 List');
  });
});
describe('GET /lists/:list', () => {
  it('should send 404 if the id does not have any match', async () => {
    await execGetListRequest(404, '5f455552f75a6016403b9971');
  });
  it('should send 403 if the user does not own the list', async () => {
    const list = await List.findOne({ name: 'November 2020 List' });
    await execGetListRequest(403, list.id);
  });
  it('should send 200 and a list object if the id is valid', async () => {
    const list = await List.findOne({ name: 'October 2020 List' });

    const { body } = await execGetListRequest(200, list.id);
    expect(body._id).toBe(list.id);
    expect(body.name).toBe(list.name);
  });
});

describe('POST /lists', () => {
  it('should send 400 if the payload is invalid', async () => {
    payload.name = null;

    await execPostRequest(400);
  });
  it('should send 400 if the user already has a active list', async () => {
    const { body } = await execPostRequest(400);

    expect(body.message).toMatch(/active/);
  });
  it('should send 201 and an list object if the payload is valid', async () => {
    // Only one list can be active at a time
    const activeList = await List.findOne({ name: 'October 2020 List' });
    await execPatchRequest('complete', activeList.id, 200);

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
  it('should send 403 if the list does not belong to the user', async () => {
    const list = await List.findOne({ name: 'November 2020 List' });
    await execPatchRequest('complete', list.id, 403);
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
  it('should send 403 if the list does not belong to the user', async () => {
    const list = await List.findOne({ name: 'November 2020 List' });
    await execPatchRequest('cancel', list.id, 403);
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

  token = user.generateToken();

  await List.create(
    {
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
    },
    {
      name: 'October 2020 List',
      items: [
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
    }
  );

  await List.create({
    name: 'November 2020 List',
    items: [
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
    user: '5f455552f75a6016403b9971',
  });
}
