const express = require('express');
const { User } = require('../../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.put(
  '/update/:id',
  [
    body('email').isEmail().withMessage('Debe incluir un email valido'),
    body('name').exists().withMessage('Debe incluir su nombre'),
    body('lastName').exists().withMessage('Debe incluir su apellido'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    const userId = req.params.id;
    const data = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: data },
      { runValidators: true }
    );
    //.populate('email', 'name', 'lastName');

    if (!user) {
      res.status(401).json({ error: 'No se pudo actualizar la informacion' });
    }

    res.json(user);
  }
);

module.exports = router;
