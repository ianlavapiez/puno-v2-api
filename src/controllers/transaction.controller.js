const Transaction = require('../models/transaction.model')

const factory = require('../utils/handler-factory')
const AppError = require('../utils/app-error')

exports.checkTotalPriceAndPayment = (req, res, next) => {
  if (req.body.totalPrice > req.body.payment) {
    return next(new AppError('Payment must be greater than the total price.', 422))
  }

  next()
}

exports.getAllTransaction = factory.getAll(Transaction)
exports.getTransaction = factory.getOne(Transaction)
exports.createTransaction = factory.createOne(Transaction)
exports.updateTransaction = factory.updateOne(Transaction)
exports.deleteTransaction = factory.deleteOne(Transaction)
