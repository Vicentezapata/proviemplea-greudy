const express = require('express');
const router = express.Router();
const EmpresaController = require('../controllers/EmpresaController');
const { verificarToken } = require('../middleware/auth');
const {
  validarPerfilEmpresa,
  validarUsuarioEmpresa,
  validarIdUsuario
} = require('../validators/empresa.validator');

router.get('/perfil', verificarToken, EmpresaController.empresasPerfilGET);
router.put('/perfil', verificarToken, validarPerfilEmpresa, EmpresaController.empresasPerfilPUT);
router.get('/usuarios', verificarToken, EmpresaController.empresasUsuariosGET);
router.post('/usuarios', verificarToken, validarUsuarioEmpresa, EmpresaController.empresasUsuariosPOST);
router.delete('/usuarios/:id_usuario', verificarToken, validarIdUsuario, EmpresaController.empresasUsuariosIdUsuarioDELETE);
router.get('/solicitudes', verificarToken, EmpresaController.empresasSolicitudesGET);

module.exports = router;