const TalentoService = require('../services/TalentoService');
const { exito, error } = require('../utils/response');

const talentosPerfilGET = async (req, res, next) => {
  try {
    const resultado = await TalentoService.talentosPerfilGET(req.usuario.id_usuario);
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, resultado.data, 'Perfil obtenido exitosamente');
  } catch (e) { next(e); }
};

const talentosPerfilPUT = async (req, res, next) => {
  try {
    const resultado = await TalentoService.talentosPerfilPUT(req.usuario.id_usuario, req.body);
    return exito(res, {}, resultado.message);
  } catch (e) { next(e); }
};

const talentosEducacionPOST = async (req, res, next) => {
  try {
    const resultado = await TalentoService.talentosEducacionPOST(req.usuario.id_usuario, req.body);
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, {}, resultado.message, 201);
  } catch (e) { next(e); }
};

const talentosEducacionIdEducacionPUT = async (req, res, next) => {
  try {
    const resultado = await TalentoService.talentosEducacionIdEducacionPUT(
      req.usuario.id_usuario,
      req.params.id_educacion,
      req.body
    );
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, {}, resultado.message);
  } catch (e) { next(e); }
};

const talentosEducacionIdEducacionDELETE = async (req, res, next) => {
  try {
    const resultado = await TalentoService.talentosEducacionIdEducacionDELETE(
      req.usuario.id_usuario,
      req.params.id_educacion
    );
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, {}, resultado.message);
  } catch (e) { next(e); }
};

const talentosLaboralPOST = async (req, res, next) => {
  try {
    const resultado = await TalentoService.talentosLaboralPOST(req.usuario.id_usuario, req.body);
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, {}, resultado.message, 201);
  } catch (e) { next(e); }
};

const talentosLaboralIdLaboralPUT = async (req, res, next) => {
  try {
    const resultado = await TalentoService.talentosLaboralIdLaboralPUT(
      req.usuario.id_usuario,
      req.params.id_laboral,
      req.body
    );
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, {}, resultado.message);
  } catch (e) { next(e); }
};

const talentosLaboralIdLaboralDELETE = async (req, res, next) => {
  try {
    const resultado = await TalentoService.talentosLaboralIdLaboralDELETE(
      req.usuario.id_usuario,
      req.params.id_laboral
    );
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, {}, resultado.message);
  } catch (e) { next(e); }
};

const talentosCompetenciasPUT = async (req, res, next) => {
  try {
    const resultado = await TalentoService.talentosCompetenciasPUT(req.usuario.id_usuario, req.body);
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, {}, resultado.message);
  } catch (e) { next(e); }
};

const talentosIdiomasPUT = async (req, res, next) => {
  try {
    const resultado = await TalentoService.talentosIdiomasPUT(req.usuario.id_usuario, req.body);
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, {}, resultado.message);
  } catch (e) { next(e); }
};

const talentosSolicitudesGET = async (req, res, next) => {
  try {
    const resultado = await TalentoService.talentosSolicitudesGET(req.usuario.id_usuario);
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, resultado.data, 'Solicitudes obtenidas exitosamente');
  } catch (e) { next(e); }
};

const talentosEstadisticasGET = async (req, res, next) => {
  try {
    const resultado = await TalentoService.talentosEstadisticasGET(req.usuario.id_usuario);
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, resultado.data, 'Estadisticas obtenidas exitosamente');
  } catch (e) { next(e); }
};

const talentosHistorialGET = async (req, res, next) => {
  try {
    const resultado = await TalentoService.talentosHistorialGET(req.usuario.id_usuario);
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, resultado.data, 'Historial obtenido exitosamente');
  } catch (e) { next(e); }
};

module.exports = {
  talentosPerfilGET,
  talentosPerfilPUT,
  talentosEducacionPOST,
  talentosEducacionIdEducacionPUT,
  talentosEducacionIdEducacionDELETE,
  talentosLaboralPOST,
  talentosLaboralIdLaboralPUT,
  talentosLaboralIdLaboralDELETE,
  talentosCompetenciasPUT,
  talentosIdiomasPUT,
  talentosSolicitudesGET,
  talentosEstadisticasGET,
  talentosHistorialGET
};