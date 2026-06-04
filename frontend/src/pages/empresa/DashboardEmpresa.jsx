// =============================================
// PROVIEMPLEA - DASHBOARD EMPRESA
// archivo: src/pages/empresa/DashboardEmpresa.jsx
// descripción: Panel principal de la empresa.
// Muestra KPIs, solicitudes recientes y
// accesos rápidos a la vitrina de talentos.
// =============================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { empresaService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
    Eye, Users, Briefcase, Clock, ArrowRight,
    CheckCircle, Building2, Search, TrendingUp
} from 'lucide-react';
import { ESTADOS_SOLICITUD } from '../../constants/api';
import { formatearFechaRelativa } from '../../utils/formatters';

const DashboardEmpresa = () => {
    const { usuario } = useAuth();
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await empresaService.getSolicitudes();
                setSolicitudes(res.data.data || []);
            } catch {
                setSolicitudes([]);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    const kpis = [
        { label: 'Solicitudes enviadas', valor: solicitudes.length, icon: Briefcase, color: '#4D9FC1' },
        { label: 'En proceso activo', valor: solicitudes.filter(s => [2, 3].includes(s.id_estado)).length, icon: Clock, color: '#6366f1' },
        { label: 'Seleccionados', valor: solicitudes.filter(s => s.id_estado === 4).length, icon: CheckCircle, color: '#22C55E' },
        { label: 'Talentos vistos', valor: 0, icon: Eye, color: '#F59E0B' },
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
                                    Bienvenido/a 👋
                                </h1>
                                <p className="text-slate-500 text-sm mt-1">
                                    {usuario?.correo} — Portal Empresas
                                </p>
                            </div>
                            <Link to="/empresa/vitrina"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                  text-white text-sm font-semibold transition-opacity hover:opacity-90"
                                style={{ backgroundColor: '#4D9FC1' }}>
                                <Search className="w-4 h-4" />
                                Buscar talentos
                            </Link>
                        </div>

                        {/* KPIs */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { titulo: 'Vitrina de Talentos', desc: 'Busca candidatos por habilidades', icon: Eye, to: '/empresa/vitrina', color: '#4D9FC1' },
                                { titulo: 'Seguimiento', desc: 'Estado de tus candidatos', icon: TrendingUp, to: '/empresa/seguimiento', color: '#6366f1' },
                                { titulo: 'Mi Empresa', desc: 'Gestiona el perfil empresarial', icon: Building2, to: '/empresa/perfil', color: '#22C55E' },
                            ].map((item, idx) => (
                                <Link key={idx} to={item.to}
                                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5
                    hover:shadow-md transition-all hover:-translate-y-0.5 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${item.color}15` }}>
                                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm" style={{ color: '#0F243E' }}>{item.titulo}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Solicitudes recientes */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-bold text-sm" style={{ color: '#0F243E' }}>
                                    Solicitudes recientes
                                </h2>
                                <Link to="/empresa/historial"
                                    className="text-xs font-semibold hover:underline flex items-center gap-1"
                                    style={{ color: '#4D9FC1' }}>
                                    Ver todas <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>

                            {loading ? (
                                <div className="space-y-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-12 bg-slate-50 rounded-xl animate-pulse" />
                                    ))}
                                </div>
                            ) : solicitudes.length === 0 ? (
                                <div className="text-center py-10">
                                    <Users className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                                    <p className="text-sm text-slate-400">
                                        No hay solicitudes aún. Explora la vitrina de talentos.
                                    </p>
                                    <Link to="/empresa/vitrina"
                                        className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold
                      hover:underline" style={{ color: '#4D9FC1' }}>
                                        Ir a la vitrina <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {solicitudes.slice(0, 5).map((sol, idx) => {
                                        const estado = ESTADOS_SOLICITUD[sol.id_estado];
                                        return (
                                            <div key={idx} className="flex items-center justify-between
                        p-3 bg-slate-50 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg flex items-center
                            justify-center text-white font-bold text-xs shrink-0"
                                                        style={{ backgroundColor: '#0F243E' }}>
                                                        T
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-700">
                                                            Talento #{sol.id?.slice(-4) || idx + 1}
                                                        </p>
                                                        <p className="text-xs text-slate-400">
                                                            {formatearFechaRelativa(sol.fecha_solicitud)}
                                                        </p>
                                                    </div>
                                                </div>
                                                {estado && (
                                                    <span className={`text-xs font-bold px-2.5 py-1
                            rounded-full ${estado.color}`}>
                                                        {estado.label}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardEmpresa;
