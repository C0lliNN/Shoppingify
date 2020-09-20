const { List } = require('../models/list');
const { isValidObjectId } = require('mongoose');

module.exports = async function getList(request, response, next, id) {
  if (!isValidObjectId(id)) {
    return response.status(404).send({ message: 'Invalid List ID' });
  }

  const list = await List.findById(id);

  if (!list) {
    return response.status(404).send({ message: 'List not Founded' });
  }

  request.list = list;
  next();
};
