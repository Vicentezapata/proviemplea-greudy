const SolicitudService = require('../services/SolicitudService');

// Solicitar contacto con un talento
const solicitudesPOST = async (req, res) => {
  try {
    const resultado = await SolicitudService.solicitudesPOST(req.usuario.id_usuario, req.body);
    const status = resultado.success ? 201 : 409;
    res.status(status).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Ver detalle de una solicitud
const solicitudesIdSolicitudGET = async (req, res) => {
  try {
    const resultado = await SolicitudService.solicitudesIdSolicitudGET(req.params.id_solicitud);
    const status = resultado.success ? 200 : 404;
    res.status(status).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Cambiar estado de solicitud
const solicitudesIdSolicitudEstadoPATCH = async (req, res) => {
  try {
    const resultado = await SolicitudService.solicitudesIdSolicitudEstadoPATCH(req.params.id_solicitud, req.body);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Actualizar notas internas
const solicitudesIdSolicitudNotasPUT = async (req, res) => {
  try {
    const resultado = await SolicitudService.solicitudesIdSolicitudNotasPUT(req.params.id_solicitud, req.body);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = {
  solicitudesPOST,
  solicitudesIdSolicitudGET,
  solicitudesIdSolicitudEstadoPATCH,
  solicitudesIdSolicitudNotasPUT
};