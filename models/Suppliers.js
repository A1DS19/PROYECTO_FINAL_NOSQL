const { Schema, model } = require('mongoose');

const SupplierSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      cuantity: {
        type: Number,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      zipCode: {
        type: Number,
        required: true,
      },
      geoLat: {
        type: Number,
      },
      geoLong: {
        type: Number,
      },
    },
  ],
});

const Supplier = model('Supplier', SupplierSchema);
module.exports = { Supplier };
