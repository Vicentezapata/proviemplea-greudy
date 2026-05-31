const SolicitudService = require('../services/SolicitudService');
const { exito, error } = require('../utils/response');

const solicitudesPOST = async (req, res, next) => {
  try {
    const resultado = await SolicitudService.solicitudesPOST(req.usuario.id_usuario, req.body);
    if (!resultado.success) return error(res, resultado.message, 409);
    return exito(res, resultado.data, resultado.message, 201);
  } catch (e) {
    next(e);
  }
};

const solicitudesIdSolicitudGET = async (req, res, next) => {
  try {
    const resultado = await SolicitudService.solicitudesIdSolicitudGET(req.params.id_solicitud);
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, resultado.data, 'Solicitud obtenida exitosamente');
  } catch (e) {
    next(e);
  }
};

const solicitudesIdSolicitudEstadoPATCH = async (req, res, next) => {
  try {
    const resultado = await SolicitudService.solicitudesIdSolicitudEstadoPATCH(req.params.id_solicitud, req.body);
    return exito(res, {}, resultado.message);
  } catch (e) {
    next(e);
  }
};

const solicitudesIdSolicitudNotasPUT = async (req, res, next) => {
  try {
    const resultado = await SolicitudService.solicitudesIdSolicitudNotasPUT(req.params.id_solicitud, req.body);
    return exito(res, {}, resultado.message);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  solicitudesPOST,
  solicitudesIdSolicitudGET,
  solicitudesIdSolicitudEstadoPATCH,
  solicitudesIdSolicitudNotasPUT
};