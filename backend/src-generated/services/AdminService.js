/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Listar todas las empresas
*
* returns PaginatedResponse
* */
const adminEmpresasGET = () => new Promise(
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
* Dashboard de estadísticas generales
*
* returns SuccessResponse
* */
const adminEstadisticasGET = () => new Promise(
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
* Ver todas las solicitudes del sistema
*
* idUnderscoreestado Integer  (optional)
* page Integer  (optional)
* returns PaginatedResponse
* */
const adminSolicitudesGET = ({ idUnderscoreestado, page }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscoreestado,
        page,
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
* Listar talentos con datos completos
*
* page Integer  (optional)
* limit Integer  (optional)
* returns PaginatedResponse
* */
const adminTalentosGET = ({ page, limit }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        page,
        limit,
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
* Marcar talento como contratado
* Oculta al talento de la vitrina una vez contratado
*
* idUnderscoretalento UUID 
* adminTalentosIdTalentoContratadoPatchRequest AdminTalentosIdTalentoContratadoPatchRequest 
* returns SuccessResponse
* */
const adminTalentosIdTalentoContratadoPATCH = ({ idUnderscoretalento, adminTalentosIdTalentoContratadoPatchRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscoretalento,
        adminTalentosIdTalentoContratadoPatchRequest,
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
* Listar todos los usuarios del sistema
*
* rol String  (optional)
* estadoUnderscorevalidacion String  (optional)
* page Integer  (optional)
* limit Integer  (optional)
* returns PaginatedResponse
* */
const adminUsuariosGET = ({ rol, estadoUnderscorevalidacion, page, limit }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        rol,
        estadoUnderscorevalidacion,
        page,
        limit,
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
* Aprobar o rechazar cuenta de usuario
*
* idUnderscoreusuario UUID 
* adminUsuariosIdUsuarioValidarPatchRequest AdminUsuariosIdUsuarioValidarPatchRequest 
* returns SuccessResponse
* */
const adminUsuariosIdUsuarioValidarPATCH = ({ idUnderscoreusuario, adminUsuariosIdUsuarioValidarPatchRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscoreusuario,
        adminUsuariosIdUsuarioValidarPatchRequest,
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
  adminEmpresasGET,
  adminEstadisticasGET,
  adminSolicitudesGET,
  adminTalentosGET,
  adminTalentosIdTalentoContratadoPATCH,
  adminUsuariosGET,
  adminUsuariosIdUsuarioValidarPATCH,
};
