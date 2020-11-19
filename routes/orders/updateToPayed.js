const express = require('express');
const { Order } = require('../../models/Order');
const router = express.Router();

router.put('/:id/pay', async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.body_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: 'Esa orden no existe' });
  }
});

module.exports = router;
