const jwt = require('jsonwebtoken');

const FALSY_VALUES = [undefined, null, NaN, '', false, 0];

function getUserId(token) {
  //prettier-ignore
  if (!token.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/i)) {
    throw new Error('Invalid Token');
  }
  const JWT_KEY = process.env.JWT_KEY;
  const userId = jwt.verify(token, JWT_KEY)._id;
  return userId;
}

function getTokenFromHeader(header) {
  //prettier-ignore
  if (!header.match(/^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/i)) {
    throw new Error('Invalid Header');
  }
  return header.substring(7);
}

exports.FALSY_VALUES = FALSY_VALUES;
exports.getUserId = getUserId;
exports.getTokenFromHeader = getTokenFromHeader;
