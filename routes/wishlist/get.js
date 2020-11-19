const express = require('express');
const router = express.Router();
const { Wishlist } = require('../../models/Wishlist');

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  const existWishlist = await Wishlist.findOne({ user: userId });

  //Si wishlist no existe, se crea y se agrega un articulo
  if (!existWishlist) {
    return res.status(400).json({ error: 'Esta wishlist no existe' });
  }

  res.send({ data: existWishlist });
});

module.exports = router;
