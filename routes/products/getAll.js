const express = require('express');
const { Product } = require('../../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(10);

  if (!products) {
    res.status(500).json({ error: 'Ha ocurrido un error, pruebe mas tarde' });
  }

  if (products === undefined || products.length === 0) {
    res.status(400).json({ error: 'No hay productos disponibles' });
  }
  res.json({ products });
});

module.exports = router;
