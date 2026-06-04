// =============================================
// PROVIEMPLEA - NAVBAR INTERNO
// archivo: src/components/layout/Navbar.jsx
// descripción: Barra superior limpia para el
// portal interno. Notificaciones y mensajes
// dinámicos según el rol del usuario.
// =============================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bell, MessageSquare, LogOut, ChevronDown, Shield, User, Settings, CheckCircle, AlertTriangle, Building2, FileText, Clock } from 'lucide-react';
import AccesibilidadWidget from '../ui/AccesibilidadWidget';

const notificacionesTalento = [
    { id: 1, leida: false, tipo: 'warning', titulo: 'Cuenta pendiente de validación', desc: 'La OMIL está revisando tu certificado de residencia.', tiempo: 'Hace 2 horas', accion: { label: 'Ver estado', to: '/talento/validacion' }, icon: AlertTriangle },
    { id: 2, leida: false, tipo: 'info', titulo: 'Perfil incompleto', desc: 'Completa tu experiencia laboral para aumentar tu visibilidad.', tiempo: 'Hace 5 horas', accion: { label: 'Completar perfil', to: '/talento/completar-perfil' }, icon: User },
    { id: 3, leida: false, tipo: 'success', titulo: 'Nueva empresa interesada', desc: 'Una empresa solicitó conocer tu CV Ciego.', tiempo: 'Ayer', accion: { label: 'Ver solicitud', to: '/talento/solicitudes' }, icon: Building2 },
    { id: 4, leida: true, tipo: 'primary', titulo: 'Cambio de estado', desc: 'Tu proceso cambió a etapa Entrevista.', tiempo: 'Hace 2 días', accion: { label: 'Ver proceso', to: '/talento/historial' }, icon: Clock },
    { id: 5, leida: true, tipo: 'error', titulo: 'Documento observado', desc: 'Debes volver a subir tu certificado de residencia.', tiempo: 'Hace 3 días', accion: { label: 'Subir documento', to: '/talento/archivos' }, icon: FileText },
];

const notificacionesEmpresa = [
    { id: 1, leida: false, tipo: 'success', titulo: 'Solicitud aprobada', desc: 'Tu solicitud para talento PVD-2026-154 fue aprobada por la OMIL.', tiempo: 'Hace 1 hora', accion: { label: 'Ver seguimiento', to: '/empresa/seguimiento' }, icon: CheckCircle },
    { id: 2, leida: false, tipo: 'info', titulo: 'Nuevos talentos disponibles', desc: 'Se incorporaron 15 nuevos talentos a la vitrina esta semana.', tiempo: 'Hoy', accion: { label: 'Ver vitrina', to: '/empresa/vitrina' }, icon: User },
    { id: 3, leida: true, tipo: 'primary', titulo: 'Proceso actualizado', desc: 'El talento PVD-2026-089 avanzó a etapa Entrevista.', tiempo: 'Hace 2 días', accion: { label: 'Ver proceso', to: '/empresa/seguimiento' }, icon: Clock },
];

const notificacionesAdmin = [
    { id: 1, leida: false, tipo: 'warning', titulo: '5 usuarios pendientes', desc: 'Hay 5 vecinos esperando validación de residencia.', tiempo: 'Hace 1 hora', accion: { label: 'Validar ahora', to: '/admin/talentos' }, icon: AlertTriangle },
    { id: 2, leida: false, tipo: 'info', titulo: 'Nueva solicitud empresa', desc: 'Una empresa solicitó contacto con un talento.', tiempo: 'Hace 3 horas', accion: { label: 'Ver solicitud', to: '/admin/solicitudes' }, icon: Building2 },
    { id: 3, leida: true, tipo: 'success', titulo: 'Proceso cerrado', desc: 'El proceso con talento PVD-2026-032 fue marcado como contratado.', tiempo: 'Ayer', accion: { label: 'Ver estadísticas', to: '/admin/estadisticas' }, icon: CheckCircle },
];

const coloresTipo = {
    warning: { bg: 'bg-yellow-100', text: 'text-yellow-600', dot: 'bg-yellow-400' },
    info: { bg: 'bg-blue-100', text: 'text-blue-600', dot: 'bg-blue-400' },
    success: { bg: 'bg-green-100', text: 'text-green-600', dot: 'bg-green-400' },
    primary: { bg: 'bg-sky-100', text: 'text-sky-600', dot: 'bg-sky-400' },
    error: { bg: 'bg-red-100', text: 'text-red-600', dot: 'bg-red-400' },
};

const Navbar = () => {
    const [notifAbierto, setNotifAbierto] = useState(false);
    const [submenuAbierto, setSubmenuAbierto] = useState(false);
    const { usuario, logout, esTalento, esEmpresa, esAdmin } = useAuth();
    const navigate = useNavigate();

    const getNotificaciones = () => {
        if (esEmpresa()) return notificacionesEmpresa;
        if (esAdmin()) return notificacionesAdmin;
        return notificacionesTalento;
    };

    const [notificaciones, setNotificaciones] = useState(getNotificaciones);

    const noLeidas = notificaciones.filter(n => !n.leida).length;

    const marcarTodasLeidas = () => setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })));
    const marcarLeida = (id) => setNotificaciones(prev => prev.map(n => n.id === id ? { ...n, leida: true } : n));

    const handleLogout = () => { logout(); navigate('/login'); };

    const getRolLabel = () => {
        if (esTalento()) return 'Vecino/a de Providencia';
        if (esEmpresa()) return 'Empresa';
        if (esAdmin()) return 'Funcionario OMIL';
        return '';
    };

    const getMensajesRuta = () => {
        if (esTalento()) return '/talento/mensajes';
        if (esEmpresa()) return '/empresa/mensajes';
        if (esAdmin()) return '/admin/mensajes';
        return '/';
    };

    const getConfigRuta = () => {
        if (esEmpresa()) return '/empresa/perfil';
        if (esAdmin()) return '/admin/dashboard';
        return '/talento/perfil';
    };

    return (
        <nav style={{ backgroundColor: '#0F243E' }}
            className="sticky top-0 z-50 shadow-lg"
            role="navigation" aria-label="Barra principal">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <Link to="/">
                        <img src="/images/logo-proviemplea.png" alt="ProviEmplea"
                            className="h-10 w-auto" style={{ mixBlendMode: 'screen' }} />
                    </Link>

                    <div className="flex items-center gap-2">

                        {/* Mensajes */}
                        <Link to={getMensajesRuta()}
                            className="relative p-2 rounded-lg text-gray-300 hover:bg-white/10
                hover:text-white transition-colors"
                            aria-label="Mensajes">
                            <MessageSquare className="w-5 h-5" />
                            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full
                text-white text-[9px] font-black flex items-center justify-center"
                                style={{ backgroundColor: '#4D9FC1' }}>
                                2
                            </span>
                        </Link>

                        {/* Notificaciones */}
                        <div className="relative">
                            <button
                                onClick={() => { setNotifAbierto(!notifAbierto); setSubmenuAbierto(false); }}
                                className="relative p-2 rounded-lg text-gray-300 hover:bg-white/10
                  hover:text-white transition-colors"
                                aria-label={`Notificaciones — ${noLeidas} sin leer`}
                                aria-expanded={notifAbierto}>
                                <Bell className="w-5 h-5" />
                                {noLeidas > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full
                    bg-red-500 text-white text-[9px] font-black flex items-center justify-center">
                                        {noLeidas}
                                    </span>
                                )}
                            </button>

                            {notifAbierto && (
                                <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl
                  shadow-2xl border border-slate-100 z-50 overflow-hidden">
                                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                                        <div>
                                            <h3 className="font-bold text-sm" style={{ color: '#0F243E' }}>Notificaciones</h3>
                                            <p className="text-xs text-slate-500 mt-0.5">{noLeidas} sin leer</p>
                                        </div>
                                        {noLeidas > 0 && (
                                            <button onClick={marcarTodasLeidas}
                                                className="text-xs font-semibold hover:underline"
                                                style={{ color: '#4D9FC1' }}>
                                                Marcar todas como leídas
                                            </button>
                                        )}
                                    </div>

                                    <div className="max-h-96 overflow-y-auto divide-y divide-slate-50">
                                        {notificaciones.map((notif) => {
                                            const colores = coloresTipo[notif.tipo];
                                            const Icon = notif.icon;
                                            return (
                                                <div key={notif.id}
                                                    className={`p-4 transition-colors hover:bg-slate-50 ${!notif.leida ? 'bg-blue-50/40' : ''}`}>
                                                    <div className="flex gap-3">
                                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colores.bg}`}>
                                                            <Icon className={`w-4 h-4 ${colores.text}`} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between gap-2">
                                                                <p className="text-sm font-semibold text-slate-800 leading-tight">{notif.titulo}</p>
                                                                {!notif.leida && <div className={`w-2 h-2 rounded-full shrink-0 mt-1 ${colores.dot}`} />}
                                                            </div>
                                                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notif.desc}</p>
                                                            <div className="flex items-center justify-between mt-2">
                                                                <span className="text-[10px] text-slate-400">{notif.tiempo}</span>
                                                                {notif.accion && (
                                                                    <Link to={notif.accion.to}
                                                                        onClick={() => { marcarLeida(notif.id); setNotifAbierto(false); }}
                                                                        className="text-[10px] font-bold hover:underline"
                                                                        style={{ color: '#4D9FC1' }}>
                                                                        {notif.accion.label} →
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="px-5 py-3 border-t border-slate-100 text-center">
                                        <button onClick={() => setNotifAbierto(false)}
                                            className="text-xs font-semibold hover:underline"
                                            style={{ color: '#4D9FC1' }}>
                                            Ver todas las notificaciones
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="w-px h-6 bg-white/20 mx-1" />

                        {/* Menú usuario */}
                        <div className="relative">
                            <button
                                onClick={() => { setSubmenuAbierto(!submenuAbierto); setNotifAbierto(false); }}
                                className="flex items-center gap-2.5 px-3 py-2 rounded-lg
                  text-gray-300 hover:bg-white/10 transition-colors"
                                aria-expanded={submenuAbierto}>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center
                  text-white font-bold text-sm"
                                    style={{ backgroundColor: '#4D9FC1' }}>
                                    {usuario?.correo?.charAt(0).toUpperCase()}
                                </div>
                                <div className="text-left hidden sm:block">
                                    <p className="text-xs font-semibold text-white leading-none">
                                        {usuario?.correo?.split('@')[0]}
                                    </p>
                                    <p className="text-[10px] mt-0.5" style={{ color: '#4D9FC1' }}>
                                        {getRolLabel()}
                                    </p>
                                </div>
                                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                            </button>

                            {submenuAbierto && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl
                  shadow-lg border border-slate-100 py-1 z-50">
                                    <div className="px-4 py-3 border-b border-slate-100">
                                        <p className="text-xs font-bold text-slate-800 truncate">{usuario?.correo}</p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <Shield className="w-3 h-3" style={{ color: '#4D9FC1' }} />
                                            <p className="text-xs" style={{ color: '#4D9FC1' }}>{getRolLabel()}</p>
                                        </div>
                                    </div>
                                    <Link to={getConfigRuta()}
                                        onClick={() => setSubmenuAbierto(false)}
                                        className="flex items-center gap-2 px-4 py-2.5 text-sm
                      text-slate-700 hover:bg-slate-50 transition-colors">
                                        <Settings className="w-4 h-4 text-slate-400" />
                                        Configuración
                                    </Link>
                                    <div className="border-t border-slate-100 mt-1" />
                                    <button onClick={handleLogout}
                                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm
                      text-red-600 hover:bg-red-50 transition-colors">
                                        <LogOut className="w-4 h-4" />
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Widget Accesibilidad */}
            <AccesibilidadWidget />
        </nav>
    );
};

export default Navbar;