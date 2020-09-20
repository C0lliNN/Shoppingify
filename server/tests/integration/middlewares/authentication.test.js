const request = require('supertest');
const { start, stop } = require('../../../startup/server');
const { dropDatabase } = require('../../../startup/database');
const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const faker = require('faker');

let app = null;
let token = null;

function exec(code) {
  if (token) {
    return request(app)
      .get('/api/v1/items')
      .set('Authorization', `Bearer ${token}`)
      .expect(code);
  } else {
    return request(app).get('/api/v1/items').expect(code);
  }
}

beforeEach(async () => {
  app = await start();

  const user = await User.create({
    name: 'name test',
    email: faker.internet.email(),
    password: '2342342',
  });

  token = jwt.sign({ _id: user.id }, process.env.JWT_KEY);
});

afterEach(async () => {
  await stop();
  await dropDatabase();
});

describe('request to a route protected by the auth middleware', () => {
  it('should return 401 and a message if no token is provided', async () => {
    token = undefined;

    const { body } = await exec(401);

    expect(typeof body).toBe('object');
    expect(body.message).toBeTruthy();
    expect(body.message).toBe('A token must be provided');
  });
  it('should return 400 and a message if the token is malformed', async () => {
    token = '123';

    const { body } = await exec(400);

    expect(typeof body).toBe('object');
    expect(body.message).toBeTruthy();
    expect(body.message).toBe('Invalid Token');
  });
  it('should return 400 and a message if the token is invalid', async () => {
    //prettier-ignore
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    const { body } = await exec(400);

    expect(typeof body).toBe('object');
    expect(body.message).toBeTruthy();
    expect(body.message).toBe('Invalid Token');
  });
  it('should call the next handler in the pipeline if the token is valid', async () => {
    await exec(200);
  });
});
