module.exports = (attr) => {
  return (request, response, next) => {
    const model = request[attr];

    if (model && model.user != request.user._id) {
      return response
        .status(403)
        .send({ message: 'You cannot access this resource' });
    }
    next();
  };
};
