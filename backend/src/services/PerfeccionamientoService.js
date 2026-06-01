const sequelize = require('../config/connection');

const obtenerIdTalentoDeUsuario = async (id_usuario) => {
  const [talento] = await sequelize.query(
    `SELECT id_talento FROM talentos WHERE id_usuario = :id_usuario AND fecha_eliminacion IS NULL`,
    { replacements: { id_usuario } }
  );
  return talento.length ? talento[0].id_talento : null;
};

const perfeccionamientoGET = async (id_usuario) => {
  const id_talento = await obtenerIdTalentoDeUsuario(id_usuario);
  if (!id_talento) return { success: false, message: 'Talento no encontrado' };

  const [cursos] = await sequelize.query(
    `SELECT * FROM perfeccionamiento
     WHERE id_talento = :id_talento AND fecha_eliminacion IS NULL
     ORDER BY anio_certificacion DESC`,
    { replacements: { id_talento } }
  );
  return { success: true, data: cursos };
};

const perfeccionamientoPOST = async (id_usuario, body) => {
  const { nombre_curso, institucion, anio_certificacion } = body;
  const id_talento = await obtenerIdTalentoDeUsuario(id_usuario);
  if (!id_talento) return { success: false, message: 'Talento no encontrado' };

  await sequelize.query(
    `INSERT INTO perfeccionamiento (id_talento, nombre_curso, institucion, anio_certificacion)
     VALUES (:id_talento, :nombre_curso, :institucion, :anio_certificacion)`,
    { replacements: { id_talento, nombre_curso, institucion: institucion || null, anio_certificacion: anio_certificacion || null } }
  );
  return { success: true, message: 'Curso agregado exitosamente' };
};

const perfeccionamientoIdPUT = async (id_usuario, id_perfeccionamiento, body) => {
  const { nombre_curso, institucion, anio_certificacion } = body;
  const id_talento = await obtenerIdTalentoDeUsuario(id_usuario);
  if (!id_talento) return { success: false, message: 'Talento no encontrado' };

  // Verificar ownership
  const [result] = await sequelize.query(
    `SELECT id_perfeccionamiento FROM perfeccionamiento
     WHERE id_perfeccionamiento = :id_perfeccionamiento AND id_talento = :id_talento AND fecha_eliminacion IS NULL`,
    { replacements: { id_perfeccionamiento, id_talento } }
  );
  if (!result.length) return { success: false, message: 'Registro no encontrado o no autorizado' };

  await sequelize.query(
    `UPDATE perfeccionamiento
     SET nombre_curso = :nombre_curso, institucion = :institucion, anio_certificacion = :anio_certificacion
     WHERE id_perfeccionamiento = :id_perfeccionamiento`,
    { replacements: { nombre_curso, institucion: institucion || null, anio_certificacion: anio_certificacion || null, id_perfeccionamiento } }
  );
  return { success: true, message: 'Curso actualizado exitosamente' };
};

const perfeccionamientoIdDELETE = async (id_usuario, id_perfeccionamiento) => {
  const id_talento = await obtenerIdTalentoDeUsuario(id_usuario);
  if (!id_talento) return { success: false, message: 'Talento no encontrado' };

  const [result] = await sequelize.query(
    `SELECT id_perfeccionamiento FROM perfeccionamiento
     WHERE id_perfeccionamiento = :id_perfeccionamiento AND id_talento = :id_talento AND fecha_eliminacion IS NULL`,
    { replacements: { id_perfeccionamiento, id_talento } }
  );
  if (!result.length) return { success: false, message: 'Registro no encontrado o no autorizado' };

  await sequelize.query(
    `UPDATE perfeccionamiento SET fecha_eliminacion = NOW() WHERE id_perfeccionamiento = :id_perfeccionamiento`,
    { replacements: { id_perfeccionamiento } }
  );
  return { success: true, message: 'Curso eliminado exitosamente' };
};

module.exports = {
  perfeccionamientoGET,
  perfeccionamientoPOST,
  perfeccionamientoIdPUT,
  perfeccionamientoIdDELETE
};