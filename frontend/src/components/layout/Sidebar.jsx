// =============================================
// PROVIEMPLEA - SIDEBAR
// archivo: src/components/layout/Sidebar.jsx
// descripción: Navegación principal del portal
// interno. Se adapta según el rol del usuario.
// Es la navegación principal — el Navbar solo
// tiene logo, notificaciones y menú de usuario.
// =============================================

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    Home, User, FileText, Inbox, Clock,
    Download, MessageSquare, Settings, HelpCircle,
    Eye, Users, Building2, Send, ShieldCheck,
    BarChart3, LayoutDashboard,
} from 'lucide-react';

const linksTalento = [
    { to: '/talento/dashboard', label: 'Dashboard', icon: Home },
    { to: '/talento/perfil', label: 'Mi Perfil', icon: User },
    { to: '/talento/cv-ciego', label: 'CV Ciego', icon: Eye },
    { to: '/talento/solicitudes', label: 'Mis Solicitudes', icon: Inbox },
    { to: '/talento/historial', label: 'Historial', icon: Clock },
    { to: '/talento/archivos', label: 'Mis Archivos', icon: Download },
    { to: '/talento/mensajes', label: 'Mensajes', icon: MessageSquare, badge: 2 },
    { to: '/talento/completar-perfil', label: 'Completar Perfil', icon: Settings },
    { to: '/talento/ayuda', label: 'Ayuda', icon: HelpCircle },
];

const linksEmpresa = [
    { to: '/empresa/dashboard', label: 'Dashboard', icon: Home },
    { to: '/empresa/vitrina', label: 'Vitrina', icon: Eye },
    { to: '/empresa/seguimiento', label: 'Seguimiento', icon: Users },
    { to: '/empresa/historial', label: 'Historial', icon: Clock },
    { to: '/empresa/perfil', label: 'Mi Empresa', icon: Building2 },
    { to: '/empresa/mensajes', label: 'Mensajes', icon: MessageSquare, badge: 1 },
];

const linksAdmin = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/talentos', label: 'Talentos', icon: Users },
    { to: '/admin/empresas', label: 'Empresas', icon: Building2 },
    { to: '/admin/solicitudes', label: 'Solicitudes', icon: Inbox },
    { to: '/admin/envio-talentos', label: 'Envío Talentos', icon: Send },
    { to: '/admin/seguimiento', label: 'Seguimiento', icon: ShieldCheck },
    { to: '/admin/estadisticas', label: 'Estadísticas', icon: BarChart3 },
    { to: '/admin/exportacion', label: 'Exportación', icon: Download },
    { to: '/admin/mensajes', label: 'Mensajes', icon: MessageSquare, badge: 3 },
];

const Sidebar = () => {
    const { esTalento, esEmpresa, esAdmin } = useAuth();
    const location = useLocation();

    const links = esTalento() ? linksTalento
        : esEmpresa() ? linksEmpresa
            : esAdmin() ? linksAdmin
                : [];

    const moduloLabel = esTalento() ? 'Portal Vecinos'
        : esEmpresa() ? 'Portal Empresas'
            : 'Mesa Control OMIL';

    const esActivo = (path) => location.pathname === path;

    return (
        <aside className="hidden lg:flex flex-col w-60 shrink-0"
            aria-label="Navegación lateral">
            <div className="rounded-2xl shadow-lg p-4 sticky top-24"
                style={{ backgroundColor: '#0F243E' }}>

                {/* Etiqueta módulo */}
                <p className="text-[10px] font-black uppercase tracking-widest px-2 mb-3"
                    style={{ color: '#4D9FC1' }}>
                    {moduloLabel}
                </p>

                {/* Links */}
                <nav className="space-y-0.5">
                    {links.map(({ to, label, icon: Icon, badge }) => (
                        <Link
                            key={to}
                            to={to}
                            className="flex items-center justify-between px-3 py-2.5 rounded-xl
                text-sm font-medium transition-all duration-200"
                            style={{
                                backgroundColor: esActivo(to) ? '#4D9FC1' : 'transparent',
                                color: esActivo(to) ? 'white' : '#94a3b8',
                            }}
                            onMouseEnter={e => {
                                if (!esActivo(to)) e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={e => {
                                if (!esActivo(to)) e.currentTarget.style.color = '#94a3b8';
                            }}
                            aria-current={esActivo(to) ? 'page' : undefined}
                        >
                            <div className="flex items-center gap-2.5">
                                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                                <span className="truncate">{label}</span>
                            </div>

                            {badge && !esActivo(to) && (
                                <span className="text-[10px] font-black text-white px-1.5 py-0.5
                  rounded-full min-w-[18px] text-center"
                                    style={{ backgroundColor: '#4D9FC1' }}>
                                    {badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;