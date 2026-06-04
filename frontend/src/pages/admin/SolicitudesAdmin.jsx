// =============================================
// PROVIEMPLEA - SOLICITUDES ADMIN
// archivo: src/pages/admin/SolicitudesAdmin.jsx
// descripción: Gestión de todas las solicitudes
// de contacto empresa → talento. La OMIL puede
// cambiar estados y agregar notas internas.
// =============================================

import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { adminService, solicitudService } from '../../services/api';
import { ESTADOS_SOLICITUD } from '../../constants/api';
import { formatearFecha, formatearFechaRelativa } from '../../utils/formatters';
import {
    Briefcase, Search, Filter, ChevronDown,
    Clock, CheckCircle, XCircle, Inbox, Edit
} from 'lucide-react';

const SolicitudesAdmin = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroEstado, setFiltroEstado] = useState('');
    const [actualizando, setActualizando] = useState(null);

    useEffect(() => { cargar(); }, []);

    const cargar = async () => {
        setLoading(true);
        try {
            const res = await adminService.getSolicitudes({ id_estado: filtroEstado || undefined });
            setSolicitudes(res.data.data || []);
        } catch {
            setSolicitudes([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCambiarEstado = async (id, id_estado) => {
        setActualizando(id);
        try {
            await solicitudService.updateEstado(id, { id_estado: parseInt(id_estado) });
            setSolicitudes(prev => prev.map(s =>
                s.id === id ? { ...s, id_estado: parseInt(id_estado) } : s
            ));
        } catch (err) {
            alert(err.response?.data?.message || 'Error al actualizar estado.');
        } finally {
            setActualizando(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main className="flex-1 space-y-6">

                        <div>
                            <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                Solicitudes
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Gestiona los procesos de contacto empresa → talento.
                            </p>
                        </div>

                        {/* Resumen estados */}
                        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
                            {Object.entries(ESTADOS_SOLICITUD).map(([id, estado]) => {
                                const count = solicitudes.filter(s => String(s.id_estado) === id).length;
                                return (
                                    <button key={id}
                                        onClick={() => setFiltroEstado(filtroEstado === id ? '' : id)}
                                        className="bg-white rounded-xl border shadow-sm p-3 text-center
                      transition-all hover:shadow-md"
                                        style={{ borderColor: filtroEstado === id ? '#4D9FC1' : '#f1f5f9' }}>
                                        <p className="text-2xl font-black" style={{ color: '#0F243E' }}>{count}</p>
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${estado.color}`}>
                                            {estado.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Lista */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            {loading ? (
                                <div className="p-8 space-y-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-16 bg-slate-50 rounded-xl animate-pulse" />
                                    ))}
                                </div>
                            ) : solicitudes.length === 0 ? (
                                <div className="p-16 text-center">
                                    <Inbox className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                    <p className="text-slate-400 text-sm">No hay solicitudes.</p>
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-100">
                                            {['Empresa', 'Talento', 'Estado', 'Fecha', 'Cambiar estado'].map(col => (
                                                <th key={col} className="text-left px-5 py-3.5 text-xs font-black
                          uppercase tracking-wider text-slate-400">
                                                    {col}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {solicitudes.map((sol) => {
                                            const estado = ESTADOS_SOLICITUD[sol.id_estado];
                                            return (
                                                <tr key={sol.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-5 py-4">
                                                        <p className="text-sm font-bold text-slate-700">
                                                            {sol.nombre_empresa || 'Empresa'}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <p className="text-sm text-slate-600 font-mono">
                                                            {sol.codigo_talento || `PVD-${sol.id?.slice(-6)}`}
                                                        </p>
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
                                                        <p className="text-xs text-slate-400">
                                                            {formatearFechaRelativa(sol.createdAt)}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <select
                                                            value={sol.id_estado}
                                                            onChange={e => handleCambiarEstado(sol.id, e.target.value)}
                                                            disabled={actualizando === sol.id}
                                                            className="text-xs border border-slate-200 rounded-lg px-2 py-1.5
                                outline-none focus:border-[#4D9FC1] text-slate-600
                                disabled:opacity-50">
                                                            {Object.entries(ESTADOS_SOLICITUD).map(([id, e]) => (
                                                                <option key={id} value={id}>{e.label}</option>
                                                            ))}
                                                        </select>
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

export default SolicitudesAdmin;
