// =============================================
// PROVIEMPLEA - DASHBOARD ADMIN
// archivo: src/pages/admin/DashboardAdmin.jsx
// descripción: Panel principal del funcionario
// OMIL Municipal. Muestra KPIs del sistema,
// usuarios pendientes de validación y accesos
// rápidos a todas las funciones administrativas.
// =============================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { adminService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
    Users, Building2, Briefcase, BarChart3,
    CheckCircle, Clock, AlertTriangle, ArrowRight,
    Send, ShieldCheck, Download
} from 'lucide-react';
import { formatearFechaRelativa } from '../../utils/formatters';

const DashboardAdmin = () => {
    const { usuario } = useAuth();
    const [estadisticas, setEstadisticas] = useState(null);
    const [usuariosPendientes, setUsuariosPendientes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargar = async () => {
            try {
                const [statsRes, usuariosRes] = await Promise.all([
                    adminService.getEstadisticas(),
                    adminService.getUsuarios({ estado_validacion: 'Pendiente', limit: 5 }),
                ]);
                setEstadisticas(statsRes.data.data);
                setUsuariosPendientes(usuariosRes.data.data || []);
            } catch {
                setEstadisticas(null);
                setUsuariosPendientes([]);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    const kpis = [
        { label: 'Total talentos', valor: estadisticas?.total_talentos ?? 0, icon: Users, color: '#4D9FC1' },
        { label: 'Empresas activas', valor: estadisticas?.total_empresas ?? 0, icon: Building2, color: '#6366f1' },
        { label: 'Solicitudes activas', valor: estadisticas?.solicitudes_activas ?? 0, icon: Briefcase, color: '#22C55E' },
        { label: 'Pendientes validación', valor: estadisticas?.pendientes_validacion ?? 0, icon: Clock, color: '#F59E0B' },
        { label: 'Contratados', valor: estadisticas?.contratados ?? 0, icon: CheckCircle, color: '#22C55E' },
        { label: 'Procesos activos', valor: estadisticas?.procesos_activos ?? 0, icon: BarChart3, color: '#EF4444' },
    ];

    const accesosRapidos = [
        { titulo: 'Gestión Talentos', desc: 'Ver y validar perfiles de vecinos', icon: Users, to: '/admin/talentos', color: '#4D9FC1' },
        { titulo: 'Gestión Empresas', desc: 'Ver empresas registradas', icon: Building2, to: '/admin/empresas', color: '#6366f1' },
        { titulo: 'Solicitudes', desc: 'Gestionar procesos de contacto', icon: Briefcase, to: '/admin/solicitudes', color: '#22C55E' },
        { titulo: 'Envío Talentos', desc: 'Enviar perfiles a empresas', icon: Send, to: '/admin/envio-talentos', color: '#F59E0B' },
        { titulo: 'Seguimiento', desc: 'Monitor de procesos activos', icon: ShieldCheck, to: '/admin/seguimiento', color: '#EF4444' },
        { titulo: 'Estadísticas', desc: 'Reportes y analíticas del sistema', icon: BarChart3, to: '/admin/estadisticas', color: '#0F243E' },
        { titulo: 'Exportación', desc: 'Descargar reportes en Excel', icon: Download, to: '/admin/exportacion', color: '#4D9FC1' },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main className="flex-1 space-y-6">

                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                    Mesa de Control OMIL 🏛️
                                </h1>
                                <p className="text-slate-500 text-sm mt-1">
                                    {usuario?.correo} — Funcionario Municipal
                                </p>
                            </div>
                        </div>

                        {/* KPIs */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {kpis.map((kpi, idx) => (
                                <div key={idx} className="bg-white rounded-2xl border border-slate-100
                  shadow-sm p-5 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-medium text-slate-500">{kpi.label}</p>
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                            style={{ backgroundColor: `${kpi.color}15` }}>
                                            <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
                                        </div>
                                    </div>
                                    <p className="text-3xl font-black" style={{ color: '#0F243E' }}>
                                        {loading ? '—' : kpi.valor}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Accesos rápidos */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {accesosRapidos.map((item, idx) => (
                                <Link key={idx} to={item.to}
                                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5
                    hover:shadow-md transition-all hover:-translate-y-0.5 flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${item.color}15` }}>
                                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-xs" style={{ color: '#0F243E' }}>{item.titulo}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Usuarios pendientes de validación */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-bold text-sm flex items-center gap-2"
                                    style={{ color: '#0F243E' }}>
                                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                    Usuarios pendientes de validación
                                </h2>
                                <Link to="/admin/talentos"
                                    className="text-xs font-semibold hover:underline flex items-center gap-1"
                                    style={{ color: '#4D9FC1' }}>
                                    Ver todos <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>

                            {loading ? (
                                <div className="space-y-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-12 bg-slate-50 rounded-xl animate-pulse" />
                                    ))}
                                </div>
                            ) : usuariosPendientes.length === 0 ? (
                                <div className="text-center py-8">
                                    <CheckCircle className="w-10 h-10 text-green-300 mx-auto mb-3" />
                                    <p className="text-sm text-slate-400">
                                        No hay usuarios pendientes de validación. ✓
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {usuariosPendientes.map((u, idx) => (
                                        <div key={u.id || idx}
                                            className="flex items-center justify-between p-3
                        bg-yellow-50 border border-yellow-100 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg flex items-center
                          justify-center text-white font-bold text-xs"
                                                    style={{ backgroundColor: '#F59E0B' }}>
                                                    {u.correo?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-700">{u.correo}</p>
                                                    <p className="text-xs text-slate-400">
                                                        {formatearFechaRelativa(u.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <Link to={`/admin/talentos`}
                                                className="text-xs font-bold px-3 py-1.5 rounded-lg text-white
                          transition-opacity hover:opacity-90"
                                                style={{ backgroundColor: '#4D9FC1' }}>
                                                Validar
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
