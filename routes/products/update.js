const express = require('express');
const { Product } = require('../../models/Product');
const router = express.Router();

router.put('/id/:id', async (req, res) => {
  const newProductData = req.body;
  const id = req.params.id;

  const newProduct = await Product.findByIdAndUpdate(id, newProductData, { new: true });

  if (!newProduct) {
    res.status(400).json({ error: 'No se pudo realizar actualizacion de datos' });
  }

  await newProduct.save();

  res.json({ msg: 'Producto actualizado con exito', product: newProduct });
});

module.exports = router;
