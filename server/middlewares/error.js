const logger = require('../startup/logger');

// eslint-disable-next-line no-unused-vars
module.exports = function (error, request, response, next) {
  response.status(500).send({
    message: 'Something went Wrong!',
  });

  logger.error(error.message, error);
};
