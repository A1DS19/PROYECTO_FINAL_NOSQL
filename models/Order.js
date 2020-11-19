const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    orderItems: [
      {
        title: { type: String },
        qty: { type: Number },
        imagePath: { type: String },
        price: { type: Number },
        countInStock: {
          type: Number,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,

          ref: 'Product',
        },
      },
    ],
    paymentMethod: {
      type: String,
    },
    shippingAddress: {
      address: { type: String },
      city: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    itemsPrice: {
      type: Number,
      default: 0.0,
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);
module.exports = { Order };
