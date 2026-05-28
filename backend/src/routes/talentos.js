const express = require('express');
const router = express.Router();
const TalentoController = require('../controllers/TalentoController');
const { verificarToken } = require('../middleware/auth');

// Todas las rutas de talentos requieren token JWT
router.get('/perfil', verificarToken, TalentoController.talentosPerfilGET);
router.put('/perfil', verificarToken, TalentoController.talentosPerfilPUT);
router.post('/educacion', verificarToken, TalentoController.talentosEducacionPOST);
router.put('/educacion/:id_educacion', verificarToken, TalentoController.talentosEducacionIdEducacionPUT);
router.delete('/educacion/:id_educacion', verificarToken, TalentoController.talentosEducacionIdEducacionDELETE);
router.post('/laboral', verificarToken, TalentoController.talentosLaboralPOST);
router.put('/laboral/:id_laboral', verificarToken, TalentoController.talentosLaboralIdLaboralPUT);
router.delete('/laboral/:id_laboral', verificarToken, TalentoController.talentosLaboralIdLaboralDELETE);
router.put('/competencias', verificarToken, TalentoController.talentosCompetenciasPUT);
router.put('/idiomas', verificarToken, TalentoController.talentosIdiomasPUT);

module.exports = router;