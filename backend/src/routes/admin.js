const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const { verificarToken } = require('../middleware/auth');
const { verificarRol } = require('../middleware/roles');

// Todas las rutas de admin requieren token JWT y rol admin
router.get('/usuarios', verificarToken, verificarRol('admin'), AdminController.adminUsuariosGET);
router.patch('/usuarios/:id_usuario/validar', verificarToken, verificarRol('admin'), AdminController.adminUsuariosIdUsuarioValidarPATCH);
router.get('/talentos', verificarToken, verificarRol('admin'), AdminController.adminTalentosGET);
router.patch('/talentos/:id_talento/contratado', verificarToken, verificarRol('admin'), AdminController.adminTalentosIdTalentoContratadoPATCH);
router.get('/empresas', verificarToken, verificarRol('admin'), AdminController.adminEmpresasGET);
router.get('/solicitudes', verificarToken, verificarRol('admin'), AdminController.adminSolicitudesGET);
router.get('/estadisticas', verificarToken, verificarRol('admin'), AdminController.adminEstadisticasGET);

module.exports = router;