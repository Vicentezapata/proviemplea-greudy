const jwt = require('jsonwebtoken');

// Middleware que verifica el token JWT en cada request protegido
const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Token no enviado' });
  }

  // El token viene como "Bearer <token>"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token no válido' });
  }

  try {
    // Verifico y decodifico el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // guardo los datos del usuario en el request
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Token inválido o expirado' });
  }
};

module.exports = { verificarToken };