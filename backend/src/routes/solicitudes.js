const express = require('express');
const router = express.Router();
const SolicitudController = require('../controllers/SolicitudController');
const { verificarToken } = require('../middleware/auth');
const {
  validarCrearSolicitud,
  validarEstadoSolicitud,
  validarNotasSolicitud,
  validarIdSolicitud
} = require('../validators/solicitud.validator');

router.post('/', verificarToken, validarCrearSolicitud, SolicitudController.solicitudesPOST);
router.get('/:id_solicitud', verificarToken, validarIdSolicitud, SolicitudController.solicitudesIdSolicitudGET);
router.patch('/:id_solicitud/estado', verificarToken, validarEstadoSolicitud, SolicitudController.solicitudesIdSolicitudEstadoPATCH);
router.put('/:id_solicitud/notas', verificarToken, validarNotasSolicitud, SolicitudController.solicitudesIdSolicitudNotasPUT);

module.exports = router;