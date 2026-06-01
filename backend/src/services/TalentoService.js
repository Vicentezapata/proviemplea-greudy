const sequelize = require('../config/connection');
const Talento = require('../models/Talento');

const talentosPerfilGET = async (id_usuario) => {
  const [talento] = await sequelize.query(
    `SELECT t.*, rr.descripcion as rango_renta
     FROM talentos t
     LEFT JOIN rangos_renta rr ON t.id_rango_renta = rr.id_rango
     WHERE t.id_usuario = :id_usuario AND t.fecha_eliminacion IS NULL`,
    { replacements: { id_usuario } }
  );
  if (!talento.length) return { success: false, message: 'Perfil no encontrado' };
  return { success: true, data: talento[0] };
};

const talentosPerfilPUT = async (id_usuario, body) => {
  const { resumen, jornada_deseada, modalidad_deseada, id_rango_renta, discapacidad_ley21015 } = body;
  await Talento.update(
    { resumen, jornada_deseada, modalidad_deseada, id_rango_renta, discapacidad_ley21015 },
    { where: { id_usuario } }
  );
  return { success: true, message: 'Perfil actualizado exitosamente' };
};

// ─── Helpers internos ─────────────────────────────────────────────────────────

const obtenerIdTalentoDeUsuario = async (id_usuario) => {
  const [talento] = await sequelize.query(
    `SELECT id_talento FROM talentos WHERE id_usuario = :id_usuario AND fecha_eliminacion IS NULL`,
    { replacements: { id_usuario } }
  );
  return talento.length ? talento[0].id_talento : null;
};

const verificarOwnershipEducacion = async (id_educacion, id_talento) => {
  const [result] = await sequelize.query(
    `SELECT id_educacion FROM antecedentes_educacionales
     WHERE id_educacion = :id_educacion AND id_talento = :id_talento AND fecha_eliminacion IS NULL`,
    { replacements: { id_educacion, id_talento } }
  );
  return result.length > 0;
};

const verificarOwnershipLaboral = async (id_laboral, id_talento) => {
  const [result] = await sequelize.query(
    `SELECT id_laboral FROM antecedentes_laborales
     WHERE id_laboral = :id_laboral AND id_talento = :id_talento AND fecha_eliminacion IS NULL`,
    { replacements: { id_laboral, id_talento } }
  );
  return result.length > 0;
};

// ─── Educación ────────────────────────────────────────────────────────────────

const talentosEducacionPOST = async (id_usuario, body) => {
  const { nivel_educacional, carrera, institucion } = body;
  const id_talento = await obtenerIdTalentoDeUsuario(id_usuario);
  if (!id_talento) return { success: false, message: 'Talento no encontrado' };

  await sequelize.query(
    `INSERT INTO antecedentes_educacionales (id_talento, nivel_educacional, carrera, institucion)
     VALUES (:id_talento, :nivel_educacional, :carrera, :institucion)`,
    { replacements: { id_talento, nivel_educacional, carrera: carrera || '', institucion: institucion || '' } }
  );
  return { success: true, message: 'Educación agregada exitosamente' };
};

const talentosEducacionIdEducacionPUT = async (id_usuario, id_educacion, body) => {
  const { nivel_educacional, carrera, institucion } = body;
  const id_talento = await obtenerIdTalentoDeUsuario(id_usuario);
  if (!id_talento) return { success: false, message: 'Talento no encontrado' };

  const esOwner = await verificarOwnershipEducacion(id_educacion, id_talento);
  if (!esOwner) return { success: false, message: 'Registro no encontrado o no autorizado' };

  await sequelize.query(
    `UPDATE antecedentes_educacionales
     SET nivel_educacional = :nivel_educacional, carrera = :carrera, institucion = :institucion
     WHERE id_educacion = :id_educacion`,
    { replacements: { nivel_educacional, carrera, institucion, id_educacion } }
  );
  return { success: true, message: 'Actualizado exitosamente' };
};

const talentosEducacionIdEducacionDELETE = async (id_usuario, id_educacion) => {
  const id_talento = await obtenerIdTalentoDeUsuario(id_usuario);
  if (!id_talento) return { success: false, message: 'Talento no encontrado' };

  const esOwner = await verificarOwnershipEducacion(id_educacion, id_talento);
  if (!esOwner) return { success: false, message: 'Registro no encontrado o no autorizado' };

  await sequelize.query(
    `UPDATE antecedentes_educacionales SET fecha_eliminacion = NOW() WHERE id_educacion = :id_educacion`,
    { replacements: { id_educacion } }
  );
  return { success: true, message: 'Eliminado exitosamente' };
};

// ─── Laboral ──────────────────────────────────────────────────────────────────

const talentosLaboralPOST = async (id_usuario, body) => {
  const { empresa, cargo, descripcion, fecha_inicio, fecha_fin } = body;
  const id_talento = await obtenerIdTalentoDeUsuario(id_usuario);
  if (!id_talento) return { success: false, message: 'Talento no encontrado' };

  await sequelize.query(
    `INSERT INTO antecedentes_laborales (id_talento, empresa, cargo, descripcion, fecha_inicio, fecha_fin)
     VALUES (:id_talento, :empresa, :cargo, :descripcion, :fecha_inicio, :fecha_fin)`,
    { replacements: { id_talento, empresa, cargo, descripcion: descripcion || '', fecha_inicio: fecha_inicio || null, fecha_fin: fecha_fin || null } }
  );
  return { success: true, message: 'Experiencia laboral agregada exitosamente' };
};

const talentosLaboralIdLaboralPUT = async (id_usuario, id_laboral, body) => {
  const { empresa, cargo, descripcion, fecha_inicio, fecha_fin } = body;
  const id_talento = await obtenerIdTalentoDeUsuario(id_usuario);
  if (!id_talento) return { success: false, message: 'Talento no encontrado' };

  const esOwner = await verificarOwnershipLaboral(id_laboral, id_talento);
  if (!esOwner) return { success: false, message: 'Registro no encontrado o no autorizado' };

  await sequelize.query(
    `UPDATE antecedentes_laborales
     SET empresa = :empresa, cargo = :cargo, descripcion = :descripcion,
         fecha_inicio = :fecha_inicio, fecha_fin = :fecha_fin
     WHERE id_laboral = :id_laboral`,
    { replacements: { empresa, cargo, descripcion, fecha_inicio: fecha_inicio || null, fecha_fin: fecha_fin || null, id_laboral } }
  );
  return { success: true, message: 'Actualizado exitosamente' };
};

const talentosLaboralIdLaboralDELETE = async (id_usuario, id_laboral) => {
  const id_talento = await obtenerIdTalentoDeUsuario(id_usuario);
  if (!id_talento) return { success: false, message: 'Talento no encontrado' };

  const esOwner = await verificarOwnershipLaboral(id_laboral, id_talento);
  if (!esOwner) return { success: false, message: 'Registro no encontrado o no autorizado' };

  await sequelize.query(
    `UPDATE antecedentes_laborales SET fecha_eliminacion = NOW() WHERE id_laboral = :id_laboral`,
    { replacements: { id_laboral } }
  );
  return { success: true, message: 'Eliminado exitosamente' };
};

// ─── Competencias — con transacción ──────────────────────────────────────────

const talentosCompetenciasPUT = async (id_usuario, body) => {
  const { competencias } = body;
  const id_talento = await obtenerIdTalentoDeUsuario(id_usuario);
  if (!id_talento) return { success: false, message: 'Talento no encontrado' };

  const t = await sequelize.transaction();
  try {
    await sequelize.query(
      `DELETE FROM talento_competencia WHERE id_talento = :id_talento`,
      { replacements: { id_talento }, transaction: t }
    );
    for (const id_competencia of competencias) {
      await sequelize.query(
        `INSERT INTO talento_competencia (id_talento, id_competencia) VALUES (:id_talento, :id_competencia)`,
        { replacements: { id_talento, id_competencia }, transaction: t }
      );
    }
    await t.commit();
    return { success: true, message: 'Competencias actualizadas exitosamente' };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

// ─── Idiomas — con transacción ────────────────────────────────────────────────

const talentosIdiomasPUT = async (id_usuario, body) => {
  const { idiomas } = body;
  const id_talento = await obtenerIdTalentoDeUsuario(id_usuario);
  if (!id_talento) return { success: false, message: 'Talento no encontrado' };

  const t = await sequelize.transaction();
  try {
    await sequelize.query(
      `DELETE FROM talento_idioma WHERE id_talento = :id_talento`,
      { replacements: { id_talento }, transaction: t }
    );
    for (const idioma of idiomas) {
      await sequelize.query(
        `INSERT INTO talento_idioma (id_talento, id_idioma, nivel_dominio) VALUES (:id_talento, :id_idioma, :nivel_dominio)`,
        { replacements: { id_talento, id_idioma: idioma.id_idioma, nivel_dominio: idioma.nivel_dominio }, transaction: t }
      );
    }
    await t.commit();
    return { success: true, message: 'Idiomas actualizados exitosamente' };
  } catch (error) {
    await t.rollback();
    throw error;
  }
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