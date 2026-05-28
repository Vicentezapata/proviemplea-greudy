const EmpresaService = require('../services/EmpresaService');

// Ver perfil de mi empresa
const empresasPerfilGET = async (req, res) => {
  try {
    const resultado = await EmpresaService.empresasPerfilGET(req.usuario.id_usuario);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Actualizar perfil de empresa
const empresasPerfilPUT = async (req, res) => {
  try {
    const resultado = await EmpresaService.empresasPerfilPUT(req.usuario.id_usuario, req.body);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Ver usuarios de la empresa
const empresasUsuariosGET = async (req, res) => {
  try {
    const resultado = await EmpresaService.empresasUsuariosGET(req.usuario.id_usuario);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Crear usuario para la empresa
const empresasUsuariosPOST = async (req, res) => {
  try {
    const resultado = await EmpresaService.empresasUsuariosPOST(req.usuario.id_usuario, req.body);
    const status = resultado.success ? 201 : 409;
    res.status(status).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Eliminar usuario de empresa
const empresasUsuariosIdUsuarioDELETE = async (req, res) => {
  try {
    const resultado = await EmpresaService.empresasUsuariosIdUsuarioDELETE(req.params.id_usuario);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Ver solicitudes de la empresa
const empresasSolicitudesGET = async (req, res) => {
  try {
    const resultado = await EmpresaService.empresasSolicitudesGET(req.usuario.id_usuario);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
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