const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = { CategorySchema };
