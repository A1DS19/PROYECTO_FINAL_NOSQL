const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Wishlist } = require('../../models/Wishlist');

router.put('/:userid/:productid', async (req, res) => {
  const userId = req.params.userid;
  const productId = req.params.productid;

  //Busca un item en el wishlist y
  //lo remueve del array
  await Wishlist.findOneAndUpdate(
    { user: new mongoose.Types.ObjectId(userId) },
    { $pull: { wishlistItems: { _id: new mongoose.Types.ObjectId(productId) } } },
    { new: true },
    (err, node) => {
      if (err) {
        return res
          .status(400)
          .json({ error: 'No es posible remover item ya que no existe' });
      }
      return res.json(node);
    }
  );
});

module.exports = router;
