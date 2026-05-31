const express = require('express');
const router = express.Router();
const ArchivoController = require('../controllers/ArchivoController');
const { verificarToken } = require('../middleware/auth');
const { verificarRol } = require('../middleware/roles');
const upload = require('../config/multer');

// Solo talentos pueden subir y gestionar sus archivos
router.post(
  '/subir',
  verificarToken,
  verificarRol('talento'),
  upload.single('archivo'),
  ArchivoController.subirArchivo
);

router.get(
  '/',
  verificarToken,
  verificarRol('talento'),
  ArchivoController.obtenerArchivos
);

router.delete(
  '/:id_archivo',
  verificarToken,
  verificarRol('talento'),
  ArchivoController.eliminarArchivo
);

module.exports = router;