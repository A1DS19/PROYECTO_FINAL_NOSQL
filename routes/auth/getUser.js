const express = require('express');
const { User } = require('../../models/User');
const router = express.Router();

router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    res.status(401).json({ error: 'El usuario no existe' });
  }

  res.json(user);
});

module.exports = router;
