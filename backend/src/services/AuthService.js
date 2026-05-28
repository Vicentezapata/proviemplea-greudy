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

// Registro de empresa
const authRegisterEmpresaPOST = async ({ authRegisterEmpresaPostRequest }) => {
  const { correo, password } = authRegisterEmpresaPostRequest;

  const existe = await Usuario.findOne({ where: { correo } });
  if (existe) {
    return { success: false, message: 'El correo ya está registrado' };
  }

  const password_hash = await bcrypt.hash(password, 10);

  const usuario = await Usuario.create({
    correo,
    password_hash,
    id_rol: 3,
    estado_validacion: 'Pendiente'
  });

  return {
    success: true,
    message: 'Empresa registrada exitosamente.',
    data: {
      id_usuario: usuario.id_usuario,
      correo: usuario.correo
    }
  };
};

module.exports = {
  authLoginPOST,
  authRegisterTalentoPOST,
  authRegisterEmpresaPOST
};