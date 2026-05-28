/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Ver Vitrina de talentos con CV Ciego
* Devuelve talentos sin nombres, apellidos ni comuna. Solo accesible para empresa y admins.
*
* carrera String  (optional)
* nivelUnderscoreeducacional String  (optional)
* competencias String IDs separados por coma (optional)
* discapacidadUnderscoreley21015 Boolean  (optional)
* page Integer  (optional)
* limit Integer  (optional)
* returns PaginatedResponse
* */
const vitrinaGET = ({ carrera, nivelUnderscoreeducacional, competencias, discapacidadUnderscoreley21015, page, limit }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        carrera,
        nivelUnderscoreeducacional,
        competencias,
        discapacidadUnderscoreley21015,
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
* Ver CV Ciego de un talento específico
*
* idUnderscoretalento UUID 
* returns SuccessResponse
* */
const vitrinaIdTalentoGET = ({ idUnderscoretalento }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscoretalento,
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
  vitrinaGET,
  vitrinaIdTalentoGET,
};
