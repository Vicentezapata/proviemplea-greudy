/**
 * The AdminController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/AdminService');
const adminEmpresasGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.adminEmpresasGET);
};

const adminEstadisticasGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.adminEstadisticasGET);
};

const adminSolicitudesGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.adminSolicitudesGET);
};

const adminTalentosGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.adminTalentosGET);
};

const adminTalentosIdTalentoContratadoPATCH = async (request, response) => {
  await Controller.handleRequest(request, response, service.adminTalentosIdTalentoContratadoPATCH);
};

const adminUsuariosGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.adminUsuariosGET);
};

const adminUsuariosIdUsuarioValidarPATCH = async (request, response) => {
  await Controller.handleRequest(request, response, service.adminUsuariosIdUsuarioValidarPATCH);
};


module.exports = {
  adminEmpresasGET,
  adminEstadisticasGET,
  adminSolicitudesGET,
  adminTalentosGET,
  adminTalentosIdTalentoContratadoPATCH,
  adminUsuariosGET,
  adminUsuariosIdUsuarioValidarPATCH,
};
