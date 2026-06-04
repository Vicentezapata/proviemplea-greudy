// =============================================
// PROVIEMPLEA - HISTORIAL SOLICITUDES EMPRESA
// archivo: src/pages/empresa/HistorialSolicitudes.jsx
// descripción: Historial completo de todas las
// solicitudes enviadas por la empresa a la OMIL.
// =============================================

import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { empresaService } from '../../services/api';
import { ESTADOS_SOLICITUD } from '../../constants/api';
import { formatearFecha, formatearFechaRelativa } from '../../utils/formatters';
import { Clock, CheckCircle, XCircle, Inbox, Calendar, Filter } from 'lucide-react';

const HistorialSolicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState('todos');

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

    const solicitudesFiltradas = solicitudes.filter(s =>
        filtro === 'todos' || String(s.id_estado) === filtro
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main className="flex-1 space-y-6">

                        <div>
                            <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                Historial de solicitudes
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Registro completo de todas las solicitudes enviadas a la OMIL.
                            </p>
                        </div>

                        {/* Filtros */}
                        <div className="flex flex-wrap gap-2">
                            {[
                                { value: 'todos', label: 'Todos' },
                                ...Object.entries(ESTADOS_SOLICITUD).map(([id, e]) => ({ value: id, label: e.label }))
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

                        {/* Tabla */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            {loading ? (
                                <div className="p-8 space-y-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-12 bg-slate-50 rounded-xl animate-pulse" />
                                    ))}
                                </div>
                            ) : solicitudesFiltradas.length === 0 ? (
                                <div className="p-16 text-center">
                                    <Inbox className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                    <h3 className="font-bold text-slate-700 mb-2">Sin historial</h3>
                                    <p className="text-sm text-slate-500">No hay solicitudes registradas.</p>
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-100">
                                            {['Talento', 'Estado', 'Fecha solicitud', 'Última actualización'].map(col => (
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
                                            return (
                                                <tr key={sol.id || idx} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg flex items-center
                                justify-center text-white font-bold text-xs shrink-0"
                                                                style={{ backgroundColor: '#4D9FC1' }}>
                                                                T
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-slate-700">
                                                                    Talento #{sol.id?.slice(-4) || idx + 1}
                                                                </p>
                                                                {sol.notas && (
                                                                    <p className="text-xs text-slate-400 truncate max-w-xs">
                                                                        {sol.notas}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        {estado && (
                                                            <span className={`text-xs font-bold px-2.5 py-1
                                rounded-full ${estado.color}`}>
                                                                {estado.label}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            {formatearFecha(sol.fecha_solicitud)}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <p className="text-xs text-slate-400">
                                                            {formatearFechaRelativa(sol.updatedAt || sol.fecha_solicitud)}
                                                        </p>
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

export default HistorialSolicitudes;
