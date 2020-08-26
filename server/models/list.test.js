/* eslint-disable no-undef */
const { validateList } = require('./list');

describe('validateList', () => {
  it('should generate an error if name is falsy', () => {
    let error = validateList({ name: '' }).error;
    expect(error).toBeTruthy();

    error = validateList({ name: null }).error;
    expect(error).toBeTruthy();

    error = validateList({}).error;
    expect(error).toBeTruthy();
  });
  it('should generate and error if itens is falsy', () => {
    let error = validateList({ name: 'Monthly Shopping List', itens: null })
      .error;
    expect(error).toBeTruthy();

    error = validateList({ name: 'Monthly Shopping List' }).error;
    expect(error).toBeTruthy();
  });
  it('should generate an error if itens is not an array', () => {
    const { error } = validateList({
      name: 'Monthly Shopping List',
      itens: 25,
    });
    expect(error).toBeTruthy();
  });
  it('should generate an error if itens has no items', () => {
    const { error } = validateList({
      name: 'Monthly Shopping List',
      itens: [],
    });
    expect(error).toBeTruthy();
  });
  it('should generate an error it one item has falsy _id', () => {
    const { error } = validateList({
      name: 'Monthly Shopping List',
      itens: [
        {
          _id: null,
        },
      ],
    });
    expect(error).toBeTruthy();
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
  });
  it('should generate an error it one item has falsy name', () => {
    const { error } = validateList({
      name: 'Monthly Shopping List',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: '',
        },
      ],
    });
    expect(error).toBeTruthy();
  });
  it('should generate an error it one item has no quantity', () => {
    const { error } = validateList({
      name: 'Monthly Shopping List',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: 'Banana',
          quantity: null,
        },
      ],
    });
    expect(error).toBeTruthy();
  });
  it('should generate an error it one item has a quantity < 1', () => {
    const { error } = validateList({
      name: 'Monthly Shopping List',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: 'Banana',
          quantity: 0,
        },
      ],
    });
    expect(error).toBeTruthy();
  });
  it('should generate an error if list status is falsy', () => {
    const { error } = validateList({
      name: 'Monthly Shopping List',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: 'Banana',
          quantity: 2,
        },
      ],
      status: undefined,
    });
    expect(error).toBeTruthy();
  });
  it('should generate an error if list status is not valid', () => {
    const { error } = validateList({
      name: 'Monthly Shopping List',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: 'Banana',
          quantity: 2,
        },
      ],
      status: 'PAUSED',
    });
    expect(error).toBeTruthy();
  });
  it('should generate an error if user is falsy', () => {
    const { error } = validateList({
      name: 'Monthly Shopping List',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: 'Banana',
          quantity: 2,
        },
      ],
      status: 'PAUSED',
      user: null,
    });
    expect(error).toBeTruthy();
  });
  it('should generate an error if user is not a valid objectId', () => {
    const { error } = validateList({
      name: 'Monthly Shopping List',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: 'Banana',
          quantity: 2,
        },
      ],
      status: 'PAUSED',
      user: '323423',
    });
    expect(error).toBeTruthy();
  });
  it('should not generate an error if name, itens, status and user are defined correctly', () => {
    const { error } = validateList({
      name: 'Monthly Shopping List',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: 'Banana',
          quantity: 2,
        },
      ],
      status: 'active',
      user: '5f455552f75a6016403b9971',
    });
    expect(error).toBeFalsy();
  });
});
