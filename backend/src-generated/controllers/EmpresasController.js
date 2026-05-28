/**
 * The EmpresasController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/EmpresasService');
const empresasPerfilGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.empresasPerfilGET);
};

const empresasPerfilPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.empresasPerfilPUT);
};

const empresasSolicitudesGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.empresasSolicitudesGET);
};

const empresasUsuariosGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.empresasUsuariosGET);
};

const empresasUsuariosIdUsuarioDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.empresasUsuariosIdUsuarioDELETE);
};

const empresasUsuariosPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.empresasUsuariosPOST);
};


module.exports = {
  empresasPerfilGET,
  empresasPerfilPUT,
  empresasSolicitudesGET,
  empresasUsuariosGET,
  empresasUsuariosIdUsuarioDELETE,
  empresasUsuariosPOST,
};
