const express = require('express');
const { Product } = require('../../models/Product');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post(
  '/',
  [
    body('imagePath').not().isEmpty().withMessage('Debe agregar url  de imagen'),
    body('title').not().isEmpty().withMessage('Debe agregar titulo  para el producto'),
    body('description')
      .not()
      .isEmpty()
      .withMessage('Debe agregar una descripccion para el producto'),
    body('price')
      .not()
      .isEmpty()
      .withMessage('Debe agregarle el precio para el producto')
      .isNumeric()
      .withMessage('El precio debe ser un numero obvio'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }
    const { imagePath, title, description, price } = req.body;
    const product = new Product({
      imagePath,
      title,
      description,
      price,
    });
    await product.save();
    res.status(201).json({ msg: 'Producto creado' });
  }
);

module.exports = router;
