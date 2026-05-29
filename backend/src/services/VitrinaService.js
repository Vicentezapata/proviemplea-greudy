const sequelize = require('../config/connection');

// Ver vitrina de talentos con CV Ciego — sin datos personales
const vitrinaGET = async (query) => {
  const { carrera, nivel_educacional, competencias, discapacidad, page = 1, limit = 10 } = query;

  let filtros = `WHERE t.fecha_eliminacion IS NULL AND t.contratado = false`;

  if (discapacidad === 'true') {
    filtros += ` AND t.discapacidad_ley21015 = true`;
  }

  if (carrera) {
    filtros += ` AND EXISTS (
      SELECT 1 FROM antecedentes_educacionales ae 
      WHERE ae.id_talento = t.id_talento AND ae.carrera ILIKE '%${carrera}%'
    )`;
  }

  if (nivel_educacional) {
    filtros += ` AND EXISTS (
      SELECT 1 FROM antecedentes_educacionales ae 
      WHERE ae.id_talento = t.id_talento AND ae.nivel_educacional ILIKE '%${nivel_educacional}%'
    )`;
  }

  if (competencias) {
    const ids = competencias.split(',').map(id => id.trim()).join(',');
    filtros += ` AND t.id_talento IN (
      SELECT id_talento FROM talento_competencia WHERE id_competencia IN (${ids})
    )`;
  }

  const offset = (page - 1) * limit;

  const [talentos] = await sequelize.query(`
    SELECT
      t.id_talento,
      t.resumen,
      t.discapacidad_ley21015,
      t.jornada_deseada,
      t.modalidad_deseada,
      rr.descripcion as rango_renta
    FROM talentos t
    LEFT JOIN rangos_renta rr ON t.id_rango_renta = rr.id_rango
    ${filtros}
    LIMIT ${limit} OFFSET ${offset}
  `);

  const [countResult] = await sequelize.query(`
    SELECT COUNT(*) as total FROM talentos t ${filtros}
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

// Ver CV Ciego de un talento específico
const vitrinaIdTalentoGET = async (id_talento) => {
  const [talento] = await sequelize.query(`
    SELECT
      t.id_talento,
      t.resumen,
      t.discapacidad_ley21015,
      t.jornada_deseada,
      t.modalidad_deseada,
      rr.descripcion as rango_renta
    FROM talentos t
    LEFT JOIN rangos_renta rr ON t.id_rango_renta = rr.id_rango
    WHERE t.id_talento = '${id_talento}'
    AND t.fecha_eliminacion IS NULL
    AND t.contratado = false
  `);

  if (!talento.length) {
    return { success: false, message: 'Talento no encontrado' };
  }

  const [competencias] = await sequelize.query(`
    SELECT ct.nombre FROM talento_competencia tc
    JOIN competencias_tecnicas ct ON tc.id_competencia = ct.id_competencia
    WHERE tc.id_talento = '${id_talento}'
  `);

  const [idiomas] = await sequelize.query(`
    SELECT i.nombre, ti.nivel_dominio FROM talento_idioma ti
    JOIN idiomas i ON ti.id_idioma = i.id_idioma
    WHERE ti.id_talento = '${id_talento}'
  `);

  const [educacion] = await sequelize.query(`
    SELECT nivel_educacional, carrera FROM antecedentes_educacionales
    WHERE id_talento = '${id_talento}' AND fecha_eliminacion IS NULL
  `);

  const [experiencia] = await sequelize.query(`
    SELECT cargo, descripcion, fecha_inicio, fecha_fin FROM antecedentes_laborales
    WHERE id_talento = '${id_talento}' AND fecha_eliminacion IS NULL
  `);

  return {
    success: true,
    data: {
      ...talento[0],
      competencias,
      idiomas,
      educacion,
      experiencia_laboral: experiencia
    }
  };
};

module.exports = {
  vitrinaGET,
  vitrinaIdTalentoGET
};