/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Actualizar mis competencias técnicas
*
* talentosCompetenciasPutRequest TalentosCompetenciasPutRequest 
* returns SuccessResponse
* */
const talentosCompetenciasPUT = ({ talentosCompetenciasPutRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        talentosCompetenciasPutRequest,
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
* Eliminar antecedente educacional
*
* idUnderscoreeducacion UUID 
* returns SuccessResponse
* */
const talentosEducacionIdEducacionDELETE = ({ idUnderscoreeducacion }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscoreeducacion,
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
* Actualizar antecedente educacional
*
* idUnderscoreeducacion UUID 
* talentosEducacionIdEducacionPutRequest TalentosEducacionIdEducacionPutRequest 
* returns SuccessResponse
* */
const talentosEducacionIdEducacionPUT = ({ idUnderscoreeducacion, talentosEducacionIdEducacionPutRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscoreeducacion,
        talentosEducacionIdEducacionPutRequest,
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
* Agregar antecedente educacional
*
* talentosEducacionPostRequest TalentosEducacionPostRequest 
* returns SuccessResponse
* */
const talentosEducacionPOST = ({ talentosEducacionPostRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        talentosEducacionPostRequest,
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
* Actualizar mis idiomas
*
* talentosIdiomasPutRequest TalentosIdiomasPutRequest 
* returns SuccessResponse
* */
const talentosIdiomasPUT = ({ talentosIdiomasPutRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        talentosIdiomasPutRequest,
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
* Eliminar experiencia laboral
*
* idUnderscorelaboral UUID 
* returns SuccessResponse
* */
const talentosLaboralIdLaboralDELETE = ({ idUnderscorelaboral }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscorelaboral,
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
* Actualizar experiencia laboral
*
* idUnderscorelaboral UUID 
* talentosLaboralIdLaboralPutRequest TalentosLaboralIdLaboralPutRequest 
* returns SuccessResponse
* */
const talentosLaboralIdLaboralPUT = ({ idUnderscorelaboral, talentosLaboralIdLaboralPutRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscorelaboral,
        talentosLaboralIdLaboralPutRequest,
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
* Agregar experiencia laboral
*
* talentosLaboralPostRequest TalentosLaboralPostRequest 
* returns SuccessResponse
* */
const talentosLaboralPOST = ({ talentosLaboralPostRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        talentosLaboralPostRequest,
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
* Ver mi perfil completa
*
* returns SuccessResponse
* */
const talentosPerfilGET = () => new Promise(
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
* Actualizar mi perfil
*
* talentosPerfilPutRequest TalentosPerfilPutRequest 
* returns SuccessResponse
* */
const talentosPerfilPUT = ({ talentosPerfilPutRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        talentosPerfilPutRequest,
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
  talentosCompetenciasPUT,
  talentosEducacionIdEducacionDELETE,
  talentosEducacionIdEducacionPUT,
  talentosEducacionPOST,
  talentosIdiomasPUT,
  talentosLaboralIdLaboralDELETE,
  talentosLaboralIdLaboralPUT,
  talentosLaboralPOST,
  talentosPerfilGET,
  talentosPerfilPUT,
};
