const { Schema, model } = require('mongoose');

const ShipperSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
});

const Shipper = model('Shipper', ShipperSchema);
module.exports = { Shipper };
