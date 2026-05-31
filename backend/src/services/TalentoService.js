const sequelize = require('../config/connection');
const Talento = require('../models/Talento');

// Ver perfil completo del talento autenticado
const talentosPerfilGET = async (id_usuario) => {
  const [talento] = await sequelize.query(
    `SELECT t.*, rr.descripcion as rango_renta
     FROM talentos t
     LEFT JOIN rangos_renta rr ON t.id_rango_renta = rr.id_rango
     WHERE t.id_usuario = '${id_usuario}' AND t.fecha_eliminacion IS NULL`
  );

  if (!talento.length) {
    return { success: false, message: 'Perfil no encontrado' };
  }

  return { success: true, data: talento[0] };
};

// Actualizar perfil del talento
const talentosPerfilPUT = async (id_usuario, body) => {
  const { resumen, jornada_deseada, modalidad_deseada, id_rango_renta, discapacidad_ley21015 } = body;

  await Talento.update(
    { resumen, jornada_deseada, modalidad_deseada, id_rango_renta, discapacidad_ley21015 },
    { where: { id_usuario } }
  );

  return { success: true, message: 'Perfil actualizado exitosamente' };
};

// Agregar antecedente educacional
const talentosEducacionPOST = async (id_usuario, body) => {
  const { nivel_educacional, carrera, institucion } = body;

  const [talento] = await sequelize.query(
    `SELECT id_talento FROM talentos WHERE id_usuario = '${id_usuario}'`
  );

  if (!talento.length) {
    return { success: false, message: 'Talento no encontrado' };
  }

  await sequelize.query(
    `INSERT INTO antecedentes_educacionales (id_talento, nivel_educacional, carrera, institucion)
     VALUES ('${talento[0].id_talento}', '${nivel_educacional}', '${carrera || ''}', '${institucion || ''}')`
  );

  return { success: true, message: 'Educación agregada exitosamente' };
};

// Actualizar antecedente educacional
const talentosEducacionIdEducacionPUT = async (id_educacion, body) => {
  const { nivel_educacional, carrera, institucion } = body;

  await sequelize.query(
    `UPDATE antecedentes_educacionales 
     SET nivel_educacional = '${nivel_educacional}', carrera = '${carrera}', institucion = '${institucion}'
     WHERE id_educacion = '${id_educacion}'`
  );

  return { success: true, message: 'Actualizado exitosamente' };
};

// Eliminar antecedente educacional (soft delete)
const talentosEducacionIdEducacionDELETE = async (id_educacion) => {
  await sequelize.query(
    `UPDATE antecedentes_educacionales SET fecha_eliminacion = NOW() WHERE id_educacion = '${id_educacion}'`
  );

  return { success: true, message: 'Eliminado exitosamente' };
};

// Agregar experiencia laboral
const talentosLaboralPOST = async (id_usuario, body) => {
  const { empresa, cargo, descripcion, fecha_inicio, fecha_fin } = body;

  const [talento] = await sequelize.query(
    `SELECT id_talento FROM talentos WHERE id_usuario = '${id_usuario}'`
  );

  if (!talento.length) {
    return { success: false, message: 'Talento no encontrado' };
  }

  await sequelize.query(
    `INSERT INTO antecedentes_laborales (id_talento, empresa, cargo, descripcion, fecha_inicio, fecha_fin)
     VALUES ('${talento[0].id_talento}', '${empresa}', '${cargo}', '${descripcion || ''}', 
     ${fecha_inicio ? `'${fecha_inicio}'` : 'NULL'}, ${fecha_fin ? `'${fecha_fin}'` : 'NULL'})`
  );

  return { success: true, message: 'Experiencia laboral agregada exitosamente' };
};

// Actualizar experiencia laboral
const talentosLaboralIdLaboralPUT = async (id_laboral, body) => {
  const { empresa, cargo, descripcion, fecha_inicio, fecha_fin } = body;

  await sequelize.query(
    `UPDATE antecedentes_laborales 
     SET empresa = '${empresa}', cargo = '${cargo}', descripcion = '${descripcion}',
     fecha_inicio = ${fecha_inicio ? `'${fecha_inicio}'` : 'NULL'},
     fecha_fin = ${fecha_fin ? `'${fecha_fin}'` : 'NULL'}
     WHERE id_laboral = '${id_laboral}'`
  );

  return { success: true, message: 'Actualizado exitosamente' };
};

// Eliminar experiencia laboral (soft delete)
const talentosLaboralIdLaboralDELETE = async (id_laboral) => {
  await sequelize.query(
    `UPDATE antecedentes_laborales SET fecha_eliminacion = NOW() WHERE id_laboral = '${id_laboral}'`
  );

  return { success: true, message: 'Eliminado exitosamente' };
};

// Actualizar competencias del talento
const talentosCompetenciasPUT = async (id_usuario, body) => {
  const { competencias } = body;

  const [talento] = await sequelize.query(
    `SELECT id_talento FROM talentos WHERE id_usuario = '${id_usuario}'`
  );

  if (!talento.length) {
    return { success: false, message: 'Talento no encontrado' };
  }

  const id_talento = talento[0].id_talento;

  // Elimino las competencias anteriores y agrego las nuevas
  await sequelize.query(`DELETE FROM talento_competencia WHERE id_talento = '${id_talento}'`);

  for (const id_competencia of competencias) {
    await sequelize.query(
      `INSERT INTO talento_competencia (id_talento, id_competencia) VALUES ('${id_talento}', ${id_competencia})`
    );
  }

  return { success: true, message: 'Competencias actualizadas exitosamente' };
};

// Actualizar idiomas del talento
const talentosIdiomasPUT = async (id_usuario, body) => {
  const { idiomas } = body;

  const [talento] = await sequelize.query(
    `SELECT id_talento FROM talentos WHERE id_usuario = '${id_usuario}'`
  );

  if (!talento.length) {
    return { success: false, message: 'Talento no encontrado' };
  }

  const id_talento = talento[0].id_talento;

  // Elimino los idiomas anteriores y agrego los nuevos
  await sequelize.query(`DELETE FROM talento_idioma WHERE id_talento = '${id_talento}'`);

  for (const idioma of idiomas) {
    await sequelize.query(
      `INSERT INTO talento_idioma (id_talento, id_idioma, nivel_dominio) 
       VALUES ('${id_talento}', ${idioma.id_idioma}, '${idioma.nivel_dominio}')`
    );
  }

  return { success: true, message: 'Idiomas actualizados exitosamente' };
};

module.exports = {
  talentosPerfilGET,
  talentosPerfilPUT,
  talentosEducacionPOST,
  talentosEducacionIdEducacionPUT,
  talentosEducacionIdEducacionDELETE,
  talentosLaboralPOST,
  talentosLaboralIdLaboralPUT,
  talentosLaboralIdLaboralDELETE,
  talentosCompetenciasPUT,
  talentosIdiomasPUT
};