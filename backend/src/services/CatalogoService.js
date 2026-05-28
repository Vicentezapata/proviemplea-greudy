const sequelize = require('../config/connection');

// Lista de rubros de empresa
const catalogosRubrosGET = async () => {
  const [rubros] = await sequelize.query('SELECT * FROM rubros_empresa ORDER BY id_rubro');
  return { success: true, data: rubros };
};

// Lista de competencias técnicas
const catalogosCompetenciasGET = async () => {
  const [competencias] = await sequelize.query('SELECT * FROM competencias_tecnicas ORDER BY id_competencia');
  return { success: true, data: competencias };
};

// Lista de idiomas
const catalogosIdiomasGET = async () => {
  const [idiomas] = await sequelize.query('SELECT * FROM idiomas ORDER BY id_idioma');
  return { success: true, data: idiomas };
};

// Rangos de renta
const catalogosRangosRentaGET = async () => {
  const [rangos] = await sequelize.query('SELECT * FROM rangos_renta ORDER BY id_rango');
  return { success: true, data: rangos };
};

// Estados de seguimiento
const catalogosEstadosSeguimientoGET = async () => {
  const [estados] = await sequelize.query('SELECT * FROM estados_seguimiento ORDER BY id_estado');
  return { success: true, data: estados };
};

module.exports = {
  catalogosRubrosGET,
  catalogosCompetenciasGET,
  catalogosIdiomasGET,
  catalogosRangosRentaGET,
  catalogosEstadosSeguimientoGET
};