// Funciones helper para respuestas consistentes en toda la API

const exito = (res, data = {}, message = 'Operación exitosa', status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data
  });
};

const error = (res, message = 'Error interno del servidor', status = 500, errors = []) => {
  return res.status(status).json({
    success: false,
    message,
    ...(errors.length > 0 && { errors })
  });
};

const paginado = (res, data, meta) => {
  return res.status(200).json({
    success: true,
    data,
    meta
  });
};

module.exports = { exito, error, paginado };