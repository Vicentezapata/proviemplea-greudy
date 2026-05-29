// El Middleware verifica el rol del usuario autenticado
const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    // id_rol: 1=admin, 2=talento, 3=empresa
    const roles = {
      1: 'admin',
      2: 'talento',
      3: 'empresa'
    };

    const rolUsuario = roles[req.usuario.id_rol];

    if (!rolesPermitidos.includes(rolUsuario)) {
      return res.status(403).json({
        success: false,
        message: 'Acceso denegado. No tienes permiso para este recurso.'
      });
    }

    next();
  };
};

module.exports = { verificarRol };