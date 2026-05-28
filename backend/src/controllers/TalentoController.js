const TalentoService = require('../services/TalentoService');

// Ver mi perfil completo
const talentosPerfilGET = async (req, res) => {
  try {
    const resultado = await TalentoService.talentosPerfilGET(req.usuario.id_usuario);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Actualizar mi perfil
const talentosPerfilPUT = async (req, res) => {
  try {
    const resultado = await TalentoService.talentosPerfilPUT(req.usuario.id_usuario, req.body);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Agregar educación
const talentosEducacionPOST = async (req, res) => {
  try {
    const resultado = await TalentoService.talentosEducacionPOST(req.usuario.id_usuario, req.body);
    res.status(201).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Actualizar educación
const talentosEducacionIdEducacionPUT = async (req, res) => {
  try {
    const resultado = await TalentoService.talentosEducacionIdEducacionPUT(req.params.id_educacion, req.body);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Eliminar educación
const talentosEducacionIdEducacionDELETE = async (req, res) => {
  try {
    const resultado = await TalentoService.talentosEducacionIdEducacionDELETE(req.params.id_educacion);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Agregar experiencia laboral
const talentosLaboralPOST = async (req, res) => {
  try {
    const resultado = await TalentoService.talentosLaboralPOST(req.usuario.id_usuario, req.body);
    res.status(201).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Actualizar experiencia laboral
const talentosLaboralIdLaboralPUT = async (req, res) => {
  try {
    const resultado = await TalentoService.talentosLaboralIdLaboralPUT(req.params.id_laboral, req.body);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Eliminar experiencia laboral
const talentosLaboralIdLaboralDELETE = async (req, res) => {
  try {
    const resultado = await TalentoService.talentosLaboralIdLaboralDELETE(req.params.id_laboral);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Actualizar competencias
const talentosCompetenciasPUT = async (req, res) => {
  try {
    const resultado = await TalentoService.talentosCompetenciasPUT(req.usuario.id_usuario, req.body);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Actualizar idiomas
const talentosIdiomasPUT = async (req, res) => {
  try {
    const resultado = await TalentoService.talentosIdiomasPUT(req.usuario.id_usuario, req.body);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = {
  talentosPerfilGET,
  talentosPerfilPUT,
  talentosEducacionPOST,
  talentosEducacionIdEducacionPUT,
  talentosEducacionIdEducacionDELETE,
  talentosLaboralPOST,
  talentosLaboralIdLaboralPUT,
  talentosLaboralIdLaboralDELETE,
  talentosCompetenciasPUT,
  talentosIdiomasPUT
};