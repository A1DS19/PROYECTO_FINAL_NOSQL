const mongoose = require('mongoose');
const { Schema } = mongoose;

const WishlistSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    wishlistItems: [
      {
        title: { type: String },
        qty: { type: Number },
        imagePath: { type: String },
        price: { type: Number },
        countInStock: {
          type: Number,
        },
        status: {
          type: Boolean,
          default: false,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      },
    ],
  },
  { timestamps: true }
);

const Wishlist = mongoose.model('Wishlist', WishlistSchema);
module.exports = { Wishlist };
