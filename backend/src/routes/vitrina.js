const express = require('express');
const router = express.Router();
const VitrinaController = require('../controllers/VitrinaController');
const { verificarToken } = require('../middleware/auth');

// Rutas de vitrina — requieren token JWT
router.get('/', verificarToken, VitrinaController.vitrinaGET);
router.get('/:id_talento', verificarToken, VitrinaController.vitrinaIdTalentoGET);

module.exports = router;