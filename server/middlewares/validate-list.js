/* eslint-disable require-atomic-updates */
const { List } = require('../models/list');

module.exports = async function (request, response, next) {
  const id = request.params.id;
  const list = await List.findById(id);

  if (!list) {
    return response.status(404).send({ message: 'List not founded' });
  }

  if (list.user != request.user._id) {
    return response
      .status(403)
      .send({ message: 'You cannot access this resource' });
  }

  request.list = list;
  next();
};
