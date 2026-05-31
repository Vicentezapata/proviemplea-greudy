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

const validarCrearSolicitud = [
  body('id_talento')
    .notEmpty().withMessage('El id_talento es obligatorio')
    .isUUID().withMessage('id_talento debe ser un UUID válido'),
  validar
];

const validarEstadoSolicitud = [
  param('id_solicitud')
    .isUUID().withMessage('id_solicitud no es un UUID válido'),
  body('id_estado')
    .notEmpty().withMessage('El id_estado es obligatorio')
    .isInt({ min: 1, max: 6 }).withMessage('id_estado debe ser un número entre 1 y 6'),
  validar
];

const validarNotasSolicitud = [
  param('id_solicitud')
    .isUUID().withMessage('id_solicitud no es un UUID válido'),
  body('notas_internas')
    .notEmpty().withMessage('Las notas internas son obligatorias')
    .isLength({ max: 1000 }).withMessage('Notas no pueden superar 1000 caracteres'),
  validar
];

const validarIdSolicitud = [
  param('id_solicitud')
    .isUUID().withMessage('id_solicitud no es un UUID válido'),
  validar
];

module.exports = {
  validarCrearSolicitud,
  validarEstadoSolicitud,
  validarNotasSolicitud,
  validarIdSolicitud
};