const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { validarLogin, validarRegistroTalento, validarRegistroEmpresa } = require('../validators/auth.validator');

// Rutas de autenticación con validaciones
router.post('/login', validarLogin, AuthController.authLoginPOST);
router.post('/register/talento', validarRegistroTalento, AuthController.authRegisterTalentoPOST);
router.post('/register/empresa', validarRegistroEmpresa, AuthController.authRegisterEmpresaPOST);

module.exports = router;