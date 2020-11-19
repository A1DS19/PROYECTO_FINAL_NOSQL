const express = require('express');
const { Product } = require('../../models/Product');
const router = express.Router();

router.get('/id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      res.status(400).json({ error: 'Ese producto no existe' });
    }

    res.json({ product });
  } catch (error) {
    res.status(400).json({ error: 'Ese producto no existe' });
  }
});

router.get('/title/:title', async (req, res) => {
  try {
    const title = req.params.title;
    //$options: 'i' es case insensitive
    const product = await Product.findOne({ title: { $regex: title, $options: 'i' } });

    if (!product) {
      res.status(400).json({ error: 'Ese producto no existe' });
    }

    res.json({ product });
  } catch (error) {
    res.status(400).json({ error: 'Ha ocurrido un error' });
  }
});

module.exports = router;
