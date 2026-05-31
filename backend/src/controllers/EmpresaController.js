const EmpresaService = require('../services/EmpresaService');
const { exito, error } = require('../utils/response');

const empresasPerfilGET = async (req, res, next) => {
  try {
    const resultado = await EmpresaService.empresasPerfilGET(req.usuario.id_usuario);
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, resultado.data, 'Perfil obtenido exitosamente');
  } catch (e) {
    next(e);
  }
};

const empresasPerfilPUT = async (req, res, next) => {
  try {
    const resultado = await EmpresaService.empresasPerfilPUT(req.usuario.id_usuario, req.body);
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, {}, resultado.message);
  } catch (e) {
    next(e);
  }
};

const empresasUsuariosGET = async (req, res, next) => {
  try {
    const resultado = await EmpresaService.empresasUsuariosGET(req.usuario.id_usuario);
    return exito(res, resultado.data, 'Usuarios obtenidos exitosamente');
  } catch (e) {
    next(e);
  }
};

const empresasUsuariosPOST = async (req, res, next) => {
  try {
    const resultado = await EmpresaService.empresasUsuariosPOST(req.usuario.id_usuario, req.body);
    if (!resultado.success) return error(res, resultado.message, 409);
    return exito(res, {}, resultado.message, 201);
  } catch (e) {
    next(e);
  }
};

const empresasUsuariosIdUsuarioDELETE = async (req, res, next) => {
  try {
    const resultado = await EmpresaService.empresasUsuariosIdUsuarioDELETE(req.params.id_usuario);
    return exito(res, {}, resultado.message);
  } catch (e) {
    next(e);
  }
};

const empresasSolicitudesGET = async (req, res, next) => {
  try {
    const resultado = await EmpresaService.empresasSolicitudesGET(req.usuario.id_usuario);
    return exito(res, resultado.data, 'Solicitudes obtenidas exitosamente');
  } catch (e) {
    next(e);
  }
};

module.exports = {
  empresasPerfilGET,
  empresasPerfilPUT,
  empresasUsuariosGET,
  empresasUsuariosPOST,
  empresasUsuariosIdUsuarioDELETE,
  empresasSolicitudesGET
};