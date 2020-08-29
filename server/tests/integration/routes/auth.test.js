const { start, stop } = require('../../../startup/server');
const { dropDatabase } = require('../../../startup/database');
const { User } = require('../../../models/User');
const request = require('supertest');
const bcrypt = require('bcrypt');
const { FALSY_VALUES } = require('../../../utility');

let app = null;
let payload = null;

function exec(code) {
  return request(app).post('/api/v1/auth').send(payload).expect(code);
}

beforeEach(async () => {
  app = await start();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('11111111', salt);
  await User.create({
    name: 'Test',
    email: 'test@test.com',
    password: hashedPassword,
  });

  payload = { email: 'test@test.com', password: '11111111' };
});

afterEach(async () => {
  stop();
  await dropDatabase();
});

describe('POST /auth', () => {
  it('should send 400 and a message if the email is falsy', async () => {
    FALSY_VALUES.forEach(async (value) => {
      payload.email = value;

      const { body } = await exec(400);

      expect(body).toBeTruthy();
      expect(body.message).toBeTruthy();
      expect(body.message).toMatch(/email/);
    });
  });
  it('should send 400 and a message if the password is falsy', async () => {
    FALSY_VALUES.forEach(async (value) => {
      payload.password = value;

      const { body } = await exec(400);

      expect(body).toBeTruthy();
      expect(body.message).toBeTruthy();
      expect(body.message).toMatch(/password/);
    });
  });
  it('should send 400 and a message if the email was not founded', async () => {
    payload.email = 'test2@test.com';

    const { body } = await exec(400);

    expect(typeof body).toBe('object');
    expect(body.message).toBeTruthy();
  });
  it('should send 400 and a message if the password is not correct', async () => {
    payload.password = '22222222';

    const { body } = await exec(400);

    expect(typeof body).toBe('object');
    expect(body.message).toBeTruthy();
  });
  it('should send 200, the token and the expiration time it both the email and password match a record', async () => {
    const { body } = await exec(200);

    expect(typeof body).toBe('object');
    expect(body.token).toBeTruthy();
    expect(body.expiresIn).toBeTruthy();
  });
});
