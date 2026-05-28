const express = require('express');
const router = express.Router();
const EmpresaController = require('../controllers/EmpresaController');
const { verificarToken } = require('../middleware/auth');

// Todas las rutas de empresas requieren token JWT
router.get('/perfil', verificarToken, EmpresaController.empresasPerfilGET);
router.put('/perfil', verificarToken, EmpresaController.empresasPerfilPUT);
router.get('/usuarios', verificarToken, EmpresaController.empresasUsuariosGET);
router.post('/usuarios', verificarToken, EmpresaController.empresasUsuariosPOST);
router.delete('/usuarios/:id_usuario', verificarToken, EmpresaController.empresasUsuariosIdUsuarioDELETE);
router.get('/solicitudes', verificarToken, EmpresaController.empresasSolicitudesGET);

module.exports = router;