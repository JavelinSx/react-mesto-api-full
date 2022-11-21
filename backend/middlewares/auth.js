const jwt = require('jsonwebtoken');
const BadAuthError = require('../errors/bad_auth');
require('dotenv').config();

module.exports.auth = (req, res, next) => {
  const { token } = req.cookies;
  let payload;
  const { JWT_SECRET = 'some-secret-key' } = process.env;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new BadAuthError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
