const AdminService = require('../services/AdminService');
const { exito, error, paginado } = require('../utils/response');

const adminUsuariosGET = async (req, res, next) => {
  try {
    const resultado = await AdminService.adminUsuariosGET(req.query);
    return paginado(res, resultado.data, resultado.meta);
  } catch (e) {
    next(e);
  }
};

const adminUsuariosIdUsuarioValidarPATCH = async (req, res, next) => {
  try {
    const resultado = await AdminService.adminUsuariosIdUsuarioValidarPATCH(req.params.id_usuario, req.body);
    return exito(res, {}, resultado.message);
  } catch (e) {
    next(e);
  }
};

const adminTalentosGET = async (req, res, next) => {
  try {
    const resultado = await AdminService.adminTalentosGET(req.query);
    return paginado(res, resultado.data, resultado.meta);
  } catch (e) {
    next(e);
  }
};

const adminTalentosIdTalentoContratadoPATCH = async (req, res, next) => {
  try {
    const resultado = await AdminService.adminTalentosIdTalentoContratadoPATCH(req.params.id_talento, req.body);
    return exito(res, {}, resultado.message);
  } catch (e) {
    next(e);
  }
};

const adminEmpresasGET = async (req, res, next) => {
  try {
    const resultado = await AdminService.adminEmpresasGET(req.query);
    return paginado(res, resultado.data, resultado.meta);
  } catch (e) {
    next(e);
  }
};

const adminSolicitudesGET = async (req, res, next) => {
  try {
    const resultado = await AdminService.adminSolicitudesGET(req.query);
    return paginado(res, resultado.data, resultado.meta);
  } catch (e) {
    next(e);
  }
};

const adminEstadisticasGET = async (req, res, next) => {
  try {
    const resultado = await AdminService.adminEstadisticasGET();
    return exito(res, resultado.data, 'Estadísticas obtenidas exitosamente');
  } catch (e) {
    next(e);
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