const validator = require('validator');
const ValidationError = require('../errors/ValidationError');

const isUrlValid = (url) => {
  if (!validator.isURL(url)) {
    throw new ValidationError('Cсылка не соответствует необходимому формату.');
  }
  return url;
};

module.exports = isUrlValid;
