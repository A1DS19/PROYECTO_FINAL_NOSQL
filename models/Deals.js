const mongoose = require('mongoose');
const { Schema } = mongoose;

const DealSchema = new Schema(
  {
    products: [
      {
        title: { type: String },
        qty: { type: Number },
        imagePath: { type: String },
        price: { type: Number },
        discount: { type: Number },
        countInStock: {
          type: Number,
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

const Deal = mongoose.model('Deal', DealSchema);
module.exports = Deal;
