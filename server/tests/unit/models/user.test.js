/* eslint-disable no-undef */

const { validateUser } = require('../../../models/user');
const { FALSY_VALUES } = require('../../../utility');
const { lorem, internet } = require('faker');

beforeEach(() => {
  payload = {
    name: 'Name Test',
    email: internet.email(),
    password: '997885486',
  };
});

let payload;

function exec() {
  return validateUser(payload);
}

describe('validateUser', () => {
  it('should generate an error if the name is falsy', () => {
    FALSY_VALUES.forEach((value) => {
      payload.name = value;

      const { error } = exec();

      expect(error).toBeTruthy();
      expect(error.message).toMatch(/name/);
    });
  });
  it('should generate an error if the name has less than 3 chars', () => {
    payload.name = 'Ra';

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/name.*3.*/);
  });
  it('should generate an error if name has more than 100 chars', () => {
    payload.name = lorem.sentence(50);

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/name.*100.*/);
  });
  it('should generate an error if the email is falsy', () => {
    FALSY_VALUES.forEach((value) => {
      payload.email = value;

      const { error } = exec();

      expect(error).toBeTruthy();
      expect(error.message).toMatch(/email/);
    });
  });
  it('should generate an error if the email is invalid', () => {
    payload.email = '88888888888';

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/email.*valid.*/);
  });
  it('should generate an error if the email has less than 8 chars', () => {
    payload.email = 'a@a.com';

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/email.*8.*/);
  });
  it('should generate an error if password is falsy', () => {
    FALSY_VALUES.forEach((value) => {
      payload.password = value;

      const { error } = exec();

      expect(error).toBeTruthy();
      expect(error.message).toMatch(/password/);
    });
  });
  it('should generate an error if password has less than 6 chars', () => {
    payload.password = '123';

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/password.*6.*/);
  });
  it('should generate an error if password has more than 255 chars', () => {
    payload.password = lorem.sentence(150);

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/password.*255.*/);
  });
  it('should not generate an error if the input is valid', () => {
    const { error, value } = exec();

    expect(error).toBeFalsy();
    expect(value).toEqual(payload);
  });
});
