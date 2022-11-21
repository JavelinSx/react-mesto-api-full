const jwt = require('jsonwebtoken');
const BadAuthError = require('../errors/bad_auth');
const { TOKEN_DEV } = require('../utils/const');

module.exports.auth = (req, res, next) => {
  const { token } = req.cookies;
  const { NODE_ENV = 'development', JWT_SECRET = TOKEN_DEV } = process.env;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : TOKEN_DEV);

    console.log(payload);
  } catch (err) {
    next(new BadAuthError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
