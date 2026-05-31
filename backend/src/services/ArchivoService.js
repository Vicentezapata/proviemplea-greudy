const sequelize = require('../config/connection');
const path = require('path');
const fs = require('fs');

const subirArchivo = async (id_usuario, file, tipo_documento) => {
  const tiposValidos = ['cv', 'comprobante_residencia', 'certificado'];

  if (!tiposValidos.includes(tipo_documento)) {
    return { success: false, message: 'Tipo de documento no válido. Use: cv, comprobante_residencia o certificado' };
  }

  const [talento] = await sequelize.query(
    `SELECT id_talento FROM talentos WHERE id_usuario = :id_usuario`,
    { replacements: { id_usuario } }
  );

  if (!talento.length) {
    return { success: false, message: 'Talento no encontrado' };
  }

  const id_talento = talento[0].id_talento;
  const extension = path.extname(file.originalname).replace('.', '').toLowerCase();
  const ruta_archivo = file.path;

  const [result] = await sequelize.query(
    `INSERT INTO archivos_talento (id_talento, tipo_documento, formato, ruta_archivo)
     VALUES (:id_talento, :tipo_documento, :formato, :ruta_archivo)
     RETURNING id_archivo`,
    { replacements: { id_talento, tipo_documento, formato: extension, ruta_archivo } }
  );

  return {
    success: true,
    message: 'Archivo subido exitosamente',
    data: {
      id_archivo: result[0].id_archivo,
      tipo_documento,
      formato: extension,
      ruta_archivo
    }
  };
};

const obtenerArchivos = async (id_usuario) => {
  const [archivos] = await sequelize.query(
    `SELECT a.id_archivo, a.tipo_documento, a.formato, a.ruta_archivo, a.fecha_subida
     FROM archivos_talento a
     INNER JOIN talentos t ON t.id_talento = a.id_talento
     WHERE t.id_usuario = :id_usuario
     AND a.fecha_eliminacion IS NULL
     ORDER BY a.fecha_subida DESC`,
    { replacements: { id_usuario } }
  );

  return { success: true, data: archivos };
};

const eliminarArchivo = async (id_archivo, id_usuario) => {
  const [archivo] = await sequelize.query(
    `SELECT a.id_archivo FROM archivos_talento a
     INNER JOIN talentos t ON t.id_talento = a.id_talento
     WHERE a.id_archivo = :id_archivo
     AND t.id_usuario = :id_usuario
     AND a.fecha_eliminacion IS NULL`,
    { replacements: { id_archivo, id_usuario } }
  );

  if (!archivo.length) {
    return { success: false, message: 'Archivo no encontrado' };
  }

  // Eliminar archivo físico del disco
  const [archivoData] = await sequelize.query(
    `SELECT ruta_archivo FROM archivos_talento WHERE id_archivo = :id_archivo`,
    { replacements: { id_archivo } }
  );

  if (archivoData.length && fs.existsSync(archivoData[0].ruta_archivo)) {
    fs.unlinkSync(archivoData[0].ruta_archivo);
  }

  // Soft delete en BD
  await sequelize.query(
    `UPDATE archivos_talento SET fecha_eliminacion = NOW() WHERE id_archivo = :id_archivo`,
    { replacements: { id_archivo } }
  );

  return { success: true, message: 'Archivo eliminado exitosamente' };
};

module.exports = { subirArchivo, obtenerArchivos, eliminarArchivo };