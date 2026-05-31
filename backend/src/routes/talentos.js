const express = require('express');
const router = express.Router();
const TalentoController = require('../controllers/TalentoController');
const { verificarToken } = require('../middleware/auth');
const {
  validarPerfilTalento,
  validarEducacion,
  validarLaboral,
  validarCompetencias,
  validarIdiomas,
  validarIdUUID
} = require('../validators/talento.validator');

router.get('/perfil', verificarToken, TalentoController.talentosPerfilGET);
router.put('/perfil', verificarToken, validarPerfilTalento, TalentoController.talentosPerfilPUT);
router.post('/educacion', verificarToken, validarEducacion, TalentoController.talentosEducacionPOST);
router.put('/educacion/:id_educacion', verificarToken, validarIdUUID, validarEducacion, TalentoController.talentosEducacionIdEducacionPUT);
router.delete('/educacion/:id_educacion', verificarToken, validarIdUUID, TalentoController.talentosEducacionIdEducacionDELETE);
router.post('/laboral', verificarToken, validarLaboral, TalentoController.talentosLaboralPOST);
router.put('/laboral/:id_laboral', verificarToken, validarIdUUID, validarLaboral, TalentoController.talentosLaboralIdLaboralPUT);
router.delete('/laboral/:id_laboral', verificarToken, validarIdUUID, TalentoController.talentosLaboralIdLaboralDELETE);
router.put('/competencias', verificarToken, validarCompetencias, TalentoController.talentosCompetenciasPUT);
router.put('/idiomas', verificarToken, validarIdiomas, TalentoController.talentosIdiomasPUT);

module.exports = router;