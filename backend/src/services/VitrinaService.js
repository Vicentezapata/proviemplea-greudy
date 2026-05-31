const sequelize = require('../config/connection');

// Ver vitrina usando la vista vw_cv_ciego de la BD
const vitrinaGET = async (query) => {
  const { carrera, nivel_educacional, competencias, discapacidad, page = 1, limit = 10 } = query;

  let filtros = `WHERE fecha_eliminacion IS NULL AND contratado = false`;

  if (discapacidad === 'true') {
    filtros += ` AND discapacidad_ley21015 = true`;
  }

  if (carrera) {
    filtros += ` AND id_talento IN (
      SELECT id_talento FROM antecedentes_educacionales
      WHERE carrera ILIKE '%${carrera}%' AND fecha_eliminacion IS NULL
    )`;
  }

  if (nivel_educacional) {
    filtros += ` AND id_talento IN (
      SELECT id_talento FROM antecedentes_educacionales
      WHERE nivel_educacional ILIKE '%${nivel_educacional}%' AND fecha_eliminacion IS NULL
    )`;
  }

  if (competencias) {
    const ids = competencias.split(',').map(id => id.trim()).join(',');
    filtros += ` AND id_talento IN (
      SELECT id_talento FROM talento_competencia WHERE id_competencia IN (${ids})
    )`;
  }

  const offset = (page - 1) * limit;

  const [talentos] = await sequelize.query(`
    SELECT * FROM vw_cv_ciego
    ${filtros}
    LIMIT ${limit} OFFSET ${offset}
  `);

  const [countResult] = await sequelize.query(`
    SELECT COUNT(*) as total FROM vw_cv_ciego ${filtros}
  `);

  const total = parseInt(countResult[0].total);

  return {
    success: true,
    data: talentos,
    meta: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    }
  };
};

// Ver CV Ciego de un talento específico usando la vista
const vitrinaIdTalentoGET = async (id_talento) => {
  const [talento] = await sequelize.query(`
    SELECT * FROM vw_cv_ciego
    WHERE id_talento = '${id_talento}'
    AND contratado = false
  `);

  if (!talento.length) {
    return { success: false, message: 'Talento no encontrado' };
  }

  return {
    success: true,
    data: talento[0]
  };
};

module.exports = {
  vitrinaGET,
  vitrinaIdTalentoGET
};