const crypto = require('crypto')

exports.sha256 = function (text) {
  return crypto.createHash('sha256').update(text, 'utf-8').digest('hex')
}
