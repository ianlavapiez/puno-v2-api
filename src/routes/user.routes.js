const express = require('express')

const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
} = require('../controllers/auth.controller')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forgot-password', forgotPassword)
router.patch('/reset-password/:token', resetPassword)

router.use(protect)

router.patch('/update-password', updatePassword)

module.exports = router
