// =============================================
// PROVIEMPLEA - SEGUIMIENTO PROCESOS ADMIN
// archivo: src/pages/admin/SeguimientoProcesos.jsx
// descripción: Monitor de todos los procesos
// de selección activos en el sistema.
// =============================================

import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { adminService } from '../../services/api';
import { ESTADOS_SOLICITUD } from '../../constants/api';
import { formatearFechaRelativa } from '../../utils/formatters';
import { ShieldCheck, Clock, CheckCircle, XCircle, Inbox, TrendingUp } from 'lucide-react';

const SeguimientoProcesos = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState('activos');

    useEffect(() => { cargar(); }, []);

    const cargar = async () => {
        setLoading(true);
        try {
            const res = await adminService.getSolicitudes();
            setSolicitudes(res.data.data || []);
        } catch {
            setSolicitudes([]);
        } finally {
            setLoading(false);
        }
    };

    const solicitudesFiltradas = solicitudes.filter(s => {
        if (filtro === 'activos') return [1, 2, 3].includes(s.id_estado);
        if (filtro === 'exitosos') return s.id_estado === 4;
        if (filtro === 'cerrados') return [5, 6].includes(s.id_estado);
        return true;
    });

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main className="flex-1 space-y-6">

                        <div>
                            <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                Seguimiento de Procesos
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Monitor en tiempo real de todos los procesos de selección.
                            </p>
                        </div>

                        {/* Resumen */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { label: 'Procesos activos', valor: solicitudes.filter(s => [1, 2, 3].includes(s.id_estado)).length, icon: Clock, color: '#4D9FC1' },
                                { label: 'Seleccionados', valor: solicitudes.filter(s => s.id_estado === 4).length, icon: CheckCircle, color: '#22C55E' },
                                { label: 'No seleccionados', valor: solicitudes.filter(s => s.id_estado === 5).length, icon: XCircle, color: '#EF4444' },
                                { label: 'Total procesos', valor: solicitudes.length, icon: TrendingUp, color: '#6366f1' },
                            ].map((kpi, idx) => (
                                <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
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
                                </div>
                            ))}
                        </div>

                        {/* Filtros */}
                        <div className="flex gap-2">
                            {[
                                { value: 'todos', label: 'Todos' },
                                { value: 'activos', label: 'Activos' },
                                { value: 'exitosos', label: 'Exitosos' },
                                { value: 'cerrados', label: 'Cerrados' },
                            ].map(f => (
                                <button key={f.value} onClick={() => setFiltro(f.value)}
                                    className="text-xs font-semibold px-3 py-2 rounded-xl transition-all"
                                    style={{
                                        backgroundColor: filtro === f.value ? '#4D9FC1' : 'white',
                                        color: filtro === f.value ? 'white' : '#64748b',
                                        border: `1px solid ${filtro === f.value ? '#4D9FC1' : '#e2e8f0'}`,
                                    }}>
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        {/* Lista */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            {loading ? (
                                <div className="p-8 space-y-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-16 bg-slate-50 rounded-xl animate-pulse" />
                                    ))}
                                </div>
                            ) : solicitudesFiltradas.length === 0 ? (
                                <div className="p-16 text-center">
                                    <Inbox className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                    <p className="text-slate-400 text-sm">No hay procesos en este estado.</p>
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-100">
                                            {['Empresa', 'Talento', 'Estado', 'Tiempo', 'Progreso'].map(col => (
                                                <th key={col} className="text-left px-5 py-3.5 text-xs font-black
                          uppercase tracking-wider text-slate-400">
                                                    {col}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {solicitudesFiltradas.map((sol, idx) => {
                                            const estado = ESTADOS_SOLICITUD[sol.id_estado];
                                            const progreso = (sol.id_estado / 6) * 100;
                                            return (
                                                <tr key={sol.id || idx} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-5 py-4">
                                                        <p className="text-sm font-bold text-slate-700">
                                                            {sol.nombre_empresa || 'Empresa'}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <p className="text-xs font-mono text-slate-500">
                                                            {sol.codigo_talento || `PVD-${sol.id?.slice(-6)}`}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        {estado && (
                                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${estado.color}`}>
                                                                {estado.label}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <p className="text-xs text-slate-400">
                                                            {formatearFechaRelativa(sol.createdAt)}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-4 w-32">
                                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <div className="h-full rounded-full transition-all"
                                                                style={{
                                                                    width: `${progreso}%`,
                                                                    backgroundColor: sol.id_estado === 4 ? '#22C55E' : sol.id_estado === 5 ? '#EF4444' : '#4D9FC1'
                                                                }} />
                                                        </div>
                                                        <p className="text-[10px] text-slate-400 mt-1">{Math.round(progreso)}%</p>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SeguimientoProcesos;
