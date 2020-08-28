/* eslint-disable no-undef */

const request = require('supertest');
const { start, stop } = require('../../config/server');
const { initDatabase, dropDatabase } = require('../../config/database');
const bcrypt = require('bcrypt');
const { User } = require('../../models/User');
const { Item } = require('../../models/item');
const jwt = require('jsonwebtoken');
const { List } = require('../../models/list');

let app = null;
let userId = null;
let token = null;

beforeEach(async () => {
  app = await start();
  await initDatabase();
  const hashedPassword = await bcrypt.hash('1111111', 10);
  const user = await User.create({
    name: 'Raphael',
    email: 'test@test.com',
    password: hashedPassword,
  });
  userId = user._id;
  token = jwt.sign({ _id: userId }, process.env.JWT_KEY);
  await List.create(
    {
      name: 'September 2020 List',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: 'Banana',
          category: {
            _id: '5f455552f75a6016403b9971',
            name: 'Fruit',
          },
          quantity: 2,
        },
        {
          _id: '5f455552f75a6016403b9972',
          name: 'Apple',
          category: {
            _id: '5f455552f75a6016403b9971',
            name: 'Fruit',
          },
          quantity: 3,
        },
      ],
      status: 'canceled',
      user: userId,
    },
    {
      name: 'October 2020 List',
      itens: [
        {
          _id: '5f455552f75a6016403b9971',
          name: 'Banana',
          category: {
            _id: '5f455552f75a6016403b9971',
            name: 'Fruit',
          },
          quantity: 3,
        },
        {
          _id: '5f455552f75a6016403b9972',
          name: 'Apple',
          category: {
            _id: '5f455552f75a6016403b9971',
            name: 'Fruit',
          },
          quantity: 4,
        },
      ],
      status: 'active',
      user: userId,
    }
  );

  const user2 = await User.create({
    name: 'John',
    email: 'john@test.com',
    password: hashedPassword,
  });

  await List.create({
    name: 'October 2020 List',
    itens: [
      {
        _id: '5f455552f75a6016403b9971',
        name: 'Orange',
        category: {
          _id: '5f455552f75a6016403b9971',
          name: 'Fruit',
        },
        quantity: 3,
      },
    ],
    status: 'active',
    user: user2.id,
  });
});

afterEach(async () => {
  stop();
  await dropDatabase();
});

it('should fuck', () => {
  expect(true).toBe(true);
});
