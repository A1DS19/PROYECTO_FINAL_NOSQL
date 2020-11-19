const express = require('express');
const router = express.Router();
const { Wishlist } = require('../../models/Wishlist');

router.post('/add/:id', async (req, res) => {
  const userId = req.params.id;
  const { wishlistItem } = req.body;
  const existWishlist = await Wishlist.findOne({ user: userId });

  //Si wishlist no existe, se crea y se agrega un articulo
  if (!existWishlist) {
    const addwishlistItem = new Wishlist({
      user: userId,
      wishlistItems: wishlistItem,
    });
    if (!wishlistItem) {
      return res.status(401).json({ error: 'Hubo un error agregando a wishlist' });
    }
    const newWishlistItem = await addwishlistItem.save();
    return res.send({ newWishlistItem });
  }

  //Si wishlist ya existe,se siguen agregando articulos
  const newWishlistItem = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $push: { wishlistItems: wishlistItem } }
  );
  if (!newWishlistItem) {
    return res.status(401).json({ error: 'Hubo un error agregando a wishlist' });
  }
  res.send({ existWishlist });
});

module.exports = router;
