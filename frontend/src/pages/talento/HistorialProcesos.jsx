// =============================================
// PROVIEMPLEA - HISTORIAL DE PROCESOS
// archivo: src/pages/talento/HistorialProcesos.jsx
// descripción: Timeline de todos los procesos
// de selección del vecino. Muestra el estado
// actual y el historial de cambios de cada
// solicitud recibida de empresas.
// =============================================

import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { talentoService } from '../../services/api';
import { ESTADOS_SOLICITUD } from '../../constants/api';
import {
    Clock, CheckCircle, XCircle, Users,
    Briefcase, Building2, Calendar, Inbox
} from 'lucide-react';
import { formatearFechaRelativa } from '../../utils/formatters';

const iconoEstado = {
    1: { icon: Clock, color: '#3B82F6' },
    2: { icon: Users, color: '#F59E0B' },
    3: { icon: Briefcase, color: '#8B5CF6' },
    4: { icon: CheckCircle, color: '#22C55E' },
    5: { icon: XCircle, color: '#EF4444' },
    6: { icon: XCircle, color: '#94a3b8' },
};

const HistorialProcesos = () => {
    const [historial, setHistorial] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await talentoService.getHistorial();
                setHistorial(res.data.data || []);
            } catch {
                setHistorial([]);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

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
                                Historial de procesos
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Timeline completo de tus procesos de selección.
                            </p>
                        </div>

                        {/* Resumen estados */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                            {Object.entries(ESTADOS_SOLICITUD).map(([id, estado]) => {
                                const cantidad = historial.filter(h => String(h.id_estado) === id).length;
                                return (
                                    <div key={id} className="bg-white rounded-xl border border-slate-100
                    shadow-sm p-3 text-center">
                                        <p className="text-xl font-black" style={{ color: '#0F243E' }}>
                                            {cantidad}
                                        </p>
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${estado.color}`}>
                                            {estado.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Timeline */}
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 animate-pulse">
                                        <div className="h-4 bg-slate-100 rounded w-1/3 mb-2" />
                                        <div className="h-3 bg-slate-100 rounded w-1/2" />
                                    </div>
                                ))}
                            </div>
                        ) : historial.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm
                p-16 text-center">
                                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center
                  justify-center mx-auto mb-4">
                                    <Inbox className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="font-bold text-slate-700 mb-2">Sin historial</h3>
                                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                                    Aún no tienes procesos de selección registrados.
                                    Completa tu perfil para aumentar tu visibilidad.
                                </p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                                <div className="relative">
                                    {/* Línea vertical del timeline */}
                                    <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-100" />

                                    <div className="space-y-6">
                                        {historial.map((item, idx) => {
                                            const estadoInfo = iconoEstado[item.id_estado] || iconoEstado[1];
                                            const EstadoIcon = estadoInfo.icon;
                                            const estadoLabel = ESTADOS_SOLICITUD[item.id_estado];

                                            return (
                                                <div key={item.id || idx} className="flex gap-4 relative">
                                                    {/* Ícono del timeline */}
                                                    <div className="w-10 h-10 rounded-full flex items-center
                            justify-center shrink-0 z-10 border-2 border-white"
                                                        style={{ backgroundColor: `${estadoInfo.color}20` }}>
                                                        <EstadoIcon className="w-4 h-4"
                                                            style={{ color: estadoInfo.color }} />
                                                    </div>

                                                    {/* Contenido */}
                                                    <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                                                    <p className="font-bold text-sm text-slate-800">
                                                                        {item.empresa || 'Empresa confidencial'}
                                                                    </p>
                                                                </div>
                                                                {estadoLabel && (
                                                                    <span className={`inline-flex text-xs font-bold
                                    px-2 py-0.5 rounded-full ${estadoLabel.color}`}>
                                                                        {estadoLabel.label}
                                                                    </span>
                                                                )}
                                                                {item.descripcion && (
                                                                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                                                        {item.descripcion}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
                                                                <Calendar className="w-3.5 h-3.5" />
                                                                <p className="text-xs">
                                                                    {formatearFechaRelativa(item.fecha)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default HistorialProcesos;
