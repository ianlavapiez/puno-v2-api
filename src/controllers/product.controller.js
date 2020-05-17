const Product = require('../models/product.model')

const factory = require('../utils/handler-factory')

exports.getAllProducts = factory.getAll(Product)
exports.getProduct = factory.getOne(Product, { path: 'users' })
exports.createProduct = factory.createOne(Product)
exports.updateProduct = factory.updateOne(Product)
exports.deleteProduct = factory.deleteOne(Product)
