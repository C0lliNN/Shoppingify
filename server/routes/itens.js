const express = require('express');
const { Item, validateItem } = require('../models/item');
const router = express.Router();

router.get('/', async (request, response) => {
  const itens = await Item.find({ user: request.user._id }).sort(
    'category.name name'
  );
  response.send(itens);
});

router.post('/', async (request, response) => {
  const { value, error } = validateItem(request.body);

  if (error) {
    return response.status(400).send({ message: error.message });
  }

  const item = new Item(value);

  const userId = request.user._id;
  item.user = userId;

  const image = request.files ? request.files.image : null;

  if (image) {
    if (image.mimetype.includes('image') && image.size <= 5242880 /* 5MB */) {
      let imageName = null;

      if (process.env.NODE_ENV === 'production') {
        imageName = `${image.md5}.${image.name.split('.').pop()}`;
      } else {
        imageName = `img/${image.md5}.${image.name.split('.').pop()}`;
      }

      let destination = null;

      if (process.env.NODE_ENV === 'production') {
        destination = `client/build/${imageName}`;
      } else {
        destination = `client/public/${imageName}`;
      }

      await image.mv(destination);
      item.image = imageName;
    } else {
      return response.status('400').send({ message: 'Invalid Image' });
    }
  }

  await item.save();

  response.status(201).send(item);
});

module.exports = router;
