// =============================================
// PROVIEMPLEA - MIS SOLICITUDES
// archivo: src/pages/talento/MisSolicitudes.jsx
// descripción: Muestra las empresas interesadas
// en el perfil del vecino. Estados del proceso
// de selección con timeline visual.
// =============================================

import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { talentoService } from '../../services/api';
import { ESTADOS_SOLICITUD } from '../../constants/api';
import {
    Briefcase, Building2, Calendar, ChevronRight,
    Inbox, Clock, CheckCircle, XCircle, Users
} from 'lucide-react';
import { formatearFecha, formatearFechaRelativa } from '../../utils/formatters';

const iconoEstado = {
    1: <Clock className="w-4 h-4" />,
    2: <Users className="w-4 h-4" />,
    3: <Briefcase className="w-4 h-4" />,
    4: <CheckCircle className="w-4 h-4" />,
    5: <XCircle className="w-4 h-4" />,
    6: <XCircle className="w-4 h-4" />,
};

const MisSolicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState('todas');

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await talentoService.getMisSolicitudes();
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
        { value: 'todas', label: 'Todas' },
        { value: '1', label: 'Solicitado' },
        { value: '2', label: 'Contactado' },
        { value: '3', label: 'Entrevista' },
        { value: '4', label: 'Seleccionado' },
        { value: '5', label: 'No seleccionado' },
    ];

    const solicitudesFiltradas = solicitudes.filter(s =>
        filtro === 'todas' || String(s.id_estado) === filtro
    );

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
                                Mis Solicitudes
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Empresas que han solicitado contacto con tu perfil.
                            </p>
                        </div>

                        {/* Filtros */}
                        <div className="flex flex-wrap gap-2">
                            {filtros.map(f => (
                                <button key={f.value}
                                    onClick={() => setFiltro(f.value)}
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

                        {/* Lista solicitudes */}
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
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm
                p-16 text-center">
                                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center
                  justify-center mx-auto mb-4">
                                    <Inbox className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="font-bold text-slate-700 mb-2">Sin solicitudes</h3>
                                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                                    Aún no hay empresas interesadas en tu perfil. Completa tu perfil
                                    para aumentar tu visibilidad en la vitrina.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {solicitudesFiltradas.map(sol => {
                                    const estado = ESTADOS_SOLICITUD[sol.id_estado];
                                    return (
                                        <div key={sol.id}
                                            className="bg-white rounded-2xl border border-slate-100 shadow-sm
                        p-5 hover:shadow-md transition-all flex items-center gap-4">

                                            {/* Ícono empresa */}
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center
                        text-white font-black text-lg shrink-0"
                                                style={{ backgroundColor: '#0F243E' }}>
                                                {sol.nombre_empresa?.charAt(0) || 'E'}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <p className="font-bold text-slate-800 text-sm">
                                                            {sol.nombre_empresa || 'Empresa confidencial'}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                            <p className="text-xs text-slate-500">
                                                                {formatearFechaRelativa(sol.fecha_solicitud)}
                                                            </p>
                                                        </div>
                                                        {sol.notas && (
                                                            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                                                                {sol.notas}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Badge estado */}
                                                    {estado && (
                                                        <span className={`inline-flex items-center gap-1.5 text-xs
                              font-bold px-2.5 py-1 rounded-full shrink-0 ${estado.color}`}>
                                                            {iconoEstado[sol.id_estado]}
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

export default MisSolicitudes;
