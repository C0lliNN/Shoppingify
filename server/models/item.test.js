/* eslint-disable no-undef */

const { validateItem } = require('./item');

describe('validateItem', () => {
  it('should generate an error if the name is falsy', () => {
    let error = validateItem({
      name: '',
      category: {
        name: 'Fruit',
      },
    }).error;
    expect(error).toBeTruthy();

    error = validateItem({
      category: {
        name: 'Fruit',
      },
    }).error;
    expect(error).toBeTruthy();
  });

  it('should generate an error if the name has less than 3 chars', () => {
    const { error } = validateItem({ name: 'ra', category: { name: 'Fruit' } });
    expect(error).toBeTruthy();
  });

  it('should generate an error if the name has more than 40 chars', () => {
    const { error } = validateItem({
      name:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, voluptate?',
      category: { name: 'fruit' },
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
    });
    expect(error).toBeTruthy();
  });
  it('should generate an error if category.name is falsy', () => {
    const { error } = validateItem({
      name: 'Banana',
      category: {
        name: null,
      },
    });

    expect(error).toBeTruthy();
  });
  it('should generate an error if category.name has less than 3 chars', () => {
    const { error } = validateItem({
      name: 'Banana',
      category: {
        name: 'Te',
      },
    });

    expect(error).toBeTruthy();
  });
  it('should not generate an error if name is truthy and category object is valid', () => {
    const { error } = validateItem({
      name: 'Banana',
      category: {
        name: 'Fruit',
      },
    });
    expect(error).toBeFalsy();
  });
});
