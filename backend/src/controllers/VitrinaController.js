const VitrinaService = require('../services/VitrinaService');

// Ver vitrina de talentos con CV Ciego
const vitrinaGET = async (req, res) => {
  try {
    const resultado = await VitrinaService.vitrinaGET(req.query);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Ver CV Ciego de un talento específico
const vitrinaIdTalentoGET = async (req, res) => {
  try {
    const resultado = await VitrinaService.vitrinaIdTalentoGET(req.params.id_talento);
    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = {
  vitrinaGET,
  vitrinaIdTalentoGET
};