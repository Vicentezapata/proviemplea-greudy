const express = require('express');
const router = express.Router();
const PerfeccionamientoController = require('../controllers/PerfeccionamientoController');
const { verificarToken } = require('../middleware/auth');

router.get('/', verificarToken, PerfeccionamientoController.perfeccionamientoGET);
router.post('/', verificarToken, PerfeccionamientoController.perfeccionamientoPOST);
router.put('/:id_perfeccionamiento', verificarToken, PerfeccionamientoController.perfeccionamientoIdPUT);
router.delete('/:id_perfeccionamiento', verificarToken, PerfeccionamientoController.perfeccionamientoIdDELETE);

module.exports = router;