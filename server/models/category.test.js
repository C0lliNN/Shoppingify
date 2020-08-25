/* eslint-disable no-undef */
const { validateCategory } = require('./category');

describe('validateCategory', () => {
  it('should generate an error if the name is falsy', () => {
    let error = validateCategory({ name: '' }).error;
    expect(error).toBeTruthy();

    error = validateCategory({ name: null }).error;
    expect(error).toBeTruthy();

    error = validateCategory({}).error;
    expect(error).toBeTruthy();
  });
  it('should generate an error if the name has less than 3 chars', () => {
    const { error } = validateCategory({ name: 'Ra' });
    expect(error).toBeTruthy();
  });
  it('should generate an error if the name has more than 120 chars', () => {
    const { error } = validateCategory({
      name:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, sequi. Lorem ipsum dolor sit amet consectetur adipisicing.',
    });
    expect(error).toBeTruthy();
  });
  it('should not generate an error if name has between 3 and 120 chars', () => {
    const { error } = validateCategory({ name: 'Fruits' });
    expect(error).toBeFalsy();
  });
});
