/* eslint-disable no-undef */

const request = require('supertest');
const { start, stop } = require('../../startup/server');
const { initDatabase, dropDatabase } = require('../../startup/database');
const bcrypt = require('bcrypt');
const { User } = require('../../models/User');
const { Item } = require('../../models/item');
const jwt = require('jsonwebtoken');
const Axios = require('axios');
const Fs = require('fs');
const Path = require('path');

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
  await Item.create(
    {
      name: 'Banana',
      category: {
        _id: '5f455552f75a6016403b9971',
        name: 'fruit',
        user: userId,
      },
      user: userId,
    },
    {
      name: 'Abacate',
      category: {
        _id: '5f455552f75a6016403b9971',
        name: 'fruit',
        user: userId,
      },
      user: userId,
    }
  );

  const user2 = await User.create({
    name: 'John',
    email: 'john@test.com',
    password: hashedPassword,
  });

  await Item.create({
    name: 'Orange',
    category: { _id: '5f455552f75a6016403b9971', name: 'fruit', user: userId },
    user: user2.id,
  });
});

afterEach(async () => {
  stop();
  await dropDatabase();
});

describe('GET /itens', () => {
  it('should send 200', async () => {
    await request(app)
      .get('/api/v1/itens')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
  it('should send an array with all itens register by the user', async () => {
    const { body } = await request(app)
      .get('/api/v1/itens')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBe(2);
  });
  it('should send an array of Item', async () => {
    const { body } = await request(app)
      .get('/api/v1/itens')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(body[0]._id).toBeTruthy();
    expect(body[0].category).toBeTruthy();
    expect(body[0].user).toBeTruthy();
  });
});

describe('POST /itens', () => {
  it('should send 400 and a message if the payload is invalid', async () => {
    const { body } = await request(app)
      .post('/api/v1/itens')
      .send({ name: 'Banana' })
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
    expect(typeof body).toBe('object');
    expect(body.message).toBeTruthy();
  });
  it('should send 201 and the item if the payload is valid - without image', async () => {
    const { body } = await request(app)
      .post('/api/v1/itens')
      .send({
        name: 'Apple',
        note: 'My First List',
        category: {
          _id: '5f455552f75a6016403b9971',
          name: 'fruit',
        },
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(201);
    expect(typeof body).toBe('object');
    expect(body._id).toBeTruthy();
    expect(body.name).toBeTruthy();
    expect(body.category).toBeTruthy();
  });
  it('should send 201 and the item if the payload is valid - with image', async () => {
    const response = await Axios({
      url: 'https://picsum.photos/200',
      method: 'GET',
      responseType: 'stream',
    });

    const path = Path.resolve(__dirname, '..', 'test.jpg');
    const writer = Fs.createWriteStream(path);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    const { body } = await request(app)
      .post('/api/v1/itens')
      .field('name', 'Apple')
      .field('note', 'My First List')
      .field('category', '{"name": "fruit"}')
      .attach('image', path)
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    expect(typeof body).toBe('object');
    expect(body._id).toBeTruthy();
    expect(body.name).toBeTruthy();
    expect(body.category).toBeTruthy();
    expect(body.image).toBeTruthy();

    await Fs.promises.unlink(path);
    await Fs.promises.unlink(
      Path.resolve(__dirname, '../../../client', 'public', body.image)
    );
  });
});
