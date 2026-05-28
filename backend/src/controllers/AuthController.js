const AuthService = require('../services/AuthService');

// Controlador de autenticación — recibe el request, llama al servicio y responde

const authLoginPOST = async (req, res) => {
  try {
    const resultado = await AuthService.authLoginPOST({
      authLoginPostRequest: req.body
    });

    const status = resultado.success ? 200 : 401;
    res.status(status).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const authRegisterTalentoPOST = async (req, res) => {
  try {
    const resultado = await AuthService.authRegisterTalentoPOST({
      authRegisterTalentoPostRequest: req.body
    });

    const status = resultado.success ? 201 : 409;
    res.status(status).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const authRegisterEmpresaPOST = async (req, res) => {
  try {
    const resultado = await AuthService.authRegisterEmpresaPOST({
      authRegisterEmpresaPostRequest: req.body
    });

    const status = resultado.success ? 201 : 409;
    res.status(status).json(resultado);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = {
  authLoginPOST,
  authRegisterTalentoPOST,
  authRegisterEmpresaPOST
};