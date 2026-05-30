const { body, validationResult } = require('express-validator');

// Middleware que verifica si hay errores de validación
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

// Validaciones para login
const validarLogin = [
  body('correo')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('El correo no es válido'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener mínimo 8 caracteres'),
  validar
];

// Validaciones para registro de talento
const validarRegistroTalento = [
  body('correo')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('El correo no es válido'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener mínimo 8 caracteres')
    .matches(/[A-Z]/).withMessage('La contraseña debe tener al menos una mayúscula')
    .matches(/[0-9]/).withMessage('La contraseña debe tener al menos un número'),
  validar
];

// Validaciones para registro de empresa
const validarRegistroEmpresa = [
  body('correo')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('El correo no es válido'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener mínimo 8 caracteres'),
  body('rut_empresa')
    .notEmpty().withMessage('El RUT de la empresa es obligatorio'),
  body('nombre_empresa')
    .notEmpty().withMessage('El nombre de la empresa es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener mínimo 3 caracteres'),
  validar
];

module.exports = {
  validarLogin,
  validarRegistroTalento,
  validarRegistroEmpresa
};