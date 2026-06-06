const sequelize = require('../config/connection');

const mensajesGET = async (id_usuario) => {
  const [conversaciones] = await sequelize.query(`
    SELECT 
      c.id, c.tipo, c.asunto, c."createdAt",
      u_origen.correo AS remitente,
      (
        SELECT m.texto FROM mensajes m 
        WHERE m.id_conversacion = c.id 
        ORDER BY m."createdAt" DESC LIMIT 1
      ) AS preview,
      (
        SELECT m."createdAt" FROM mensajes m 
        WHERE m.id_conversacion = c.id 
        ORDER BY m."createdAt" DESC LIMIT 1
      ) AS fecha,
      (
        SELECT COUNT(*) FROM mensajes m 
        WHERE m.id_conversacion = c.id 
        AND m.leido = false 
        AND m.id_emisor != :id_usuario
      ) AS no_leidos,
      (
        SELECT json_agg(json_build_object(
          'id', m.id,
          'emisor', u.correo,
          'esOmil', (u_rol.nombre = 'admin'),
          'texto', m.texto,
          'fecha', m."createdAt",
          'leido', m.leido
        ) ORDER BY m."createdAt" ASC)
        FROM mensajes m
        JOIN usuarios u ON u.id_usuario = m.id_emisor
        JOIN roles u_rol ON u_rol.id_rol = u.id_rol
        WHERE m.id_conversacion = c.id
      ) AS mensajes
    FROM conversaciones c
    JOIN usuarios u_origen ON u_origen.id_usuario = c.id_usuario_origen
    WHERE c.id_usuario_origen = :id_usuario 
       OR c.id_usuario_destino = :id_usuario
    ORDER BY fecha DESC NULLS LAST
  `, { replacements: { id_usuario } });

  return { success: true, data: conversaciones };
};

const mensajesNoLeidosGET = async (id_usuario) => {
  const [[result]] = await sequelize.query(`
    SELECT COUNT(*) AS cantidad
    FROM mensajes m
    JOIN conversaciones c ON c.id = m.id_conversacion
    WHERE (c.id_usuario_origen = :id_usuario OR c.id_usuario_destino = :id_usuario)
    AND m.id_emisor != :id_usuario
    AND m.leido = false
  `, { replacements: { id_usuario } });

  return { success: true, data: { cantidad: parseInt(result.cantidad) } };
};

const mensajesIdGET = async (id_conversacion, id_usuario) => {
  const [[conversacion]] = await sequelize.query(`
    SELECT * FROM conversaciones 
    WHERE id = :id_conversacion
    AND (id_usuario_origen = :id_usuario OR id_usuario_destino = :id_usuario)
  `, { replacements: { id_conversacion, id_usuario } });

  if (!conversacion) return { success: false, message: 'Conversación no encontrada' };

  const [mensajes] = await sequelize.query(`
    SELECT m.*, u.correo AS emisor, r.nombre AS rol_emisor
    FROM mensajes m
    JOIN usuarios u ON u.id_usuario = m.id_emisor
    JOIN roles r ON r.id_rol = u.id_rol
    WHERE m.id_conversacion = :id_conversacion
    ORDER BY m."createdAt" ASC
  `, { replacements: { id_conversacion } });

  return { success: true, data: { ...conversacion, mensajes } };
};

const mensajesIdLeidoPATCH = async (id_conversacion, id_usuario) => {
  await sequelize.query(`
    UPDATE mensajes SET leido = true
    WHERE id_conversacion = :id_conversacion
    AND id_emisor != :id_usuario
  `, { replacements: { id_conversacion, id_usuario } });

  return { success: true, message: 'Mensajes marcados como leídos' };
};

const mensajesPOST = async (id_usuario, body) => {
  const { tipo, asunto, id_usuario_destino, texto } = body;

  const t = await sequelize.transaction();
  try {
    const [[conversacion]] = await sequelize.query(`
      INSERT INTO conversaciones (tipo, asunto, id_usuario_origen, id_usuario_destino)
      VALUES (:tipo, :asunto, :id_usuario_origen, :id_usuario_destino)
      RETURNING *
    `, { 
      replacements: { tipo, asunto, id_usuario_origen: id_usuario, id_usuario_destino },
      transaction: t
    });

    await sequelize.query(`
      INSERT INTO mensajes (id_conversacion, id_emisor, texto)
      VALUES (:id_conversacion, :id_emisor, :texto)
    `, {
      replacements: { id_conversacion: conversacion.id, id_emisor: id_usuario, texto },
      transaction: t
    });

    await t.commit();
    return { success: true, message: 'Mensaje enviado', data: conversacion };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const mensajesIdResponderPOST = async (id_conversacion, id_usuario, body) => {
  const { texto } = body;

  const [[conversacion]] = await sequelize.query(`
    SELECT * FROM conversaciones WHERE id = :id_conversacion
    AND (id_usuario_origen = :id_usuario OR id_usuario_destino = :id_usuario)
  `, { replacements: { id_conversacion, id_usuario } });

  if (!conversacion) return { success: false, message: 'Conversación no encontrada' };

  const [[mensaje]] = await sequelize.query(`
    INSERT INTO mensajes (id_conversacion, id_emisor, texto)
    VALUES (:id_conversacion, :id_emisor, :texto)
    RETURNING *
  `, { replacements: { id_conversacion, id_emisor: id_usuario, texto } });

  return { success: true, data: mensaje };
};

module.exports = {
  mensajesGET,
  mensajesNoLeidosGET,
  mensajesIdGET,
  mensajesIdLeidoPATCH,
  mensajesPOST,
  mensajesIdResponderPOST
};