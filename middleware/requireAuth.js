const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const auth_token_header = req.header('auth_token');
  if (!auth_token_header) return res.status(401).json({ errors: 'acceso denegado' });

  try {
    const verified = jwt.verify(auth_token_header, process.env.JWT_KEY);
    //agregar req.user = token
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ errors: 'token invalido' });
  }
};
