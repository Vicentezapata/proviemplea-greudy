const CatalogoService = require('../services/CatalogoService');
const { exito } = require('../utils/response');

const catalogosRubrosGET = async (req, res, next) => {
  try {
    const resultado = await CatalogoService.catalogosRubrosGET();
    return exito(res, resultado.data, 'Lista de rubros obtenida exitosamente');
  } catch (e) {
    next(e);
  }
};

const catalogosCompetenciasGET = async (req, res, next) => {
  try {
    const resultado = await CatalogoService.catalogosCompetenciasGET();
    return exito(res, resultado.data, 'Lista de competencias obtenida exitosamente');
  } catch (e) {
    next(e);
  }
};

const catalogosIdiomasGET = async (req, res, next) => {
  try {
    const resultado = await CatalogoService.catalogosIdiomasGET();
    return exito(res, resultado.data, 'Lista de idiomas obtenida exitosamente');
  } catch (e) {
    next(e);
  }
};

const catalogosRangosRentaGET = async (req, res, next) => {
  try {
    const resultado = await CatalogoService.catalogosRangosRentaGET();
    return exito(res, resultado.data, 'Lista de rangos obtenida exitosamente');
  } catch (e) {
    next(e);
  }
};

const catalogosEstadosSeguimientoGET = async (req, res, next) => {
  try {
    const resultado = await CatalogoService.catalogosEstadosSeguimientoGET();
    return exito(res, resultado.data, 'Lista de estados obtenida exitosamente');
  } catch (e) {
    next(e);
  }
};

module.exports = {
  catalogosRubrosGET,
  catalogosCompetenciasGET,
  catalogosIdiomasGET,
  catalogosRangosRentaGET,
  catalogosEstadosSeguimientoGET
};