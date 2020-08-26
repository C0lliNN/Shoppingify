// eslint-disable-next-line no-unused-vars
module.exports = function (error, request, response, next) {
  response.status(500).send({
    message: 'Something went Wrong!',
  });

  //Log message
};
