const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ReviewSchema } = require('./Review.js');
const { CategorieSchema } = require('./Categorie');

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
    discount: { type: Number },
    countInStock: {
      type: Number,
    },
    reviews: [ReviewSchema],
    category: { CategorieSchema },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
module.exports = { Product };
