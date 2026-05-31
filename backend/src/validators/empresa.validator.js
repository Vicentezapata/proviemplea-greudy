const { body, param } = require('express-validator');
const { validationResult } = require('express-validator');

const validar = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Datos inválidos',
      errors: errores.array().map(e => ({
        field: e.path,
        message: e.msg
      }))
    });
  }
  next();
};

const validarPerfilEmpresa = [
  body('nombre_empresa')
    .optional()
    .isLength({ min: 3, max: 255 })
    .withMessage('Nombre de empresa debe tener entre 3 y 255 caracteres'),
  body('id_rubro')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Rubro debe ser un número válido'),
  body('id_tipo_empresa')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Tipo de empresa debe ser un número válido'),
  validar
];

const validarUsuarioEmpresa = [
  body('correo')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('El correo no es válido'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener mínimo 8 caracteres'),
  body('nombre_completo')
    .notEmpty().withMessage('El nombre completo es obligatorio')
    .isLength({ min: 3, max: 255 }).withMessage('Nombre debe tener entre 3 y 255 caracteres'),
  body('telefono_contacto')
    .optional()
    .matches(/^\+?[0-9\s\-]{7,20}$/)
    .withMessage('Teléfono no tiene formato válido'),
  validar
];

const validarIdUsuario = [
  param('id_usuario')
    .isUUID().withMessage('ID de usuario no es un UUID válido'),
  validar
];

module.exports = {
  validarPerfilEmpresa,
  validarUsuarioEmpresa,
  validarIdUsuario
};