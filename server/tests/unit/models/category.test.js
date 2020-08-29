/* eslint-disable no-undef */
const { validateCategory } = require('../../../models/category');
const { FALSY_VALUES } = require('../../../utility');
const { lorem } = require('faker');

describe('validateCategory', () => {
  it('should generate an error if the name is falsy', () => {
    FALSY_VALUES.forEach((value) => {
      const { error } = validateCategory({ name: value });
      expect(error).toBeTruthy();
      expect(error.message).toMatch(/name/i);
    });
  });
  it('should generate an error if the name has less than 3 chars', () => {
    const { error } = validateCategory({
      name: 'ra',
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/name.*3.*/i);
  });
  it('should generate an error if the name has more than 120 chars', () => {
    const { error } = validateCategory({
      name: lorem.sentence(60),
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/name.*120.*/i);
  });

  it('should not generate an error if name has between 3 and 120 chars', () => {
    const payload = {
      name: 'Name Test',
    };
    const { error, value } = validateCategory(payload);
    expect(error).toBeFalsy();
    expect(value).toEqual(value);
  });
});
