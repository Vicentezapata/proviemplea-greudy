// =============================================
// PROVIEMPLEA - GESTIÓN TALENTOS ADMIN
// archivo: src/pages/admin/GestionTalentos.jsx
// descripción: Lista de todos los talentos
// del sistema con opciones de validación.
// Solo accesible para funcionarios OMIL.
// =============================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { adminService } from '../../services/api';
import { formatearFechaRelativa } from '../../utils/formatters';
import {
    Users, Search, CheckCircle, XCircle,
    Clock, Eye, ChevronRight, Filter
} from 'lucide-react';

const estadoColors = {
    'Pendiente': 'bg-yellow-100 text-yellow-800',
    'Aprobado': 'bg-green-100 text-green-800',
    'Rechazado': 'bg-red-100 text-red-800',
    'En revisión': 'bg-blue-100 text-blue-800',
};

const GestionTalentos = () => {
    const [talentos, setTalentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [validando, setValidando] = useState(null);

    useEffect(() => { cargar(); }, []);

    const cargar = async (params = {}) => {
        setLoading(true);
        try {
            const res = await adminService.getUsuarios({ rol: 'talento', ...params });
            setTalentos(res.data.data || []);
        } catch {
            setTalentos([]);
        } finally {
            setLoading(false);
        }
    };

    const handleValidar = async (id, estado) => {
        setValidando(id);
        try {
            await adminService.validarUsuario(id, { estado_validacion: estado });
            setTalentos(prev => prev.map(t =>
                t.id === id ? { ...t, estado_validacion: estado } : t
            ));
        } catch (err) {
            alert(err.response?.data?.message || 'Error al validar.');
        } finally {
            setValidando(null);
        }
    };

    const talentosFiltrados = talentos.filter(t => {
        const coincideBusqueda = t.correo?.toLowerCase().includes(busqueda.toLowerCase());
        const coincideEstado = !filtroEstado || t.estado_validacion === filtroEstado;
        return coincideBusqueda && coincideEstado;
    });

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main className="flex-1 space-y-6">

                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                    Gestión de Talentos
                                </h1>
                                <p className="text-slate-500 text-sm mt-1">
                                    Valida y gestiona los perfiles de vecinos de Providencia.
                                </p>
                            </div>
                        </div>

                        {/* Buscador y filtros */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-wrap gap-3">
                            <div className="flex-1 relative min-w-48">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input type="text" value={busqueda}
                                    onChange={e => setBusqueda(e.target.value)}
                                    placeholder="Buscar por correo..."
                                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200
                    rounded-xl outline-none focus:border-[#4D9FC1]" />
                            </div>
                            <select value={filtroEstado}
                                onChange={e => setFiltroEstado(e.target.value)}
                                className="px-3 py-2.5 text-sm border border-slate-200 rounded-xl
                  outline-none text-slate-600 focus:border-[#4D9FC1]">
                                <option value="">Todos los estados</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="Aprobado">Aprobado</option>
                                <option value="Rechazado">Rechazado</option>
                            </select>
                        </div>

                        {/* Tabla */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            {loading ? (
                                <div className="p-8 space-y-3">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="h-14 bg-slate-50 rounded-xl animate-pulse" />
                                    ))}
                                </div>
                            ) : talentosFiltrados.length === 0 ? (
                                <div className="p-16 text-center">
                                    <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                    <p className="text-slate-400 text-sm">No hay talentos registrados.</p>
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-100">
                                            {['Usuario', 'Estado', 'Registro', 'Acciones'].map(col => (
                                                <th key={col} className="text-left px-5 py-3.5 text-xs font-black
                          uppercase tracking-wider text-slate-400">
                                                    {col}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {talentosFiltrados.map((talento) => (
                                            <tr key={talento.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-xl flex items-center
                              justify-center text-white font-bold text-sm shrink-0"
                                                            style={{ backgroundColor: '#4D9FC1' }}>
                                                            {talento.correo?.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-700">{talento.correo}</p>
                                                            <p className="text-xs text-slate-400">ID: {talento.id?.slice(-8)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full
                            ${estadoColors[talento.estado_validacion] || 'bg-slate-100 text-slate-600'}`}>
                                                        {talento.estado_validacion || 'Pendiente'}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <p className="text-xs text-slate-500">
                                                        {formatearFechaRelativa(talento.createdAt)}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-2">
                                                        {talento.estado_validacion === 'Pendiente' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleValidar(talento.id, 'Aprobado')}
                                                                    disabled={validando === talento.id}
                                                                    className="flex items-center gap-1 text-xs font-bold
                                    px-2.5 py-1.5 rounded-lg bg-green-100 text-green-700
                                    hover:bg-green-200 transition-colors disabled:opacity-50">
                                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                                    Aprobar
                                                                </button>
                                                                <button
                                                                    onClick={() => handleValidar(talento.id, 'Rechazado')}
                                                                    disabled={validando === talento.id}
                                                                    className="flex items-center gap-1 text-xs font-bold
                                    px-2.5 py-1.5 rounded-lg bg-red-100 text-red-700
                                    hover:bg-red-200 transition-colors disabled:opacity-50">
                                                                    <XCircle className="w-3.5 h-3.5" />
                                                                    Rechazar
                                                                </button>
                                                            </>
                                                        )}
                                                        <Link to={`/admin/talentos/${talento.id}`}
                                                            className="flex items-center gap-1 text-xs font-bold
                                px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-600
                                hover:bg-slate-200 transition-colors">
                                                            <Eye className="w-3.5 h-3.5" />
                                                            Ver
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
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

export default GestionTalentos;
