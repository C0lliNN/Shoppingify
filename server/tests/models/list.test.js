/* eslint-disable no-undef */
const { validateList } = require('../../models/list');
const { FALSY_VALUES } = require('../../utility');
const { lorem } = require('faker');

describe('validateList', () => {
  it('should generate an error if name is falsy', () => {
    FALSY_VALUES.forEach((value) => {
      const { error } = validateList({ name: value });
      expect(error).toBeTruthy();
      expect(error.message).toMatch(/name/);
    });
  });
  it('should generate an error if name has less than 3 chars', () => {
    const { error } = validateList({
      name: 'Ra',
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/name.*3.*/i);
  });
  it('should generate an error if name has more than 100 chars', () => {
    const { error } = validateList({
      name: lorem.sentence(60),
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/name.*100.*/i);
  });
  it('should generate an error if itens is falsy', () => {
    FALSY_VALUES.forEach((value) => {
      const { error } = validateList({ name: lorem.words(3), itens: value });
      expect(error).toBeTruthy();
      expect(error.message).toMatch(/itens/);
    });
  });
  it('should generate an error if itens is not an array', () => {
    const { error } = validateList({
      name: 'Monthly Shopping List',
      itens: 25,
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*array.*/);
  });
  it('should generate an error if itens has no items', () => {
    const { error } = validateList({
      name: 'Monthly Shopping List',
      itens: [],
      status: 'active',
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*1.*/);
  });
  it('should generate an error it one item has falsy _id', () => {
    FALSY_VALUES.forEach((value) => {
      const { error } = validateList({
        name: 'Monthly Shopping List',
        itens: [
          {
            _id: value,
          },
        ],
      });
      expect(error).toBeTruthy();
      expect(error.message).toMatch(/itens.*_id.*/);
    });
  });
  it('should generate an error it one item has invalid _id', () => {
    const { error } = validateList({
      name: 'Monthly Shopping List',
      itens: [
        {
          _id: '124',
        },
      ],
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*_id.*/);
  });
  it('should generate an error it one item has falsy name', () => {
    FALSY_VALUES.forEach((value) => {
      const { error } = validateList({
        name: 'Monthly Shopping List',
        itens: [
          {
            _id: '5f455552f75a6016403b9971',
            name: value,
          },
        ],
      });
      expect(error).toBeTruthy();
      expect(error.message).toMatch(/itens.*name.*/);
    });
  });
  it('should generate an error if one item has name.length < 3', () => {
    const { error } = validateList({
      name: 'Banana',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: 'Ra',
        },
      ],
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*name.*3.*/i);
  });
  it('should generate an error if one time has name.length > 40', () => {
    const { error } = validateList({
      name: 'Banana',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: lorem.sentence(20),
        },
      ],
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*name.*40.*/i);
  });
  it('should generate an error if one item has falsy category', () => {
    FALSY_VALUES.forEach((value) => {
      const { error } = validateList({
        name: 'Banana',
        itens: [
          {
            _id: '5f455552f75a6016403b9971',
            name: 'Fruit',
            category: value,
          },
        ],
      });
      expect(error).toBeTruthy();
      expect(error.message).toMatch(/itens.*category/i);
    });
  });
  it('should generate an error if one item has falsy category._id', () => {
    FALSY_VALUES.forEach((value) => {
      const { error } = validateList({
        name: 'Banana',
        itens: [
          {
            _id: '5f455552f75a6016403b9971',
            name: 'Fruit',
            category: {
              _id: value,
            },
          },
        ],
      });
      expect(error).toBeTruthy();
      expect(error.message).toMatch(/itens.*category.*_id/i);
    });
  });
  it('should generate an error if one item has invalid category._id', () => {
    const { error } = validateList({
      name: 'Banana',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: 'Fruit',
          category: {
            _id: '11231',
          },
        },
      ],
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*category.*_id/i);
  });
  it('should generate an error if one item has falsy category.name', () => {
    FALSY_VALUES.forEach((value) => {
      const { error } = validateList({
        name: 'Banana',
        itens: [
          {
            _id: '5f455552f75a6016403b9971',
            name: 'Fruit',
            category: {
              _id: '5f455552f75a6016403b9971',
              name: value,
            },
          },
        ],
      });
      expect(error).toBeTruthy();
      expect(error.message).toMatch(/itens.*category/i);
    });
  });
  it('should generate an error if one item has category.name.length < 3', () => {
    const { error } = validateList({
      name: 'Banana',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: 'Fruit',
          category: {
            _id: '5f455552f75a6016403b9971',
            name: 'Ra',
          },
        },
      ],
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*category.*3/i);
  });
  it('should generate an error if one item has category.name.length < 3', () => {
    const { error } = validateList({
      name: 'Banana',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: 'Fruit',
          category: {
            _id: '5f455552f75a6016403b9971',
            name: lorem.sentence(60),
          },
        },
      ],
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*category.*120/i);
  });
  it('should generate an error it one item has no quantity', () => {
    const { error } = validateList({
      name: 'Monthly Shopping List',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: 'Banana',
          quantity: null,
          category: {
            _id: '5f455552f75a6016403b9971',
            name: 'Fruit',
          },
        },
      ],
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*quantity.*/);
  });
  it('should generate an error if one item has a quantity < 1', () => {
    const { error } = validateList({
      name: 'Monthly Shopping List',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: 'Banana',
          quantity: 0,
          category: {
            _id: '5f455552f75a6016403b9971',
            name: 'Fruit',
          },
        },
      ],
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/itens.*quantity.*1.*/);
  });
  it('should generate an error if list status is falsy', () => {
    FALSY_VALUES.forEach((value) => {
      const { error } = validateList({
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
        status: value,
      });
      expect(error).toBeTruthy();
      expect(error.message).toMatch(/status/);
    });
  });
  it('should generate an error if list status is not valid', () => {
    const { error } = validateList({
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
      status: 'PAUSED',
    });
    expect(error).toBeTruthy();
    expect(error.message).toMatch(/status/);
  });
  it('should not generate an error if name, itens, and status are defined correctly', () => {
    const { error } = validateList({
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
    });
    expect(error).toBeFalsy();
  });
});
