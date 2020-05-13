const bcrypt = require('bcryptjs')

exports.hashPassword = async function (password) {
  return await bcrypt.hash(password, 12)
}
