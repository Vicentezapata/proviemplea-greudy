const express = require('express');
const router = express.Router();
const SolicitudController = require('../controllers/SolicitudController');
const { verificarToken } = require('../middleware/auth');

// Rutas de solicitudes — requieren token JWT
router.post('/', verificarToken, SolicitudController.solicitudesPOST);
router.get('/:id_solicitud', verificarToken, SolicitudController.solicitudesIdSolicitudGET);
router.patch('/:id_solicitud/estado', verificarToken, SolicitudController.solicitudesIdSolicitudEstadoPATCH);
router.put('/:id_solicitud/notas', verificarToken, SolicitudController.solicitudesIdSolicitudNotasPUT);

module.exports = router;