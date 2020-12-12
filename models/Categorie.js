const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorieSchema = new Schema({
  name: {
    type: String,
  },
});

module.exports = { CategorieSchema };
