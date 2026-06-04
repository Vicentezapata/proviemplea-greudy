// =============================================
// PROVIEMPLEA - ESTADÍSTICAS ADMIN
// archivo: src/pages/admin/Estadisticas.jsx
// descripción: Dashboard de estadísticas y
// analíticas del sistema para la OMIL.
// =============================================

import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { adminService } from '../../services/api';
import {
    Users, Building2, Briefcase, CheckCircle,
    TrendingUp, BarChart3, PieChart, Clock
} from 'lucide-react';

const Estadisticas = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await adminService.getEstadisticas();
                setStats(res.data.data);
            } catch {
                setStats(null);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    const kpis = [
        { label: 'Total talentos', valor: stats?.total_talentos ?? 0, icon: Users, color: '#4D9FC1', desc: 'Vecinos registrados' },
        { label: 'Empresas activas', valor: stats?.total_empresas ?? 0, icon: Building2, color: '#6366f1', desc: 'Empresas socias' },
        { label: 'Solicitudes totales', valor: stats?.total_solicitudes ?? 0, icon: Briefcase, color: '#22C55E', desc: 'Procesos iniciados' },
        { label: 'Contratados', valor: stats?.contratados ?? 0, icon: CheckCircle, color: '#F59E0B', desc: 'Colocaciones exitosas' },
        { label: 'Pendientes validación', valor: stats?.pendientes_validacion ?? 0, icon: Clock, color: '#EF4444', desc: 'En espera de revisión' },
        { label: 'Tasa de éxito', valor: stats?.total_solicitudes ? `${Math.round((stats?.contratados / stats?.total_solicitudes) * 100)}%` : '0%', icon: TrendingUp, color: '#0F243E', desc: 'Solicitudes exitosas' },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main className="flex-1 space-y-6">

                        <div>
                            <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                Estadísticas del sistema
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Analíticas y reportes de ProviEmplea.
                            </p>
                        </div>

                        {/* KPIs */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {kpis.map((kpi, idx) => (
                                <div key={idx} className="bg-white rounded-2xl border border-slate-100
                  shadow-sm p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-xs font-medium text-slate-500">{kpi.label}</p>
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                            style={{ backgroundColor: `${kpi.color}15` }}>
                                            <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
                                        </div>
                                    </div>
                                    <p className="text-3xl font-black" style={{ color: '#0F243E' }}>
                                        {loading ? '—' : kpi.valor}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">{kpi.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Distribución por estado */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <h2 className="font-bold text-sm mb-4 flex items-center gap-2"
                                style={{ color: '#0F243E' }}>
                                <BarChart3 className="w-4 h-4" style={{ color: '#4D9FC1' }} />
                                Distribución de solicitudes por estado
                            </h2>
                            <div className="space-y-3">
                                {[
                                    { label: 'Solicitado', color: '#3B82F6', porcentaje: 30 },
                                    { label: 'Contactado', color: '#F59E0B', porcentaje: 25 },
                                    { label: 'Entrevista', color: '#8B5CF6', porcentaje: 20 },
                                    { label: 'Seleccionado', color: '#22C55E', porcentaje: 15 },
                                    { label: 'No seleccionado', color: '#EF4444', porcentaje: 7 },
                                    { label: 'Cerrado', color: '#94a3b8', porcentaje: 3 },
                                ].map((item) => (
                                    <div key={item.label}>
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-xs font-semibold text-slate-600">{item.label}</p>
                                            <p className="text-xs text-slate-400">{item.porcentaje}%</p>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full rounded-full transition-all duration-700"
                                                style={{ width: `${item.porcentaje}%`, backgroundColor: item.color }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Info Ley 21.015 */}
                        <div className="bg-purple-50 rounded-2xl border border-purple-100 p-6">
                            <h2 className="font-bold text-sm mb-4 flex items-center gap-2 text-purple-800">
                                <PieChart className="w-4 h-4" />
                                Inclusión Laboral — Ley 21.015
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {[
                                    { label: 'Talentos Ley 21.015', valor: stats?.talentos_ley21015 ?? 0 },
                                    { label: 'Contratados Ley 21.015', valor: stats?.contratados_ley21015 ?? 0 },
                                    { label: 'Empresas inclusivas', valor: stats?.empresas_inclusivas ?? 0 },
                                ].map(({ label, valor }) => (
                                    <div key={label} className="bg-white rounded-xl p-4 border border-purple-100">
                                        <p className="text-2xl font-black text-purple-700">
                                            {loading ? '—' : valor}
                                        </p>
                                        <p className="text-xs text-purple-600 mt-1">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default Estadisticas;
