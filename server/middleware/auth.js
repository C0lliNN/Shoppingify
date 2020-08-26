const jwt = require('jsonwebtoken');

function auth(request, response, next) {
  const token = request.header('X-Auth-Token');
  if (!token) {
    return response.status(400).send({ message: 'A token must be provided' });
  }
  const key = process.env.JWT_KEY;
  try {
    const validToken = jwt.verify(token, key);
    if (!validToken) {
      throw new Error('Invalid Token');
    }
  } catch (error) {
    return response.status(400).send({ message: 'Invalid Token' });
  }

  next();
}

module.exports = auth;
