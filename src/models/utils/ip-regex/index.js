const ipRegex = require('ip-regex')

exports.isValidIp = function (ip) {
  return ipRegex({ exact: true }).test(ip)
}
