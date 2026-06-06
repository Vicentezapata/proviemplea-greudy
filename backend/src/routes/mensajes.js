const express = require('express');
const router = express.Router();
const MensajeController = require('../controllers/MensajeController');
const { verificarToken } = require('../middleware/auth');

router.get('/no-leidos', verificarToken, MensajeController.mensajesNoLeidosGET);
router.get('/', verificarToken, MensajeController.mensajesGET);
router.get('/:id', verificarToken, MensajeController.mensajesIdGET);
router.post('/', verificarToken, MensajeController.mensajesPOST);
router.patch('/:id/leido', verificarToken, MensajeController.mensajesIdLeidoPATCH);
router.post('/:id/responder', verificarToken, MensajeController.mensajesIdResponderPOST);

module.exports = router;