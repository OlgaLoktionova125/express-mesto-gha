const jsonwebtoken = require('jsonwebtoken');
const AuthorisationError = require('../errors/AuthorisationError');

const auth = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    throw (new AuthorisationError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jsonwebtoken.verify(jwt, 'some-secret-key');
  } catch (err) {
    next(new AuthorisationError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
