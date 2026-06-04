// =============================================
// PROVIEMPLEA - SEGUIMIENTO CANDIDATOS
// archivo: src/pages/empresa/SeguimientoCandidatos.jsx
// descripción: Vista del estado de todos los
// candidatos solicitados por la empresa.
// Muestra el proceso de selección con estados.
// =============================================

import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { empresaService } from '../../services/api';
import { ESTADOS_SOLICITUD } from '../../constants/api';
import { formatearFechaRelativa } from '../../utils/formatters';
import {
    Users, Clock, CheckCircle, XCircle,
    Briefcase, ChevronRight, Inbox
} from 'lucide-react';

const SeguimientoCandidatos = () => {
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

    const filtros = [
        { value: 'todos', label: 'Todos' },
        { value: '1', label: 'Solicitado' },
        { value: '2', label: 'Contactado' },
        { value: '3', label: 'Entrevista' },
        { value: '4', label: 'Seleccionado' },
        { value: '5', label: 'No seleccionado' },
    ];

    const solicitudesFiltradas = solicitudes.filter(s =>
        filtro === 'todos' || String(s.id_estado) === filtro
    );

    // Contadores por estado
    const contadores = Object.entries(ESTADOS_SOLICITUD).map(([id, estado]) => ({
        id, label: estado.label, color: estado.color,
        count: solicitudes.filter(s => String(s.id_estado) === id).length,
    }));

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main className="flex-1 space-y-6">

                        {/* Header */}
                        <div>
                            <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                Seguimiento de candidatos
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Estado de todos los candidatos solicitados a la OMIL Municipal.
                            </p>
                        </div>

                        {/* Contadores */}
                        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
                            {contadores.map(({ id, label, color, count }) => (
                                <div key={id} className="bg-white rounded-xl border border-slate-100
                  shadow-sm p-3 text-center">
                                    <p className="text-2xl font-black" style={{ color: '#0F243E' }}>{count}</p>
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${color}`}>
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Filtros */}
                        <div className="flex flex-wrap gap-2">
                            {filtros.map(f => (
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
                        {loading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 animate-pulse">
                                        <div className="h-4 bg-slate-100 rounded w-1/3 mb-2" />
                                        <div className="h-3 bg-slate-100 rounded w-1/2" />
                                    </div>
                                ))}
                            </div>
                        ) : solicitudesFiltradas.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
                                <Inbox className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <h3 className="font-bold text-slate-700 mb-2">Sin candidatos</h3>
                                <p className="text-sm text-slate-500">
                                    No hay candidatos con este estado. Explora la vitrina de talentos.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {solicitudesFiltradas.map((sol, idx) => {
                                    const estado = ESTADOS_SOLICITUD[sol.id_estado];
                                    return (
                                        <div key={sol.id || idx}
                                            className="bg-white rounded-2xl border border-slate-100 shadow-sm
                        p-5 flex items-center gap-4 hover:shadow-md transition-all">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center
                        text-white font-black text-lg shrink-0"
                                                style={{ backgroundColor: '#4D9FC1' }}>
                                                T
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <p className="font-bold text-slate-800 text-sm">
                                                            Talento #{sol.id?.slice(-4) || idx + 1}
                                                        </p>
                                                        <p className="text-xs text-slate-500 mt-0.5">
                                                            {formatearFechaRelativa(sol.fecha_solicitud)}
                                                        </p>
                                                        {sol.notas && (
                                                            <p className="text-xs text-slate-400 mt-1">{sol.notas}</p>
                                                        )}
                                                    </div>
                                                    {estado && (
                                                        <span className={`text-xs font-bold px-2.5 py-1
                              rounded-full shrink-0 ${estado.color}`}>
                                                            {estado.label}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SeguimientoCandidatos;
