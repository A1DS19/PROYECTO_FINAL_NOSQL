const express = require('express');
const { User } = require('../../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Debe incluir un email valido'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('La contrasena debe tener entre 6 a 20 caracteres'),
    body('name').exists().withMessage('Debe incluir su nombre'),
    body('lastName').exists().withMessage('Debe incluir su apellido'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    const { email, password, name, lastName } = req.body;
    const existingUser = await User.findOne({ email });

    //revisar si usuario ya existe
    if (existingUser) {
      return res.status(401).json({ errors: `El email ${email} ya existe` });
    }

    //hashear contrasena
    const hashedPassword = await bcrypt.hash(password, 8);

    //generar y guardar usuario nuevo
    const user = new User({
      email,
      password: hashedPassword,
      name,
      lastName,
    });
    await user.save();

    //generar jwt
    const userJWT = jwt.sign(
      {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
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
