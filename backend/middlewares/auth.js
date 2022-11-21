const jwt = require('jsonwebtoken');
const BadAuthError = require('../errors/bad_auth');
const { TOKEN_DEV } = require('../utils/const');
require('dotenv').config();

module.exports.auth = (req, res, next) => {
  const { token } = req.cookies;
  let payload;
  const { NODE_ENV = 'development', JWT_SECRET = 'some-secret-key' } = process.env;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : TOKEN_DEV);
    console.log(NODE_ENV);
    console.log(JWT_SECRET);
    console.log(TOKEN_DEV);
  } catch (err) {
    next(new BadAuthError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
