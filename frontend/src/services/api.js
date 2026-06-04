// =============================================
// PROVIEMPLEA - SERVICIO DE API
// archivo: src/services/api.js
// descripción: Configura axios con la URL base
// del backend. Agrega el token JWT en cada
// petición automáticamente y maneja errores
// HTTP de forma global y centralizada.
// =============================================

import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
});

// Agrega el token JWT en cada petición
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Si el token expira limpia sesión y redirige al login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ==================== AUTH ====================
export const authService = {
    login: (datos) => api.post('/auth/login', datos),
    registrarTalento: (datos) => api.post('/auth/register/talento', datos),
    registrarEmpresa: (datos) => api.post('/auth/register/empresa', datos),
};

// ==================== CATÁLOGOS ====================
export const catalogoService = {
    getRubros: () => api.get('/catalogos/rubros'),
    getCompetencias: () => api.get('/catalogos/competencias'),
    getIdiomas: () => api.get('/catalogos/idiomas'),
    getRangosRenta: () => api.get('/catalogos/rangos-renta'),
    getEstadosSeguimiento: () => api.get('/catalogos/estados-seguimiento'),
};

// ==================== TALENTOS ====================
export const talentoService = {
    getPerfil: () => api.get('/talentos/perfil'),
    updatePerfil: (datos) => api.put('/talentos/perfil', datos),
    addEducacion: (datos) => api.post('/talentos/educacion', datos),
    updateEducacion: (id, datos) => api.put(`/talentos/educacion/${id}`, datos),
    deleteEducacion: (id) => api.delete(`/talentos/educacion/${id}`),
    addLaboral: (datos) => api.post('/talentos/laboral', datos),
    updateLaboral: (id, datos) => api.put(`/talentos/laboral/${id}`, datos),
    deleteLaboral: (id) => api.delete(`/talentos/laboral/${id}`),
    updateCompetencias: (datos) => api.put('/talentos/competencias', datos),
    updateIdiomas: (datos) => api.put('/talentos/idiomas', datos),
    getMisSolicitudes: () => api.get('/talentos/solicitudes'),
    getEstadisticas: () => api.get('/talentos/estadisticas'),
    getHistorial: () => api.get('/talentos/historial'),
};

// ==================== PERFECCIONAMIENTO ====================
export const perfeccionamientoService = {
    getMisCursos: () => api.get('/perfeccionamiento'),
    addCurso: (datos) => api.post('/perfeccionamiento', datos),
    updateCurso: (id, datos) => api.put(`/perfeccionamiento/${id}`, datos),
    deleteCurso: (id) => api.delete(`/perfeccionamiento/${id}`),
};

// ==================== ARCHIVOS ====================
export const archivoService = {
    getMisArchivos: () => api.get('/archivos'),
    subirArchivo: (formData) => api.post('/archivos/subir', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    eliminarArchivo: (id) => api.delete(`/archivos/${id}`),
};

// ==================== VITRINA ====================
export const vitrinaService = {
    getTalentos: (filtros) => api.get('/vitrina', { params: filtros }),
    getTalento: (id) => api.get(`/vitrina/${id}`),
};

// ==================== EMPRESAS ====================
export const empresaService = {
    getPerfil: () => api.get('/empresas/perfil'),
    updatePerfil: (datos) => api.put('/empresas/perfil', datos),
    getUsuarios: () => api.get('/empresas/usuarios'),
    addUsuario: (datos) => api.post('/empresas/usuarios', datos),
    deleteUsuario: (id) => api.delete(`/empresas/usuarios/${id}`),
    getSolicitudes: () => api.get('/empresas/solicitudes'),
};

// ==================== SOLICITUDES ====================
export const solicitudService = {
    crear: (datos) => api.post('/solicitudes', datos),
    getDetalle: (id) => api.get(`/solicitudes/${id}`),
    updateEstado: (id, datos) => api.patch(`/solicitudes/${id}/estado`, datos),
    updateNotas: (id, datos) => api.put(`/solicitudes/${id}/notas`, datos),
};

// ==================== ADMIN ====================
export const adminService = {
    getUsuarios: (filtros) => api.get('/admin/usuarios', { params: filtros }),
    validarUsuario: (id, datos) => api.patch(`/admin/usuarios/${id}/validar`, datos),
    getTalentos: (filtros) => api.get('/admin/talentos', { params: filtros }),
    marcarContratado: (id, datos) => api.patch(`/admin/talentos/${id}/contratado`, datos),
    getEmpresas: () => api.get('/admin/empresas'),
    getSolicitudes: (filtros) => api.get('/admin/solicitudes', { params: filtros }),
    getEstadisticas: () => api.get('/admin/estadisticas'),
};

export default api;