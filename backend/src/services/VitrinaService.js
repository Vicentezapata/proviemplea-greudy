const sequelize = require('../config/connection');

const vitrinaGET = async (query) => {
  const { carrera, nivel_educacional, competencias, discapacidad, page = 1, limit = 10 } = query;
  const offset = (page - 1) * limit;

  let where = `WHERE 1=1`;
  const replacements = { limit: parseInt(limit), offset: parseInt(offset) };

  if (discapacidad === 'true') {
    where += ` AND discapacidad_ley21015 = true`;
  }

  if (carrera) {
    where += ` AND id_talento IN (
      SELECT id_talento FROM antecedentes_educacionales
      WHERE carrera ILIKE :carrera AND fecha_eliminacion IS NULL
    )`;
    replacements.carrera = `%${carrera}%`;
  }

  if (nivel_educacional) {
    where += ` AND id_talento IN (
      SELECT id_talento FROM antecedentes_educacionales
      WHERE nivel_educacional ILIKE :nivel_educacional AND fecha_eliminacion IS NULL
    )`;
    replacements.nivel_educacional = `%${nivel_educacional}%`;
  }

  if (competencias) {
    const ids = competencias.split(',').map(id => parseInt(id.trim())).filter(Boolean);
    where += ` AND id_talento IN (
      SELECT id_talento FROM talento_competencia WHERE id_competencia IN (:ids)
    )`;
    replacements.ids = ids;
  }

  const [talentos] = await sequelize.query(
    `SELECT * FROM vw_cv_ciego ${where} LIMIT :limit OFFSET :offset`,
    { replacements }
  );

  const [countResult] = await sequelize.query(
    `SELECT COUNT(*) as total FROM vw_cv_ciego ${where}`,
    { replacements }
  );

  const total = parseInt(countResult[0].total);
  return {
    success: true,
    data: talentos,
    meta: { total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / limit) }
  };
};

const vitrinaIdTalentoGET = async (id_talento) => {
  const [talento] = await sequelize.query(
    `SELECT * FROM vw_cv_ciego WHERE id_talento = :id_talento`,
    { replacements: { id_talento } }
  );
  if (!talento.length) return { success: false, message: 'Talento no encontrado' };
  return { success: true, data: talento[0] };
};

module.exports = { vitrinaGET, vitrinaIdTalentoGET };