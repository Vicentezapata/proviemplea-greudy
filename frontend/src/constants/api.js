// =============================================
// PROVIEMPLEA - CONSTANTES GLOBALES
// archivo: src/constants/api.js
// descripción: Define la URL base del backend,
// roles del sistema, estados de solicitud y
// catálogos estáticos usados en formularios.
// Centralizar aquí evita magic strings dispersos
// en el código y facilita el mantenimiento.
// =============================================

// URL base del backend de Greudy
export const API_BASE_URL = 'http://localhost:3000/api/v1';

// ── Roles del sistema ──
// Deben coincidir con los id_rol de la tabla usuarios
export const ROLES = {
    ADMIN: 1,
    TALENTO: 2,
    EMPRESA: 3,
};

// ── Estados de solicitud de contacto ──
// Representan el ciclo de vida de una solicitud empresa → talento
export const ESTADOS_SOLICITUD = {
    1: { label: 'Solicitado', color: 'bg-blue-100 text-blue-800' },
    2: { label: 'Contactado', color: 'bg-yellow-100 text-yellow-800' },
    3: { label: 'Entrevista', color: 'bg-purple-100 text-purple-800' },
    4: { label: 'Seleccionado', color: 'bg-green-100 text-green-800' },
    5: { label: 'No seleccionado', color: 'bg-red-100 text-red-800' },
    6: { label: 'Cerrado', color: 'bg-slate-100 text-slate-600' },
};

// ── Jornadas laborales ──
export const JORNADAS = [
    { value: 'completa', label: 'Jornada completa' },
    { value: 'parcial', label: 'Media jornada' },
    { value: 'por_horas', label: 'Por turnos' },
    { value: 'cualquiera', label: 'Sin preferencia' },
];

// ── Modalidades de trabajo ──
export const MODALIDADES = [
    { value: 'presencial', label: 'Presencial' },
    { value: 'remoto', label: 'Teletrabajo' },
    { value: 'hibrido', label: 'Híbrido' },
    { value: 'cualquiera', label: 'Sin preferencia' },
];

// ── Niveles educacionales ──
export const NIVELES_EDUCACION = [
    'Educación Básica',
    'Educación Media',
    'Técnico Superior',
    'Universitaria Incompleta',
    'Universitaria Completa',
    'Postgrado',
    'Magíster',
    'Doctorado',
];

// ── Niveles de idioma ──
export const NIVELES_IDIOMA = [
    'Básico',
    'Intermedio',
    'Avanzado',
    'Nativo',
];

// ── Tipos de documento ──
export const TIPOS_DOCUMENTO = [
    { value: 'comprobante_residencia', label: 'Certificado de residencia' },
    { value: 'cv', label: 'Currículum Vitae' },
    { value: 'certificado_estudios', label: 'Certificado de estudios' },
    { value: 'otros', label: 'Otro documento' },
];

// ==================== MENSAJES ====================
// Servicio de mensajería institucional
// Cuando Greudy implemente los endpoints,
// descomentar las llamadas reales y eliminar
// los datos hardcodeados de cada página de mensajes

export const mensajesService = {

    // Obtener todas las conversaciones del usuario logueado
    getConversaciones: () =>
        api.get('/mensajes'),

    // Obtener detalle de una conversación con sus mensajes
    getConversacion: (id) =>
        api.get(`/mensajes/${id}`),

    // Crear nueva conversación
    crearConversacion: (datos) =>
        api.post('/mensajes', datos),
    // datos = { asunto, tipo, texto, id_usuario_destino }

    // Responder en una conversación existente
    responder: (id, texto) =>
        api.post(`/mensajes/${id}/responder`, { texto }),

    // Marcar conversación como leída
    marcarLeida: (id) =>
        api.patch(`/mensajes/${id}/leido`),

    // Obtener cantidad de mensajes sin leer (para badge navbar)
    getNoLeidos: () =>
        api.get('/mensajes/no-leidos'),
};

