require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (token) => {
  const validToken = jwt.decode(token, JWT_SECRET);
  return validToken;
};