/* eslint-disable no-undef */

const { validateItem } = require('./item');

const VALID_OBJECT_ID = '5f455552f75a6016403b9971';

describe('validateItem', () => {
  it('should generate an error if the name is falsy', () => {
    let error = validateItem({
      name: '',
      category: {
        name: 'Fruit',
      },
      user: VALID_OBJECT_ID,
    }).error;
    expect(error).toBeTruthy();

    error = validateItem({
      category: {
        name: 'Fruit',
      },
      user: VALID_OBJECT_ID,
    }).error;
    expect(error).toBeTruthy();
  });

  it('should generate an error if the name has less than 3 chars', () => {
    const { error } = validateItem({
      name: 'ra',
      category: {
        name: 'Fruit',
      },
      user: VALID_OBJECT_ID,
    });
    expect(error).toBeTruthy();
  });

  it('should generate an error if the name has more than 40 chars', () => {
    const { error } = validateItem({
      name:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, voluptate?',
      category: {
        name: 'fruit',
      },
      user: VALID_OBJECT_ID,
    });

    expect(error).toBeTruthy();
  });
  it('should generate an error if category is a string that cannot be converted to json', () => {
    const { error } = validateItem({
      name: 'Banana',
      category: 'name=12',
      user: VALID_OBJECT_ID,
    });
    expect(error).toBeTruthy();
  });
  it('should generate an error if category._id is not a valid ObjectId', () => {
    const { error } = validateItem({
      name: 'Banana',
      category: {
        id: 'RASDF#@$44',
        name: 'Fruit',
      },
      user: VALID_OBJECT_ID,
    });
    expect(error).toBeTruthy();
  });
  it('should generate an error if category.name is falsy', () => {
    const { error } = validateItem({
      name: 'Banana',
      category: {
        name: null,
      },
      user: VALID_OBJECT_ID,
    });

    expect(error).toBeTruthy();
  });
  it('should generate an error if category.name has less than 3 chars', () => {
    const { error } = validateItem({
      name: 'Banana',
      category: {
        name: 'Te',
      },
      user: VALID_OBJECT_ID,
    });

    expect(error).toBeTruthy();
  });
  it('should generate an error if user is falsy', () => {
    const { error } = validateItem({
      name: 'Banana',
      category: {
        name: 'Fruit',
      },
      user: '',
    });
    expect(error).toBeTruthy();
  });
  it('should generate an error if user is not a valid objectId', () => {
    const { error } = validateItem({
      name: 'Banana',
      category: {
        name: 'Fruit',
      },
      user: '11111111111111111',
    });
    expect(error).toBeTruthy();
  });
  it('should not generate an error if name is truthy, category object is valid and user is valid', () => {
    const { error } = validateItem({
      name: 'Banana',
      category: {
        name: 'Fruit',
      },
      user: VALID_OBJECT_ID,
    });
    expect(error).toBeFalsy();
  });
  it('should not generate an error if the category is a string that can be converted to JSON', () => {
    const { error } = validateItem({
      name: 'Banana',
      category: '{"name": "Fruit"}',
      user: VALID_OBJECT_ID,
    });
    expect(error).toBeFalsy();
  });
});
