const request = require('supertest');
const { start, stop } = require('../../../startup/server');
const Joi = require('joi');

let app;

beforeEach(async () => {
  app = await start();
});

afterEach(async () => {
  await stop();
});

jest.mock('joi');

describe('auth middleware', () => {
  it('should send 500 and a message if an error is raised inside a async function', async () => {
    const message = 'Invalid Payload';

    Joi.object.mockImplementation(() => {
      throw new Error(message);
    });

    const { body } = await request(app).post('/api/v1/auth').expect(500);

    expect(body).toBeTruthy();
    expect(body.message).toBeTruthy();
  });
});
