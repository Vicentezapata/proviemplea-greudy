/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Cambiar estado de solicitud (solo admin)
*
* idUnderscoresolicitud UUID 
* solicitudesIdSolicitudEstadoPatchRequest SolicitudesIdSolicitudEstadoPatchRequest 
* returns SuccessResponse
* */
const solicitudesIdSolicitudEstadoPATCH = ({ idUnderscoresolicitud, solicitudesIdSolicitudEstadoPatchRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscoresolicitud,
        solicitudesIdSolicitudEstadoPatchRequest,
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
* Ver detalle de una solicitud
*
* idUnderscoresolicitud UUID 
* returns SuccessResponse
* */
const solicitudesIdSolicitudGET = ({ idUnderscoresolicitud }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscoresolicitud,
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
* Actualizar notas internas de una solicitud (solo admin)
*
* idUnderscoresolicitud UUID 
* solicitudesIdSolicitudNotasPutRequest SolicitudesIdSolicitudNotasPutRequest 
* returns SuccessResponse
* */
const solicitudesIdSolicitudNotasPUT = ({ idUnderscoresolicitud, solicitudesIdSolicitudNotasPutRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscoresolicitud,
        solicitudesIdSolicitudNotasPutRequest,
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
* Solicitar contacto con un talento
*
* solicitudesPostRequest SolicitudesPostRequest 
* returns SuccessResponse
* */
const solicitudesPOST = ({ solicitudesPostRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        solicitudesPostRequest,
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
  solicitudesIdSolicitudEstadoPATCH,
  solicitudesIdSolicitudGET,
  solicitudesIdSolicitudNotasPUT,
  solicitudesPOST,
};
