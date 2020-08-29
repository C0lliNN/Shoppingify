/* eslint-disable no-undef */
const { validateList } = require('../../../models/list');
const { FALSY_VALUES } = require('../../../utility');
const { lorem } = require('faker');

let payload;

function exec() {
  return validateList(payload);
}

beforeEach(() => {
  payload = {
    name: 'Monthly Shopping List',
    itens: [
      {
        _id: '5f455552f75a6016403b9971',
        name: 'Banana',
        quantity: 2,
        category: {
          _id: '5f455552f75a6016403b9971',
          name: 'Fruit',
        },
      },
    ],
    status: 'active',
  };
});

describe('validateList', () => {
  it('should generate an error if name is falsy', () => {
    FALSY_VALUES.forEach((value) => {
      payload.name = value;

      const { error } = exec();

      expect(error).toBeTruthy();
      expect(error.message).toMatch(/name/);
    });
  });
  it('should generate an error if name has less than 3 chars', () => {
    payload.name = 'Ra';

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/name.*3.*/i);
  });
  it('should generate an error if name has more than 100 chars', () => {
    payload.name = lorem.sentence(60);

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/name.*100.*/i);
  });
  it('should generate an error if itens is falsy', () => {
    FALSY_VALUES.forEach((value) => {
      payload.itens = value;

      const { error } = exec();

      expect(error).toBeTruthy();
      expect(error.message).toMatch(/itens/);
    });
  });
  it('should generate an error if itens is not an array', () => {
    payload.itens = 25;

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*array.*/);
  });
  it('should generate an error if itens has no items', () => {
    payload.itens = [];

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*1.*/);
  });
  it('should generate an error it one item has falsy _id', () => {
    FALSY_VALUES.forEach((value) => {
      payload.itens[0]._id = value;

      const { error } = exec();

      expect(error).toBeTruthy();
      expect(error.message).toMatch(/itens.*_id.*/);
    });
  });
  it('should generate an error it one item has invalid _id', () => {
    payload.itens[0]._id = '124';

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*_id.*/);
  });
  it('should generate an error it one item has falsy name', () => {
    FALSY_VALUES.forEach((value) => {
      payload.itens[0].name = value;

      const { error } = exec();

      expect(error).toBeTruthy();
      expect(error.message).toMatch(/itens.*name.*/);
    });
  });
  it('should generate an error if one item has name.length < 3', () => {
    payload.itens[0].name = 'Ra';

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*name.*3.*/i);
  });
  it('should generate an error if one time has name.length > 40', () => {
    payload.itens[0].name = lorem.sentence(20);

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*name.*40.*/i);
  });
  it('should generate an error if one item has falsy category', () => {
    FALSY_VALUES.forEach((value) => {
      payload.itens[0].category = value;

      const { error } = exec();

      expect(error).toBeTruthy();
      expect(error.message).toMatch(/itens.*category/i);
    });
  });
  it('should generate an error if one item has falsy category._id', () => {
    FALSY_VALUES.forEach((value) => {
      payload.itens[0].category._id = value;

      const { error } = exec();

      expect(error).toBeTruthy();
      expect(error.message).toMatch(/itens.*category.*_id/i);
    });
  });
  it('should generate an error if one item has invalid category._id', () => {
    payload.itens[0].category._id = '12445';

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*category.*_id/i);
  });
  it('should generate an error if one item has falsy category.name', () => {
    FALSY_VALUES.forEach((value) => {
      payload.itens[0].category.name = value;

      const { error } = exec();

      expect(error).toBeTruthy();
      expect(error.message).toMatch(/itens.*category/i);
    });
  });
  it('should generate an error if one item has category.name.length < 3', () => {
    payload.itens[0].category.name = 'Ra';

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*category.*3/i);
  });
  it('should generate an error if one item has category.name.length > 120', () => {
    payload.itens[0].category.name = lorem.sentence(60);

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*category.*120/i);
  });
  it('should generate an error it one item has no quantity', () => {
    payload.itens[0].quantity = null;

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*quantity.*/);
  });
  it('should generate an error if one item has a quantity < 1', () => {
    payload.itens[0].quantity = 0;

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*quantity.*1.*/);
  });
  it('should generate an error if list status is falsy', () => {
    FALSY_VALUES.forEach((value) => {
      payload.status = value;

      const { error } = exec();

      expect(error).toBeTruthy();
      expect(error.message).toMatch(/status/);
    });
  });
  it('should generate an error if list status is not valid', () => {
    payload.status = 'PAUSED';

    const { error } = exec();

    expect(error).toBeTruthy();
    expect(error.message).toMatch(/status/);
  });
  it('should not generate an error if name, itens, and status are defined correctly', () => {
    const { error } = exec();

    expect(error).toBeFalsy();
  });
});
