// =============================================
// PROVIEMPLEA - ENVÍO TALENTOS ADMIN
// archivo: src/pages/admin/EnvioTalentos.jsx
// descripción: La OMIL puede enviar perfiles
// de talentos a empresas socias manualmente.
// =============================================

import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { adminService, solicitudService } from '../../services/api';
import { Send, Users, Building2, Search, CheckCircle, Loader2 } from 'lucide-react';

const EnvioTalentos = () => {
    const [talentos, setTalentos] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [enviando, setEnviando] = useState(null);
    const [exitos, setExitos] = useState([]);

    useEffect(() => {
        const cargar = async () => {
            try {
                const [talentosRes, empresasRes] = await Promise.all([
                    adminService.getTalentos({ limit: 20 }),
                    adminService.getEmpresas(),
                ]);
                setTalentos(talentosRes.data.data || []);
                setEmpresas(empresasRes.data.data || []);
            } catch {
                setTalentos([]);
                setEmpresas([]);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    const handleEnviar = async (id_talento) => {
        setEnviando(id_talento);
        try {
            await solicitudService.crear({ id_talento });
            setExitos(prev => [...prev, id_talento]);
            setTimeout(() => setExitos(prev => prev.filter(id => id !== id_talento)), 3000);
        } catch (err) {
            alert(err.response?.data?.message || 'Error al enviar perfil.');
        } finally {
            setEnviando(null);
        }
    };

    const talentosFiltrados = talentos.filter(t =>
        t.correo?.toLowerCase().includes(busqueda.toLowerCase())
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
                                Envío de Talentos
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Envía perfiles de talentos a empresas socias desde la OMIL.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: '#4D9FC115' }}>
                                    <Users className="w-5 h-5" style={{ color: '#4D9FC1' }} />
                                </div>
                                <div>
                                    <p className="text-2xl font-black" style={{ color: '#0F243E' }}>{talentos.length}</p>
                                    <p className="text-xs text-slate-500">Talentos disponibles</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: '#6366f115' }}>
                                    <Building2 className="w-5 h-5" style={{ color: '#6366f1' }} />
                                </div>
                                <div>
                                    <p className="text-2xl font-black" style={{ color: '#0F243E' }}>{empresas.length}</p>
                                    <p className="text-xs text-slate-500">Empresas socias</p>
                                </div>
                            </div>
                        </div>

                        {/* Buscador */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input type="text" value={busqueda}
                                    onChange={e => setBusqueda(e.target.value)}
                                    placeholder="Buscar talento..."
                                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200
                    rounded-xl outline-none focus:border-[#4D9FC1]" />
                            </div>
                        </div>

                        {/* Lista talentos */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            {loading ? (
                                <div className="p-8 space-y-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-16 bg-slate-50 rounded-xl animate-pulse" />
                                    ))}
                                </div>
                            ) : talentosFiltrados.length === 0 ? (
                                <div className="p-16 text-center">
                                    <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                    <p className="text-slate-400 text-sm">No hay talentos disponibles.</p>
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-100">
                                            {['Talento', 'Estado', 'Registro', 'Acción'].map(col => (
                                                <th key={col} className="text-left px-5 py-3.5 text-xs font-black
                          uppercase tracking-wider text-slate-400">
                                                    {col}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {talentosFiltrados.map((talento) => {
                                            const exitoso = exitos.includes(talento.id);
                                            return (
                                                <tr key={talento.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-xl flex items-center
                                justify-center text-white font-bold text-sm shrink-0"
                                                                style={{ backgroundColor: '#4D9FC1' }}>
                                                                {talento.correo?.charAt(0).toUpperCase()}
                                                            </div>
                                                            <p className="text-sm font-bold text-slate-700">{talento.correo}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full
                              ${talento.estado_validacion === 'Aprobado'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-yellow-100 text-yellow-800'}`}>
                                                            {talento.estado_validacion || 'Pendiente'}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <p className="text-xs text-slate-400">
                                                            {talento.createdAt ? new Date(talento.createdAt).toLocaleDateString('es-CL') : '—'}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <button
                                                            onClick={() => handleEnviar(talento.id)}
                                                            disabled={enviando === talento.id || exitoso}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5
                                rounded-lg text-xs font-bold transition-all
                                disabled:opacity-60"
                                                            style={{
                                                                backgroundColor: exitoso ? '#22C55E' : '#4D9FC1',
                                                                color: 'white',
                                                            }}>
                                                            {enviando === talento.id
                                                                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                                : exitoso
                                                                    ? <CheckCircle className="w-3.5 h-3.5" />
                                                                    : <Send className="w-3.5 h-3.5" />
                                                            }
                                                            {exitoso ? 'Enviado' : 'Enviar perfil'}
                                                        </button>
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

export default EnvioTalentos;
