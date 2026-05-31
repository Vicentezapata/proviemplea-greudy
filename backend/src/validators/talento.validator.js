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

const validarPerfilTalento = [
  body('jornada_deseada')
    .optional()
    .isIn(['completa', 'parcial', 'por_turnos'])
    .withMessage('Jornada debe ser: completa, parcial o por_turnos'),
  body('modalidad_deseada')
    .optional()
    .isIn(['presencial', 'remoto', 'hibrido'])
    .withMessage('Modalidad debe ser: presencial, remoto o hibrido'),
  body('id_rango_renta')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Rango de renta debe ser un número válido'),
  body('discapacidad_ley21015')
    .optional()
    .isBoolean()
    .withMessage('Discapacidad debe ser true o false'),
  validar
];

const validarEducacion = [
  body('nivel_educacional')
    .notEmpty().withMessage('El nivel educacional es obligatorio')
    .isIn([
      'Sin estudios', 'Básica completa', 'Media incompleta',
      'Media completa', 'Técnico nivel medio', 'Técnico nivel superior',
      'Universitario incompleto', 'Universitario completo',
      'Postgrado', 'Magíster', 'Doctorado'
    ]).withMessage('Nivel educacional no válido'),
  body('carrera')
    .optional()
    .isLength({ max: 150 })
    .withMessage('Carrera no puede superar 150 caracteres'),
  body('institucion')
    .optional()
    .isLength({ max: 150 })
    .withMessage('Institución no puede superar 150 caracteres'),
  validar
];

const validarLaboral = [
  body('empresa')
    .notEmpty().withMessage('La empresa es obligatoria')
    .isLength({ max: 150 }).withMessage('Empresa no puede superar 150 caracteres'),
  body('cargo')
    .notEmpty().withMessage('El cargo es obligatorio')
    .isLength({ max: 100 }).withMessage('Cargo no puede superar 100 caracteres'),
  body('fecha_inicio')
    .optional()
    .isDate().withMessage('Fecha de inicio debe tener formato YYYY-MM-DD'),
  body('fecha_fin')
    .optional()
    .isDate().withMessage('Fecha de fin debe tener formato YYYY-MM-DD'),
  validar
];

const validarCompetencias = [
  body('competencias')
    .isArray({ min: 1 }).withMessage('Competencias debe ser un arreglo con al menos un elemento')
    .custom(arr => arr.every(id => Number.isInteger(id) && id > 0))
    .withMessage('Cada competencia debe ser un número entero válido'),
  validar
];

const validarIdiomas = [
  body('idiomas')
    .isArray({ min: 1 }).withMessage('Idiomas debe ser un arreglo con al menos un elemento'),
  body('idiomas.*.id_idioma')
    .isInt({ min: 1 }).withMessage('id_idioma debe ser un número entero válido'),
  body('idiomas.*.nivel_dominio')
    .isIn(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Nativo'])
    .withMessage('Nivel de idioma debe ser: A1, A2, B1, B2, C1, C2 o Nativo'),
  validar
];

const validarIdUUID = [
  param('id_educacion')
    .optional()
    .isUUID().withMessage('ID de educación no es un UUID válido'),
  param('id_laboral')
    .optional()
    .isUUID().withMessage('ID laboral no es un UUID válido'),
  validar
];

module.exports = {
  validarPerfilTalento,
  validarEducacion,
  validarLaboral,
  validarCompetencias,
  validarIdiomas,
  validarIdUUID
};