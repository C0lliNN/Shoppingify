/* eslint-disable require-atomic-updates */

module.exports = (Model) =>
  async function (request, response, next) {
    const id = request.params.id;
    const model = await Model.findById(id);

    if (!model) {
      return response.status(404).send({ message: 'resource not founded' });
    }

    if (model.user != request.user._id) {
      return response
        .status(403)
        .send({ message: 'You cannot access this resource' });
    }

    request.model = model;
    next();
  };
