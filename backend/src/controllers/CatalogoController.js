const CatalogoService = require('../services/CatalogoService');

const catalogosRubrosGET = async (req, res) => {
  try {
    const resultado = await CatalogoService.catalogosRubrosGET();
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const catalogosCompetenciasGET = async (req, res) => {
  try {
    const resultado = await CatalogoService.catalogosCompetenciasGET();
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const catalogosIdiomasGET = async (req, res) => {
  try {
    const resultado = await CatalogoService.catalogosIdiomasGET();
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const catalogosRangosRentaGET = async (req, res) => {
  try {
    const resultado = await CatalogoService.catalogosRangosRentaGET();
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const catalogosEstadosSeguimientoGET = async (req, res) => {
  try {
    const resultado = await CatalogoService.catalogosEstadosSeguimientoGET();
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = {
  catalogosRubrosGET,
  catalogosCompetenciasGET,
  catalogosIdiomasGET,
  catalogosRangosRentaGET,
  catalogosEstadosSeguimientoGET
};