const MensajeService = require('../services/MensajeService');
const { exito, error } = require('../utils/response');

const mensajesGET = async (req, res, next) => {
  try {
    const resultado = await MensajeService.mensajesGET(req.usuario.id_usuario);
    return exito(res, resultado.data, 'Conversaciones obtenidas exitosamente');
  } catch (e) { next(e); }
};

const mensajesNoLeidosGET = async (req, res, next) => {
  try {
    const resultado = await MensajeService.mensajesNoLeidosGET(req.usuario.id_usuario);
    return exito(res, resultado.data, 'Conteo obtenido exitosamente');
  } catch (e) { next(e); }
};

const mensajesIdGET = async (req, res, next) => {
  try {
    const resultado = await MensajeService.mensajesIdGET(req.params.id, req.usuario.id_usuario);
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, resultado.data, 'Conversación obtenida exitosamente');
  } catch (e) { next(e); }
};

const mensajesIdLeidoPATCH = async (req, res, next) => {
  try {
    const resultado = await MensajeService.mensajesIdLeidoPATCH(req.params.id, req.usuario.id_usuario);
    return exito(res, {}, resultado.message);
  } catch (e) { next(e); }
};

const mensajesPOST = async (req, res, next) => {
  try {
    const resultado = await MensajeService.mensajesPOST(req.usuario.id_usuario, req.body);
    if (!resultado.success) return error(res, resultado.message, 400);
    return exito(res, resultado.data, resultado.message, 201);
  } catch (e) { next(e); }
};

const mensajesIdResponderPOST = async (req, res, next) => {
  try {
    const resultado = await MensajeService.mensajesIdResponderPOST(req.params.id, req.usuario.id_usuario, req.body);
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, resultado.data, 'Respuesta enviada', 201);
  } catch (e) { next(e); }
};

module.exports = {
  mensajesGET,
  mensajesNoLeidosGET,
  mensajesIdGET,
  mensajesIdLeidoPATCH,
  mensajesPOST,
  mensajesIdResponderPOST
};