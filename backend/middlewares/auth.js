const jwt = require('jsonwebtoken');
const BadAuthError = require('../errors/bad_auth');
const { TOKEN_DEV } = require('../utils/const');
require('dotenv').config();

module.exports.auth = (req, res, next) => {
  const { token } = req.cookies;
  let payload;
  const { NODE_ENV = 'development', JWT_SECRET = 'some-secret-key' } = process.env;
  console.log(NODE_ENV);
  console.log(NODE_ENV === 'production');
  console.log(JWT_SECRET);
  console.log(TOKEN_DEV);
  console.log(`key taken: ${NODE_ENV === 'production' ? JWT_SECRET : TOKEN_DEV}`);
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : TOKEN_DEV);
  } catch (err) {
    next(new BadAuthError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
