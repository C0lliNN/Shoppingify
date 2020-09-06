const jwt = require('jsonwebtoken');

function auth(request, response, next) {
  const bearerHeader = request.header('Authorization');
  if (!bearerHeader) {
    response.setHeader('WWW-Authenticate', 'Bearer <token>');
    return response.status(401).send({ message: 'A token must be provided' });
  }
  //prettier-ignore
  if (!bearerHeader.match(/^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/i)) {
    response.setHeader('WWW-Authenticate', 'Bearer <token>');
    return response.status(400).send({ message: 'Invalid Token' });
  }

  const token = bearerHeader.substring(7);
  const key = process.env.JWT_KEY || 'TEST';
  try {
    const user = jwt.verify(token, key);
    request.user = user;
  } catch (error) {
    response.setHeader('WWW-Authenticate', 'Bearer <token>');
    return response.status(400).send({ message: 'Invalid Token' });
  }
  next();
}

module.exports = auth;
