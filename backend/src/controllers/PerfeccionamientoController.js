const PerfeccionamientoService = require('../services/PerfeccionamientoService');
const { exito, error } = require('../utils/response');

const perfeccionamientoGET = async (req, res, next) => {
  try {
    const resultado = await PerfeccionamientoService.perfeccionamientoGET(req.usuario.id_usuario);
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, resultado.data, 'Cursos obtenidos exitosamente');
  } catch (e) { next(e); }
};

const perfeccionamientoPOST = async (req, res, next) => {
  try {
    const resultado = await PerfeccionamientoService.perfeccionamientoPOST(req.usuario.id_usuario, req.body);
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, {}, resultado.message, 201);
  } catch (e) { next(e); }
};

const perfeccionamientoIdPUT = async (req, res, next) => {
  try {
    const resultado = await PerfeccionamientoService.perfeccionamientoIdPUT(
      req.usuario.id_usuario,
      req.params.id_perfeccionamiento,
      req.body
    );
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, {}, resultado.message);
  } catch (e) { next(e); }
};

const perfeccionamientoIdDELETE = async (req, res, next) => {
  try {
    const resultado = await PerfeccionamientoService.perfeccionamientoIdDELETE(
      req.usuario.id_usuario,
      req.params.id_perfeccionamiento
    );
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, {}, resultado.message);
  } catch (e) { next(e); }
};

module.exports = {
  perfeccionamientoGET,
  perfeccionamientoPOST,
  perfeccionamientoIdPUT,
  perfeccionamientoIdDELETE
};