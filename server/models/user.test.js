/* eslint-disable no-undef */

const { validateUser } = require('./user');

describe('validateUser', () => {
  it('should generate a error if the name is falsy', () => {
    const { error } = validateUser({
      email: 'test@test.com',
      password: '8846512123',
    });
    expect(error).toBeTruthy();
  });
  it('should generate a error if the name has less than 3 chars', () => {
    const { error } = validateUser({
      name: 'A',
      email: 'teste@teste.com',
      password: '999999999',
    });
    expect(error).toBeTruthy();
  });

  it('should generate a error if name has more than 100 chars', () => {
    const { error } = validateUser({
      name:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas natus aspernatur laborum magni vero ex quis inventore nemo dolore eaque?',
      email: 'test@test.com',
      password: '999999999',
    });
    expect(error).toBeTruthy();
  });

  it('should generate a error if the email is falsy', () => {
    const { error } = validateUser({
      name: 'test',
      password: '456756123',
    });
    expect(error).toBeTruthy();
  });

  it('should generate a error if the email is invalid', () => {
    const { error } = validateUser({
      name: 'Test',
      email: '88888888888',
      password: '999983523',
    });

    expect(error).toBeTruthy();
  });

  it('should generate a error if password is falsy', () => {
    const { error } = validateUser({
      name: 'Test',
      email: 'test@test.com',
      password: null,
    });

    expect(error).toBeTruthy();
  });

  it('should generate a error if password has less than 6 chars', () => {
    const { error } = validateUser({
      name: 'test',
      email: 'test@test.com',
      password: '99545',
    });
    expect(error).toBeTruthy();
  });

  it('should not generate a error if the input is valid', () => {
    const { error } = validateUser({
      name: 'raphael',
      email: 'raphael@test.com',
      password: '997885486',
    });
    expect(error).toBeFalsy();
  });
});
