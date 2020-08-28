/* eslint-disable no-undef */

const { validateUser } = require('../../models/user');
const { FALSY_VALUES } = require('../../utility');
const { lorem, name, internet } = require('faker');

describe('validateUser', () => {
  it('should generate an error if the name is falsy', () => {
    FALSY_VALUES.forEach((value) => {
      const { error } = validateUser({
        name: value,
      });
      expect(error).toBeTruthy();
      expect(error.message).toMatch(/name/);
    });
  });
  it('should generate an error if the name has less than 3 chars', () => {
    const { error } = validateUser({
      name: 'A',
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/name.*3.*/);
  });

  it('should generate an error if name has more than 100 chars', () => {
    const { error } = validateUser({
      name: lorem.sentence(50),
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/name.*100.*/);
  });

  it('should generate an error if the email is falsy', () => {
    FALSY_VALUES.forEach((value) => {
      const { error } = validateUser({
        name: name.firstName(),
        email: value,
      });
      expect(error).toBeTruthy();
      expect(error.message).toMatch(/email/);
    });
  });

  it('should generate an error if the email is invalid', () => {
    const { error } = validateUser({
      name: name.firstName(),
      email: '88888888888',
    });

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/email.*valid.*/);
  });

  it('should generate an error if the email has less than 8 chars', () => {
    const { error } = validateUser({
      name: name.firstName(),
      email: 'a@a.com',
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/email.*8.*/);
  });
  it('should generate an error if password is falsy', () => {
    FALSY_VALUES.forEach((value) => {
      const { error } = validateUser({
        name: name.firstName(),
        email: internet.email(),
        password: value,
      });

      expect(error).toBeTruthy();
      expect(error.message).toMatch(/password/);
    });
  });

  it('should generate an error if password has less than 6 chars', () => {
    const { error } = validateUser({
      name: name.firstName(),
      email: internet.email(),
      password: '123',
    });

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/password.*6.*/);
  });

  it('should generate an error if password has more than 255 chars', () => {
    const { error } = validateUser({
      name: name.firstName(),
      email: internet.email(),
      password: lorem.sentence(150),
    });

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/password.*255.*/);
  });

  it('should not generate an error if the input is valid', () => {
    const payload = {
      name: name.firstName(),
      email: internet.email(),
      password: '997885486',
    };
    const { error, value } = validateUser(payload);
    expect(error).toBeFalsy();
    expect(value).toEqual(payload);
  });
});
