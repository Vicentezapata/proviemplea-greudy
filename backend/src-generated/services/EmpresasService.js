/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Ver perfil de mi empresa
*
* returns SuccessResponse
* */
const empresasPerfilGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Actualizar perfil de empresa
*
* empresasPerfilPutRequest EmpresasPerfilPutRequest 
* returns SuccessResponse
* */
const empresasPerfilPUT = ({ empresasPerfilPutRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        empresasPerfilPutRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Ver historial de solicitudes enviadas
*
* returns PaginatedResponse
* */
const empresasSolicitudesGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Ver usuarios de mi empresa
*
* returns SuccessResponse
* */
const empresasUsuariosGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Eliminar usuario de empresa
*
* idUnderscoreusuario UUID 
* returns SuccessResponse
* */
const empresasUsuariosIdUsuarioDELETE = ({ idUnderscoreusuario }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscoreusuario,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Crear usuario para la empresa
*
* empresasUsuariosPostRequest EmpresasUsuariosPostRequest 
* returns SuccessResponse
* */
const empresasUsuariosPOST = ({ empresasUsuariosPostRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        empresasUsuariosPostRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  empresasPerfilGET,
  empresasPerfilPUT,
  empresasSolicitudesGET,
  empresasUsuariosGET,
  empresasUsuariosIdUsuarioDELETE,
  empresasUsuariosPOST,
};
