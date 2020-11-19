const express = require('express');
const { Product } = require('../../models/Product');
const router = express.Router();

router.delete('/id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.deleteOne({ _id: id });

    if (!result) {
      res.status(400).json({ error: 'No se pudo borrar producto' });
    }

    res.json({ msg: 'Producto eliminado con exito' });
  } catch (error) {
    res.status(400).json({ error: 'Hubo un error al intentar borrar producto' });
  }
});

module.exports = router;
