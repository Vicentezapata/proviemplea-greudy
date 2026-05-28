const express = require('express');
const router = express.Router();
const CatalogoController = require('../controllers/CatalogoController');

// Rutas de catálogos — públicas, no requieren token
router.get('/rubros', CatalogoController.catalogosRubrosGET);
router.get('/competencias', CatalogoController.catalogosCompetenciasGET);
router.get('/idiomas', CatalogoController.catalogosIdiomasGET);
router.get('/rangos-renta', CatalogoController.catalogosRangosRentaGET);
router.get('/estados-seguimiento', CatalogoController.catalogosEstadosSeguimientoGET);

module.exports = router;