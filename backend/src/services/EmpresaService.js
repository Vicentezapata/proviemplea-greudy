const sequelize = require('../config/connection');
const Empresa = require('../models/Empresa');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

const empresasPerfilGET = async (id_usuario) => {
  const [empresa] = await sequelize.query(
    `SELECT e.*, r.nombre as rubro, t.nombre as tipo_empresa
     FROM empresas e
     LEFT JOIN rubros_empresa r ON e.id_rubro = r.id_rubro
     LEFT JOIN tipos_empresa t ON e.id_tipo_empresa = t.id_tipo
     INNER JOIN usuarios_empresa ue ON e.id_empresa = ue.id_empresa
     WHERE ue.id_usuario = :id_usuario AND e.fecha_eliminacion IS NULL`,
    { replacements: { id_usuario } }
  );
  if (!empresa.length) return { success: false, message: 'Empresa no encontrada' };
  return { success: true, data: empresa[0] };
};

const empresasPerfilPUT = async (id_usuario, body) => {
  const { nombre_empresa, presentacion, beneficios, id_rubro, id_tipo_empresa } = body;
  const [empresa] = await sequelize.query(
    `SELECT e.id_empresa FROM empresas e
     INNER JOIN usuarios_empresa ue ON e.id_empresa = ue.id_empresa
     WHERE ue.id_usuario = :id_usuario`,
    { replacements: { id_usuario } }
  );
  if (!empresa.length) return { success: false, message: 'Empresa no encontrada' };
  await Empresa.update(
    { nombre_empresa, presentacion, beneficios, id_rubro, id_tipo_empresa },
    { where: { id_empresa: empresa[0].id_empresa } }
  );
  return { success: true, message: 'Perfil actualizado exitosamente' };
};

const empresasUsuariosGET = async (id_usuario) => {
  const [usuarios] = await sequelize.query(
    `SELECT ue.*, u.correo, u.estado_validacion
     FROM usuarios_empresa ue
     INNER JOIN usuarios u ON ue.id_usuario = u.id_usuario
     WHERE ue.id_empresa = (
       SELECT id_empresa FROM usuarios_empresa WHERE id_usuario = :id_usuario
     )`,
    { replacements: { id_usuario } }
  );
  return { success: true, data: usuarios };
};

const empresasUsuariosPOST = async (id_usuario, body) => {
  const { correo, password, nombre_completo, telefono_contacto } = body;
  const existe = await Usuario.findOne({ where: { correo } });
  if (existe) return { success: false, message: 'El correo ya está registrado' };
  const [empresaRow] = await sequelize.query(
    `SELECT id_empresa FROM usuarios_empresa WHERE id_usuario = :id_usuario`,
    { replacements: { id_usuario } }
  );
  if (!empresaRow.length) return { success: false, message: 'Empresa no encontrada' };
  const password_hash = await bcrypt.hash(password, 10);
  const nuevoUsuario = await Usuario.create({
    correo,
    password_hash,
    id_rol: 3,
    estado_validacion: 'Aprobado'
  });
  await sequelize.query(
    `INSERT INTO usuarios_empresa (id_usuario, id_empresa, nombre_completo, telefono_contacto)
     VALUES (:id_usuario, :id_empresa, :nombre_completo, :telefono_contacto)`,
    { replacements: { id_usuario: nuevoUsuario.id_usuario, id_empresa: empresaRow[0].id_empresa, nombre_completo, telefono_contacto: telefono_contacto || '' } }
  );
  return { success: true, message: 'Usuario creado exitosamente' };
};

const empresasUsuariosIdUsuarioDELETE = async (id_usuario_eliminar) => {
  await Usuario.update(
    { fecha_eliminacion: new Date() },
    { where: { id_usuario: id_usuario_eliminar } }
  );
  return { success: true, message: 'Usuario eliminado exitosamente' };
};

const empresasSolicitudesGET = async (id_usuario) => {
  const [solicitudes] = await sequelize.query(
    `SELECT st.*, es.nombre as estado
     FROM solicitudes_talento st
     INNER JOIN estados_seguimiento es ON st.id_estado = es.id_estado
     INNER JOIN usuarios_empresa ue ON st.id_empresa = ue.id_empresa
     WHERE ue.id_usuario = :id_usuario
     ORDER BY st.fecha_solicitud DESC`,
    { replacements: { id_usuario } }
  );
  return { success: true, data: solicitudes };
};

module.exports = {
  empresasPerfilGET,
  empresasPerfilPUT,
  empresasUsuariosGET,
  empresasUsuariosPOST,
  empresasUsuariosIdUsuarioDELETE,
  empresasSolicitudesGET
};