const mongoose = require('mongoose');

module.exports = function (request, response, next) {
  if (!mongoose.isValidObjectId(request.params.id)) {
    return response.status(404).send({ message: 'Invalid Id' });
  }
  next();
};
