const express = require('express');
const { Order } = require('../../models/Order');
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const orderId = req.params.id;

    //Busca la ordern por y id y devuelve
    //la orden y el email del usuario
    //asociado a la misma
    const order = await Order.findById(orderId).populate('user', 'email');

    res.json(order);
  } catch (error) {
    res.status(400).json({ error: 'Esa orden no existe' });
  }
});

router.get('/myorders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: 'Usted no ha realizado ninguna orden' });
  }
});

module.exports = router;
