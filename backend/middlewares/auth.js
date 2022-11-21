const jwt = require('jsonwebtoken');
const BadAuthError = require('../errors/bad_auth');
require('dotenv').config();

module.exports.auth = (req, res, next) => {
  const { token } = req.cookies;
  let payload;
  const { NODE_ENV = 'development', JWT_SECRET = 'some-secret-key' } = process.env;
  console.log(NODE_ENV);
  console.log(JWT_SECRET);
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new BadAuthError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
