const sequelize = require('../config/connection');
const Usuario = require('../models/Usuario');
const Talento = require('../models/Talento');

// Listar todos los usuarios del sistema
const adminUsuariosGET = async (query) => {
  const { rol, estado_validacion, page = 1, limit = 20 } = query;

  let filtros = `WHERE u.fecha_eliminacion IS NULL`;

  if (rol) {
    filtros += ` AND r.nombre = '${rol}'`;
  }

  if (estado_validacion) {
    filtros += ` AND u.estado_validacion = '${estado_validacion}'`;
  }

  const offset = (page - 1) * limit;

  const [usuarios] = await sequelize.query(`
    SELECT u.id_usuario, u.correo, u.estado_validacion, u.fecha_creacion, r.nombre as rol
    FROM usuarios u
    JOIN roles r ON u.id_rol = r.id_rol
    ${filtros}
    ORDER BY u.fecha_creacion DESC
    LIMIT ${limit} OFFSET ${offset}
  `);

  const [countResult] = await sequelize.query(`
    SELECT COUNT(*) as total FROM usuarios u
    JOIN roles r ON u.id_rol = r.id_rol
    ${filtros}
  `);

  const total = parseInt(countResult[0].total);

  return {
    success: true,
    data: usuarios,
    meta: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    }
  };
};

// Aprobar o rechazar cuenta de usuario
const adminUsuariosIdUsuarioValidarPATCH = async (id_usuario, body) => {
  const { estado_validacion } = body;

  await Usuario.update(
    { estado_validacion },
    { where: { id_usuario } }
  );

  return { success: true, message: 'Estado de validación actualizado exitosamente' };
};

// Listar talentos con datos completos
const adminTalentosGET = async (query) => {
  const { page = 1, limit = 20 } = query;
  const offset = (page - 1) * limit;

  const [talentos] = await sequelize.query(`
    SELECT t.*, u.correo, u.estado_validacion, rr.descripcion as rango_renta
    FROM talentos t
    JOIN usuarios u ON t.id_usuario = u.id_usuario
    LEFT JOIN rangos_renta rr ON t.id_rango_renta = rr.id_rango
    WHERE t.fecha_eliminacion IS NULL
    ORDER BY t.fecha_creacion DESC
    LIMIT ${limit} OFFSET ${offset}
  `);

  const [countResult] = await sequelize.query(`
    SELECT COUNT(*) as total FROM talentos t WHERE t.fecha_eliminacion IS NULL
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

// Marcar talento como contratado
const adminTalentosIdTalentoContratadoPATCH = async (id_talento, body) => {
  const { contratado } = body;

  await Talento.update(
    { contratado },
    { where: { id_talento } }
  );

  return { success: true, message: 'Estado de contratación actualizado exitosamente' };
};

// Listar todas las empresas
const adminEmpresasGET = async (query) => {
  const { page = 1, limit = 20 } = query;
  const offset = (page - 1) * limit;

  const [empresas] = await sequelize.query(`
    SELECT e.*, r.nombre as rubro, t.nombre as tipo_empresa
    FROM empresas e
    LEFT JOIN rubros_empresa r ON e.id_rubro = r.id_rubro
    LEFT JOIN tipos_empresa t ON e.id_tipo_empresa = t.id_tipo
    WHERE e.fecha_eliminacion IS NULL
    ORDER BY e.fecha_creacion DESC
    LIMIT ${limit} OFFSET ${offset}
  `);

  const [countResult] = await sequelize.query(`
    SELECT COUNT(*) as total FROM empresas WHERE fecha_eliminacion IS NULL
  `);

  const total = parseInt(countResult[0].total);

  return {
    success: true,
    data: empresas,
    meta: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    }
  };
};

// Ver todas las solicitudes del sistema
const adminSolicitudesGET = async (query) => {
  const { id_estado, page = 1, limit = 20 } = query;
  const offset = (page - 1) * limit;

  let filtros = `WHERE 1=1`;

  if (id_estado) {
    filtros += ` AND st.id_estado = ${id_estado}`;
  }

  const [solicitudes] = await sequelize.query(`
    SELECT st.*, es.nombre as estado
    FROM solicitudes_talento st
    JOIN estados_seguimiento es ON st.id_estado = es.id_estado
    ${filtros}
    ORDER BY st.fecha_solicitud DESC
    LIMIT ${limit} OFFSET ${offset}
  `);

  const [countResult] = await sequelize.query(`
    SELECT COUNT(*) as total FROM solicitudes_talento st ${filtros}
  `);

  const total = parseInt(countResult[0].total);

  return {
    success: true,
    data: solicitudes,
    meta: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    }
  };
};

// Dashboard de estadísticas generales
const adminEstadisticasGET = async () => {
  const [[{ total_talentos }]] = await sequelize.query(
    `SELECT COUNT(*) as total_talentos FROM talentos WHERE fecha_eliminacion IS NULL`
  );

  const [[{ total_empresas }]] = await sequelize.query(
    `SELECT COUNT(*) as total_empresas FROM empresas WHERE fecha_eliminacion IS NULL`
  );

  const [[{ total_solicitudes }]] = await sequelize.query(
    `SELECT COUNT(*) as total_solicitudes FROM solicitudes_talento`
  );

  const [[{ talentos_contratados }]] = await sequelize.query(
    `SELECT COUNT(*) as talentos_contratados FROM talentos WHERE contratado = true`
  );

  const [solicitudes_por_estado] = await sequelize.query(`
    SELECT es.nombre as estado, COUNT(*) as cantidad
    FROM solicitudes_talento st
    JOIN estados_seguimiento es ON st.id_estado = es.id_estado
    GROUP BY es.nombre
  `);

  return {
    success: true,
    data: {
      total_talentos: parseInt(total_talentos),
      total_empresas: parseInt(total_empresas),
      total_solicitudes: parseInt(total_solicitudes),
      talentos_contratados: parseInt(talentos_contratados),
      solicitudes_por_estado
    }
  };
};

module.exports = {
  adminUsuariosGET,
  adminUsuariosIdUsuarioValidarPATCH,
  adminTalentosGET,
  adminTalentosIdTalentoContratadoPATCH,
  adminEmpresasGET,
  adminSolicitudesGET,
  adminEstadisticasGET
};