const express = require('express');
const router = express.Router();
const VitrinaController = require('../controllers/VitrinaController');
const { verificarToken } = require('../middleware/auth');
const { verificarRol } = require('../middleware/roles');

// Vitrina solo accesible para empresas y admins
router.get('/', verificarToken, verificarRol('empresa', 'admin'), VitrinaController.vitrinaGET);
router.get('/:id_talento', verificarToken, verificarRol('empresa', 'admin'), VitrinaController.vitrinaIdTalentoGET);

module.exports = router;