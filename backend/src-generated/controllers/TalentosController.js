/**
 * The TalentosController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/TalentosService');
const talentosCompetenciasPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.talentosCompetenciasPUT);
};

const talentosEducacionIdEducacionDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.talentosEducacionIdEducacionDELETE);
};

const talentosEducacionIdEducacionPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.talentosEducacionIdEducacionPUT);
};

const talentosEducacionPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.talentosEducacionPOST);
};

const talentosIdiomasPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.talentosIdiomasPUT);
};

const talentosLaboralIdLaboralDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.talentosLaboralIdLaboralDELETE);
};

const talentosLaboralIdLaboralPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.talentosLaboralIdLaboralPUT);
};

const talentosLaboralPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.talentosLaboralPOST);
};

const talentosPerfilGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.talentosPerfilGET);
};

const talentosPerfilPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.talentosPerfilPUT);
};


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
