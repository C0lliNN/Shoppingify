/* eslint-disable no-undef */
const { validateCategory } = require('./category');

const VALID_OBJECT_ID = '5f455552f75a6016403b9971';

describe('validateCategory', () => {
  it('should generate an error if the name is falsy', () => {
    let error = validateCategory({ name: '', user: VALID_OBJECT_ID }).error;
    expect(error).toBeTruthy();

    error = validateCategory({ name: null, user: VALID_OBJECT_ID }).error;
    expect(error).toBeTruthy();

    error = validateCategory({}).error;
    expect(error).toBeTruthy();
  });
  it('should generate an error if the name has less than 3 chars', () => {
    const { error } = validateCategory({ name: 'Ra', user: VALID_OBJECT_ID });
    expect(error).toBeTruthy();
  });
  it('should generate an error if the name has more than 120 chars', () => {
    const { error } = validateCategory({
      name:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, sequi. Lorem ipsum dolor sit amet consectetur adipisicing.',
      user: VALID_OBJECT_ID,
    });
    expect(error).toBeTruthy();
  });

  it('should generate an error if user is falsy', () => {
    const { error } = validateCategory({
      name: 'Fruits',
    });
    expect(error).toBeTruthy();
  });
  it('should generate an error if user is not a valid objectId', () => {
    const { error } = validateCategory({
      name: 'Fruits',
      user: '11111111111',
    });
    expect(error).toBeTruthy();
  });
  it('should not generate an error if name has between 3 and 120 chars and user is valid', () => {
    const { error } = validateCategory({
      name: 'Fruits',
      user: VALID_OBJECT_ID,
    });
    expect(error).toBeFalsy();
  });
});
