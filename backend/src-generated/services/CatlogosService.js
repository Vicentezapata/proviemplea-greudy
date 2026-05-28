/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Lista de competencias técnicas
*
* returns SuccessResponse
* */
const catalogosCompetenciasGET = () => new Promise(
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
* Estados del proceso de selección
*
* returns SuccessResponse
* */
const catalogosEstadosSeguimientoGET = () => new Promise(
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
* Lista de idiomas disponibles
*
* returns SuccessResponse
* */
const catalogosIdiomasGET = () => new Promise(
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
* Rangos de renta disponibles
*
* returns SuccessResponse
* */
const catalogosRangosRentaGET = () => new Promise(
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
* Lista de rubros de empresa
*
* returns SuccessResponse
* */
const catalogosRubrosGET = () => new Promise(
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

module.exports = {
  catalogosCompetenciasGET,
  catalogosEstadosSeguimientoGET,
  catalogosIdiomasGET,
  catalogosRangosRentaGET,
  catalogosRubrosGET,
};
