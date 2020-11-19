const express = require('express');
const { Order } = require('../../models/Order');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
      shippingAddress,
      user,
    } = req.body;

    const order = new Order({
      orderItems,
      user,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
      shippingAddress,
    });

    const createdOrder = await order.save();
    res.status(201).json({ createdOrder });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Ocurrio un error' });
  }
});

module.exports = router;
