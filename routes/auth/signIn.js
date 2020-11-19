const express = require('express');
const { User } = require('../../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Debe incluir un email valido'),
    body('password').trim().notEmpty().withMessage('Debe incluir una contrasena'),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ errors: `El email ${email} no existe` });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ errors: `Datos invalidos` });
    }

    const userJWT = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
      },
      process.env.JWT_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.header('auth_token', userJWT).send({ token: userJWT, user: user });
  }
);

module.exports = router;
