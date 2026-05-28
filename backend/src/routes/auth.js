const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Rutas de autenticación
router.post('/login', AuthController.authLoginPOST);
router.post('/register/talento', AuthController.authRegisterTalentoPOST);
router.post('/register/empresa', AuthController.authRegisterEmpresaPOST);

module.exports = router;