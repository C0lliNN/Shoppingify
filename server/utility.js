const jwt = require('jsonwebtoken');

exports.FALSY_VALUES = [undefined, null, NaN, '', false, 0];
exports.getUserId = (token) => {
  const JWT_KEY = process.env.JWT_KEY;
  const userId = jwt.verify(token, JWT_KEY)._id;
  return userId;
};
exports.getTokenFromHeader = (header) => {
  return header.substring(7);
};
