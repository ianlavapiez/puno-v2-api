const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'A product must have a code.'],
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'A product must have a name'],
    },
    quantity: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Product must belong to a farmer.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

productSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: 'firstName lastName address' })

  next()
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
