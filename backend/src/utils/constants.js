// Constantes globales del sistema

const ROLES = {
  ADMIN: 1,
  TALENTO: 2,
  EMPRESA: 3
};

const ESTADOS_VALIDACION = {
  PENDIENTE: 'Pendiente',
  APROBADO: 'Aprobado',
  RECHAZADO: 'Rechazado'
};

const ESTADOS_SOLICITUD = {
  SOLICITADO: 1,
  CONTACTADO: 2,
  ENTREVISTA: 3,
  SELECCIONADO: 4,
  NO_SELECCIONADO: 5,
  CERRADO: 6
};

const TIPOS_DOCUMENTO = {
  CV: 'cv',
  COMPROBANTE_RESIDENCIA: 'comprobante_residencia',
  CERTIFICADO: 'certificado'
};

module.exports = {
  ROLES,
  ESTADOS_VALIDACION,
  ESTADOS_SOLICITUD,
  TIPOS_DOCUMENTO
};