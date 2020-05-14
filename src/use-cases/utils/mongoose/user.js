const mongoose = require('mongoose')

const typeString = (name) => {
  return {
    type: String,
    required: [true, `Please provide your ${name}.`],
  }
}

const userSchema = new mongoose.Schema({
  firstName: typeString('first name'),
  lastName: typeString('last name'),
  birthDate: {
    type: Date,
    required: [true, 'birth date'],
  },
  educationalBackground: typeString('educational background'),
  address: typeString('address'),
  farmAddress: String,
  organization: String,
  role: {
    type: String,
    required: [true, 'Please provide your role.'],
    enum: ['farmer', 'customer'],
  },
  email: typeString('email'),
  password: {
    type: String,
    required: [true, 'Please provide your password.'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      validator: function (element) {
        return element === this.password
      },
      message: 'Password must match.',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  modifiedAt: Date,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next()

  this.passwordChangedAt = Date.now() - 1000

  next()
})
