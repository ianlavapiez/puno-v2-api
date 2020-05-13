const sanitizeHtml = require('sanitize-html')

exports.sanitize = function (text) {
  return sanitizeHtml(text, {
    allowedIframeHostnames: ['codesandbox.io', 'repl.it'],
  })
}
