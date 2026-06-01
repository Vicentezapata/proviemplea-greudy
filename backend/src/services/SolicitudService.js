const sequelize = require('../config/connection');

const solicitudesPOST = async (id_usuario, body) => {
  const { id_talento } = body;

  const [empresaRow] = await sequelize.query(
    `SELECT id_empresa FROM usuarios_empresa WHERE id_usuario = :id_usuario`,
    { replacements: { id_usuario } }
  );
  if (!empresaRow.length) return { success: false, message: 'Empresa no encontrada' };

  const id_empresa = empresaRow[0].id_empresa;

  // Verificar que el talento existe y está disponible
  const [talento] = await sequelize.query(
    `SELECT id_talento FROM talentos
     WHERE id_talento = :id_talento
     AND contratado = FALSE
     AND fecha_eliminacion IS NULL`,
    { replacements: { id_talento } }
  );
  if (!talento.length) return { success: false, message: 'Talento no disponible o ya contratado' };

  // Verificar duplicado antes de insertar
  const [existente] = await sequelize.query(
    `SELECT id_solicitud FROM solicitudes_talento
     WHERE id_empresa = :id_empresa AND id_talento = :id_talento`,
    { replacements: { id_empresa, id_talento } }
  );
  if (existente.length) return { success: false, message: 'Ya existe una solicitud activa para este talento' };

  const [result] = await sequelize.query(
    `INSERT INTO solicitudes_talento (id_empresa, id_talento, id_estado)
     VALUES (:id_empresa, :id_talento, 1)
     RETURNING id_solicitud`,
    { replacements: { id_empresa, id_talento } }
  );

  return {
    success: true,
    message: 'Solicitud enviada. El equipo de Providencia se pondrá en contacto.',
    data: { id_solicitud: result[0].id_solicitud, estado: 'Solicitado' }
  };
};

const solicitudesIdSolicitudGET = async (id_solicitud) => {
  const [solicitud] = await sequelize.query(
    `SELECT st.*, es.nombre as estado
     FROM solicitudes_talento st
     JOIN estados_seguimiento es ON st.id_estado = es.id_estado
     WHERE st.id_solicitud = :id_solicitud`,
    { replacements: { id_solicitud } }
  );
  if (!solicitud.length) return { success: false, message: 'Solicitud no encontrada' };
  return { success: true, data: solicitud[0] };
};

const solicitudesIdSolicitudEstadoPATCH = async (id_solicitud, body) => {
  const { id_estado } = body;
  await sequelize.query(
    `UPDATE solicitudes_talento SET id_estado = :id_estado WHERE id_solicitud = :id_solicitud`,
    { replacements: { id_estado, id_solicitud } }
  );
  return { success: true, message: 'Estado actualizado exitosamente' };
};

const solicitudesIdSolicitudNotasPUT = async (id_solicitud, body) => {
  const { notas_internas } = body;
  await sequelize.query(
    `UPDATE solicitudes_talento SET notas_internas = :notas_internas WHERE id_solicitud = :id_solicitud`,
    { replacements: { notas_internas, id_solicitud } }
  );
  return { success: true, message: 'Notas actualizadas exitosamente' };
};

module.exports = {
  solicitudesPOST,
  solicitudesIdSolicitudGET,
  solicitudesIdSolicitudEstadoPATCH,
  solicitudesIdSolicitudNotasPUT
};