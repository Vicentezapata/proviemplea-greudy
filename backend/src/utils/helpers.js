// Funciones utilitarias reutilizables en toda la API

// Genera la paginación estándar
const paginar = (page = 1, limit = 10) => {
  const pagina = parseInt(page);
  const limite = parseInt(limit);
  const offset = (pagina - 1) * limite;
  return { pagina, limite, offset };
};

// Genera el objeto meta de paginación
const generarMeta = (total, pagina, limite) => {
  return {
    total: parseInt(total),
    page: pagina,
    limit: limite,
    totalPages: Math.ceil(total / limite)
  };
};

// Elimina campos sensibles de un objeto usuario
const sanitizarUsuario = (usuario) => {
  const { password_hash, ...usuarioSeguro } = usuario;
  return usuarioSeguro;
};

module.exports = {
  paginar,
  generarMeta,
  sanitizarUsuario
};