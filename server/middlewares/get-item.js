const { Item } = require('../models/item');
const { isValidObjectId } = require('mongoose');

module.exports = async function getItem(request, response, next, id) {
  if (!isValidObjectId(id)) {
    return response.status(404).send({ message: 'Invalid Item ID' });
  }

  const item = await Item.findById(id);

  if (!item) {
    return response.status(404).send({ message: 'Item not Founded' });
  }

  request.item = item;
  next();
};
