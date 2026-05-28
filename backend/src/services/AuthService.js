const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Genera un token JWT con el id y rol del usuario
const generarToken = (usuario) => {
  return jwt.sign(
    { id_usuario: usuario.id_usuario, id_rol: usuario.id_rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Login de usuario
const authLoginPOST = async ({ authLoginPostRequest }) => {
  const { correo, password } = authLoginPostRequest;

  const usuario = await Usuario.findOne({ where: { correo } });
  if (!usuario) {
    return { success: false, message: 'Correo o contraseña incorrectos' };
  }

  const passwordValida = await bcrypt.compare(password, usuario.password_hash);
  if (!passwordValida) {
    return { success: false, message: 'Correo o contraseña incorrectos' };
  }

  const token = generarToken(usuario);

  return {
    success: true,
    message: 'Login exitoso',
    data: {
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        correo: usuario.correo,
        id_rol: usuario.id_rol
      }
    }
  };
};

// Registro de talento
const authRegisterTalentoPOST = async ({ authRegisterTalentoPostRequest }) => {
  const { correo, password } = authRegisterTalentoPostRequest;

  const existe = await Usuario.findOne({ where: { correo } });
  if (existe) {
    return { success: false, message: 'El correo ya está registrado' };
  }

  const password_hash = await bcrypt.hash(password, 10);

  const usuario = await Usuario.create({
    correo,
    password_hash,
    id_rol: 2,
    estado_validacion: 'Pendiente'
  });

  return {
    success: true,
    message: 'Registro exitoso. Tu cuenta será validada por el equipo municipal.',
    data: {
      id_usuario: usuario.id_usuario,
      correo: usuario.correo,
      estado_validacion: usuario.estado_validacion
    }
  };
};

// Registro de empresa con rollback
const authRegisterEmpresaPOST = async ({ authRegisterEmpresaPostRequest }) => {
  const { correo, password, rut_empresa, nombre_empresa, id_rubro, id_tipo_empresa } = authRegisterEmpresaPostRequest;
  const sequelize = require('../config/connection');

  // Verifico si el correo ya existe
  const existe = await Usuario.findOne({ where: { correo } });
  if (existe) {
    return { success: false, message: 'El correo ya está registrado' };
  }

  const t = await sequelize.transaction();

  try {
    const password_hash = await bcrypt.hash(password, 10);

    // 1. Creo el usuario
    const usuario = await Usuario.create({
      correo,
      password_hash,
      id_rol: 3,
      estado_validacion: 'Aprobado'
    }, { transaction: t });

    // 2. Creo la empresa
    const [empresaResult] = await sequelize.query(`
      INSERT INTO empresas (rut_empresa, nombre_empresa, id_rubro, id_tipo_empresa)
      VALUES ('${rut_empresa}', '${nombre_empresa}', ${id_rubro || 1}, ${id_tipo_empresa || 1})
      RETURNING id_empresa
    `, { transaction: t });

    // 3. Vinculo usuario con empresa
    await sequelize.query(`
      INSERT INTO usuarios_empresa (id_usuario, id_empresa, nombre_completo)
      VALUES ('${usuario.id_usuario}', '${empresaResult[0].id_empresa}', '${nombre_empresa}')
    `, { transaction: t });

    await t.commit();

    return {
      success: true,
      message: 'Empresa registrada exitosamente.',
      data: {
        id_usuario: usuario.id_usuario,
        correo: usuario.correo
      }
    };

  } catch (error) {
    await t.rollback();
    throw error;
  }
};

module.exports = {
  authLoginPOST,
  authRegisterTalentoPOST,
  authRegisterEmpresaPOST
};