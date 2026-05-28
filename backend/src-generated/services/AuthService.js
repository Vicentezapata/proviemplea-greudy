/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Login de usuario
* Autentica un usuario y devuelve un JWT válido por 24h
*
* authLoginPostRequest AuthLoginPostRequest 
* returns SuccessResponse
* */
const authLoginPOST = ({ authLoginPostRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        authLoginPostRequest,
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
* Registro de empresa
*
* authRegisterEmpresaPostRequest AuthRegisterEmpresaPostRequest 
* returns SuccessResponse
* */
const authRegisterEmpresaPOST = ({ authRegisterEmpresaPostRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        authRegisterEmpresaPostRequest,
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
* Registro de vecino/talento
* La cuenta queda en esta Pendiente hasta que un admin la valide
*
* authRegisterTalentoPostRequest AuthRegisterTalentoPostRequest 
* returns SuccessResponse
* */
const authRegisterTalentoPOST = ({ authRegisterTalentoPostRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        authRegisterTalentoPostRequest,
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
  authLoginPOST,
  authRegisterEmpresaPOST,
  authRegisterTalentoPOST,
};
