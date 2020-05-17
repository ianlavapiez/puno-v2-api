const express = require('express')

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller')
const { protect, restrictTo } = require('../controllers/auth.controller')

const router = express.Router()

router.route('/').get(getAllProducts).post(protect, restrictTo('farmer'), createProduct)
router
  .route('/:id')
  .get(getProduct)
  .patch(protect, restrictTo('farmer'), updateProduct)
  .delete(protect, restrictTo('farmer'), deleteProduct)

module.exports = router
