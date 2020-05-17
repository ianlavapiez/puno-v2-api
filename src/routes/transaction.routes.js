const express = require('express')

const {
  getAllTransaction,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  checkTotalPriceAndPayment,
} = require('../controllers/transaction.controller')
const { protect, restrictTo } = require('../controllers/auth.controller')

const router = express.Router()

router
  .route('/')
  .get(getAllTransaction)
  .post(protect, restrictTo('farmer', 'customer'), createTransaction)
router
  .route('/:id')
  .get(getTransaction)
  .patch(protect, restrictTo('farmer', 'customer'), checkTotalPriceAndPayment, updateTransaction)
  .delete(protect, restrictTo('farmer', 'customer'), deleteTransaction)

module.exports = router
