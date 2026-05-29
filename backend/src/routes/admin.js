const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const { verificarToken } = require('../middleware/auth');

// Todas las rutas de admin requieren token JWT
router.get('/usuarios', verificarToken, AdminController.adminUsuariosGET);
router.patch('/usuarios/:id_usuario/validar', verificarToken, AdminController.adminUsuariosIdUsuarioValidarPATCH);
router.get('/talentos', verificarToken, AdminController.adminTalentosGET);
router.patch('/talentos/:id_talento/contratado', verificarToken, AdminController.adminTalentosIdTalentoContratadoPATCH);
router.get('/empresas', verificarToken, AdminController.adminEmpresasGET);
router.get('/solicitudes', verificarToken, AdminController.adminSolicitudesGET);
router.get('/estadisticas', verificarToken, AdminController.adminEstadisticasGET);

module.exports = router;