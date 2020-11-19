const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ReviewSchema } = require('./Review.js');

const ProductSchema = new Schema(
  {
    imagePath: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    reviews: [ReviewSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
module.exports = { Product };
