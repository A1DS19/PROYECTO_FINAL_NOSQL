const mongoose = require('mongoose');
const { Schema } = mongoose;

const BrandSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = BrandSchema;
