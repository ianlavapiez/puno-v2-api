const mongoose = require('mongoose')

const AppError = require('../utils/app-error')

const refSchema = (ref, message) => {
  return {
    type: mongoose.Schema.ObjectId,
    ref,
    required: [true, message],
  }
}

const numberSchema = (message) => {
  return {
    type: Number,
    required: [true, message],
  }
}

const stringSchema = (array, defaultString) => {
  return {
    type: String,
    enum: array,
    default: defaultString,
  }
}

const transactionSchema = new mongoose.Schema({
  customer: refSchema('User', 'A transaction must have a customer ID'),
  farmer: refSchema('User', 'A transaction must have a farmer ID'),
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Products',
    },
  ],
  payment: numberSchema('A transaction must have a payment.'),
  totalPrice: numberSchema('A transaction must have a total price.'),
  status: stringSchema(['pending', 'on-process', 'completed'], 'pending'),
  type: stringSchema(['cash', 'token'], 'cash'),
})

transactionSchema.pre('save', function (next) {
  if (this.totalPrice > this.payment) {
    return next(new AppError('Payment must be greater than the total price.', 422))
  }

  if (this.products.length <= 0) {
    return next(new AppError('A transaction must have a product list.', 422))
  }

  next()
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
