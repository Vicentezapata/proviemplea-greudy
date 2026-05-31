const ArchivoService = require('../services/ArchivoService');
const { exito, error } = require('../utils/response');

const subirArchivo = async (req, res, next) => {
  try {
    if (!req.file) {
      return error(res, 'No se recibió ningún archivo', 400);
    }

    const resultado = await ArchivoService.subirArchivo(
      req.usuario.id_usuario,
      req.file,
      req.body.tipo_documento
    );

    if (!resultado.success) return error(res, resultado.message, 400);
    return exito(res, resultado.data, resultado.message, 201);
  } catch (e) {
    next(e);
  }
};

const obtenerArchivos = async (req, res, next) => {
  try {
    const resultado = await ArchivoService.obtenerArchivos(req.usuario.id_usuario);
    return exito(res, resultado.data, 'Archivos obtenidos exitosamente');
  } catch (e) {
    next(e);
  }
};

const eliminarArchivo = async (req, res, next) => {
  try {
    const resultado = await ArchivoService.eliminarArchivo(
      req.params.id_archivo,
      req.usuario.id_usuario
    );
    if (!resultado.success) return error(res, resultado.message, 404);
    return exito(res, {}, resultado.message);
  } catch (e) {
    next(e);
  }
};

module.exports = { subirArchivo, obtenerArchivos, eliminarArchivo };