/* eslint-disable no-undef */

const { validateItem } = require('./item');
const { FALSY_VALUES } = require('../utility');
const { lorem, name } = require('faker');

describe('validateItem', () => {
  it('should generate an error if the name is falsy', () => {
    FALSY_VALUES.forEach((value) => {
      const { error } = validateItem({
        name: value,
      });
      expect(error).toBeTruthy();
      expect(error.message).toMatch(/name/i);
    });
  });

  it('should generate an error if the name has less than 3 chars', () => {
    const { error } = validateItem({
      name: 'ra',
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/name.*3.*/i);
  });

  it('should generate an error if the name has more than 40 chars', () => {
    const { error } = validateItem({
      name: lorem.sentence(20),
    });

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/name.*40.*/i);
  });
  it('should generate an error if category is a string that cannot be converted to json', () => {
    const { error } = validateItem({
      name: name.firstName(),
      category: 'name=12',
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/category/i);
  });
  it('should generate an error if category._id is not a valid ObjectId', () => {
    const { error } = validateItem({
      name: name.firstName(),
      category: {
        id: '5555',
        name: name.firstName(),
      },
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/category\.id/);
  });
  it('should generate an error if category.name is falsy', () => {
    FALSY_VALUES.forEach((value) => {
      const { error } = validateItem({
        name: name.firstName(),
        category: {
          name: value,
        },
      });
      expect(error).toBeTruthy();
      expect(error.message).toMatch(/category\.name/);
    });
  });
  it('should generate an error if category.name has less than 3 chars', () => {
    const { error } = validateItem({
      name: name.firstName(),
      category: {
        name: 'Te',
      },
    });

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/category\.name.*3.*/);
  });
  it('should generate an error if category.name has more than 120 chars', () => {
    const { error } = validateItem({
      name: name.firstName(),
      category: {
        name: lorem.words(60),
      },
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/category\.name.*120/);
  });
  it('should not generate an error if name is truthy, category object is valid and user is valid', () => {
    const payload = {
      name: name.firstName(),
      category: {
        name: name.firstName(),
      },
    };
    const { error, value } = validateItem(payload);
    expect(error).toBeFalsy();
    expect(value).toEqual(payload);
  });
  it('should not generate an error if the category is a string that can be converted to JSON', () => {
    const payload = {
      name: name.firstName(),
      category: '{"name": "Fruit"}',
    };
    const { error, value } = validateItem(payload);
    expect(error).toBeFalsy();
    expect(value).toEqual(payload);
  });
});
