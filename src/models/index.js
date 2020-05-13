const bcrypt = require('bcryptjs')

const { isValidIp } = require('./utils/ip-regex')
const { sha256 } = require('./utils/hash')
const { sanitize } = require('./utils/sanitize')
const { hashPassword } = require('./utils/bcrypt')
const { isValidEmail } = require('./utils/validator')

const buildMakeUser = require('./user')
const buildMakeSource = require('./source')

const makeSource = buildMakeSource({ isValidIp })
const makeUser = buildMakeUser({ sha256, sanitize, makeSource, isValidEmail, hashPassword })
