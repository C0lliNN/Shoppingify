/* eslint-disable no-undef */

const { getUserId, getTokenFromHeader } = require('../utility');
const jwt = require('jsonwebtoken');
const { start, stop } = require('../config/server');

describe('getUserId', () => {
  it('should throw an Error if the token is invalid', () => {
    expect(() => {
      getUserId('123');
    }).toThrowError('Invalid Token');
  });
  it('should return the correct id if the token is valid', async () => {
    await start();

    const key = process.env.JWT_KEY;
    const token = jwt.sign({ _id: '1#####' }, key);
    const id = getUserId(token);

    expect(id).toBe('1#####');

    stop();
  });
});

describe('getTokenFromHeader', () => {
  it('should trow an error if the header is invalid', () => {
    expect(() => {
      getTokenFromHeader(`123456`);
    }).toThrowError('Invalid Header');
  });
  it('should return the token if the header is valid', () => {
    const key = process.env.JWT_KEY;
    const token = jwt.sign({ _id: '1#####' }, key);
    getTokenFromHeader(`Bearer ${token}`);
  });
});
