const AdminService = require('../services/AdminService');

// Listar todos los usuarios del sistema
const adminUsuariosGET = async (req, res) => {
  try {
    const resultado = await AdminService.adminUsuariosGET(req.query);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Aprobar o rechazar cuenta de usuario
const adminUsuariosIdUsuarioValidarPATCH = async (req, res) => {
  try {
    const resultado = await AdminService.adminUsuariosIdUsuarioValidarPATCH(req.params.id_usuario, req.body);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Listar talentos con datos completos
const adminTalentosGET = async (req, res) => {
  try {
    const resultado = await AdminService.adminTalentosGET(req.query);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Marcar talento como contratado
const adminTalentosIdTalentoContratadoPATCH = async (req, res) => {
  try {
    const resultado = await AdminService.adminTalentosIdTalentoContratadoPATCH(req.params.id_talento, req.body);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Listar todas las empresas
const adminEmpresasGET = async (req, res) => {
  try {
    const resultado = await AdminService.adminEmpresasGET(req.query);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Ver todas las solicitudes del sistema
const adminSolicitudesGET = async (req, res) => {
  try {
    const resultado = await AdminService.adminSolicitudesGET(req.query);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Dashboard de estadísticas generales
const adminEstadisticasGET = async (req, res) => {
  try {
    const resultado = await AdminService.adminEstadisticasGET();
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = {
  adminUsuariosGET,
  adminUsuariosIdUsuarioValidarPATCH,
  adminTalentosGET,
  adminTalentosIdTalentoContratadoPATCH,
  adminEmpresasGET,
  adminSolicitudesGET,
  adminEstadisticasGET
};