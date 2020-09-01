const { validateItem } = require('../../../models/item');
const { FALSY_VALUES } = require('../../../utility');
const { lorem } = require('faker');

let payload;

beforeEach(() => {
  payload = {
    name: 'Name Test',
    note: 'This is a Test List',
    category: {
      _id: '507f1f77bcf86cd799439011',
      name: 'Name Test',
    },
  };
});

function exec() {
  return validateItem(payload);
}

describe('validateItem', () => {
  it('should generate an error if the name is falsy', () => {
    FALSY_VALUES.forEach((value) => {
      payload.name = value;

      const { error } = exec();

      expect(error).toBeTruthy();
      expect(error.message).toMatch(/name/i);
    });
  });

  it('should generate an error if the name has less than 3 chars', () => {
    payload.name = 'ra';

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/name.*3.*/i);
  });
  it('should generate an error if the name has more than 40 chars', () => {
    payload.name = lorem.sentence(20);

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/name.*40.*/i);
  });
  it('should generate an error if note has more than 255 chars', () => {
    payload.note = lorem.sentence(150);

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/note.*255.*/i);
  });
  it('should generate an error if category._id is not a valid ObjectId', () => {
    payload.category._id = '555';

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/category\._id/);
  });
  it('should generate an error if category.name is falsy', () => {
    FALSY_VALUES.forEach((value) => {
      payload.category.name = value;

      const { error } = exec();

      expect(error).toBeTruthy();
      expect(error.message).toMatch(/category\.name/);
    });
  });
  it('should generate an error if category.name has less than 3 chars', () => {
    payload.category.name = 'Te';

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/category\.name.*3.*/);
  });
  it('should generate an error if category.name has more than 120 chars', () => {
    payload.category.name = lorem.words(60);

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/category\.name.*120/);
  });
  it('should not generate an error if name is truthy, category object is valid and user is valid', () => {
    const { error, value } = exec();

    expect(error).toBeFalsy();
    expect(value).toEqual(payload);
  });
});
