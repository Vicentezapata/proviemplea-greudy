const VitrinaService = require('../services/VitrinaService');
const { exito, error, paginado } = require('../utils/response');

const vitrinaGET = async (req, res, next) => {
  try {
    const resultado = await VitrinaService.vitrinaGET(req.query);
    return paginado(res, resultado.data, resultado.meta);
  } catch (e) {
    next(e);
  }
};

const vitrinaIdTalentoGET = async (req, res, next) => {
  try {
    const resultado = await VitrinaService.vitrinaIdTalentoGET(req.params.id_talento);
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, resultado.data, 'CV Ciego obtenido exitosamente');
  } catch (e) {
    next(e);
  }
};

module.exports = {
  vitrinaGET,
  vitrinaIdTalentoGET
};