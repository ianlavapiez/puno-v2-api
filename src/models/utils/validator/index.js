const validator = require('validator')

exports.isValidEmail = function (email) {
  return validator.isEmail(email)
}
