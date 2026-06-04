// =============================================
// PROVIEMPLEA - VITRINA DE TALENTOS
// archivo: src/pages/empresa/VitrinaTalentos.jsx
// descripción: CV Ciego de talentos disponibles.
// Las empresas buscan candidatos por habilidades
// sin ver datos personales identificables.
// =============================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { vitrinaService, solicitudService } from '../../services/api';
import { Search, Filter, Eye, Users, Briefcase, CheckCircle, Loader2 } from 'lucide-react';

const VitrinaTalentos = () => {
    const [talentos, setTalentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [filtros, setFiltros] = useState({
        nivel_educacional: '',
        discapacidad_ley21015: '',
    });
    const [solicitando, setSolicitando] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async (params = {}) => {
        setLoading(true);
        try {
            const res = await vitrinaService.getTalentos(params);
            setTalentos(res.data.data || []);
        } catch {
            setTalentos([]);
        } finally {
            setLoading(false);
        }
    };

    const handleBuscar = () => {
        cargar({ ...filtros, carrera: busqueda });
    };

    const handleSolicitar = async (id) => {
        setSolicitando(id);
        try {
            await solicitudService.crear({ id_talento: id });
            alert('Solicitud enviada correctamente. La OMIL revisará tu solicitud.');
        } catch (err) {
            alert(err.response?.data?.message || 'Error al enviar solicitud.');
        } finally {
            setSolicitando(null);
        }
    };

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
                                Vitrina de Talentos
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Perfiles laborales de vecinos de Providencia — sin datos personales identificables.
                            </p>
                        </div>

                        {/* Banner CV Ciego */}
                        <div className="bg-[#0F243E] rounded-2xl p-5 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                style={{ backgroundColor: 'rgba(77,159,193,0.3)' }}>
                                <Eye className="w-5 h-5" style={{ color: '#4D9FC1' }} />
                            </div>
                            <div>
                                <p className="font-bold text-white text-sm">CV Ciego activado</p>
                                <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                                    Los perfiles no muestran nombre, foto, edad, género ni dirección.
                                    Para contactar a un talento debes solicitar intermediación a la OMIL Municipal.
                                </p>
                            </div>
                        </div>

                        {/* Buscador y filtros */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
                            <div className="flex gap-3">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        value={busqueda}
                                        onChange={e => setBusqueda(e.target.value)}
                                        placeholder="Buscar por carrera o especialidad..."
                                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200
                      rounded-xl outline-none transition-all focus:border-[#4D9FC1]
                      focus:ring-2 focus:ring-[#4D9FC1]/20"
                                        onKeyDown={e => e.key === 'Enter' && handleBuscar()}
                                    />
                                </div>
                                <button onClick={handleBuscar}
                                    className="px-5 py-2.5 rounded-xl text-white text-sm font-bold
                    transition-opacity hover:opacity-90"
                                    style={{ backgroundColor: '#4D9FC1' }}>
                                    Buscar
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <select
                                    value={filtros.nivel_educacional}
                                    onChange={e => setFiltros({ ...filtros, nivel_educacional: e.target.value })}
                                    className="px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none
                    text-slate-600 focus:border-[#4D9FC1]">
                                    <option value="">Nivel educacional</option>
                                    <option value="Técnico Superior">Técnico Superior</option>
                                    <option value="Universitaria Completa">Universitaria Completa</option>
                                    <option value="Educación Media">Educación Media</option>
                                    <option value="Postgrado">Postgrado</option>
                                </select>
                                <select
                                    value={filtros.discapacidad_ley21015}
                                    onChange={e => setFiltros({ ...filtros, discapacidad_ley21015: e.target.value })}
                                    className="px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none
                    text-slate-600 focus:border-[#4D9FC1]">
                                    <option value="">Ley 21.015</option>
                                    <option value="true">Solo Ley 21.015</option>
                                    <option value="false">Sin filtro</option>
                                </select>
                                <button onClick={() => { setBusqueda(''); setFiltros({ nivel_educacional: '', discapacidad_ley21015: '' }); cargar(); }}
                                    className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700
                    border border-slate-200 rounded-xl transition-colors">
                                    Limpiar filtros
                                </button>
                            </div>
                        </div>

                        {/* Grid de talentos */}
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 animate-pulse">
                                        <div className="h-4 bg-slate-100 rounded w-1/3 mb-3" />
                                        <div className="h-3 bg-slate-100 rounded w-2/3 mb-2" />
                                        <div className="h-3 bg-slate-100 rounded w-1/2" />
                                    </div>
                                ))}
                            </div>
                        ) : talentos.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
                                <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <h3 className="font-bold text-slate-700 mb-2">Sin resultados</h3>
                                <p className="text-sm text-slate-500">
                                    No hay talentos disponibles con los filtros seleccionados.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {talentos.map((talento, idx) => (
                                    <div key={talento.id || idx}
                                        className="bg-white rounded-2xl border border-slate-100 shadow-sm
                      hover:shadow-md transition-all hover:-translate-y-0.5 p-5 space-y-4">

                                        {/* Header */}
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                                                    Código oficial
                                                </p>
                                                <p className="font-black text-sm" style={{ color: '#0F243E' }}>
                                                    {talento.codigo || `PVD-2026-${String(idx + 1).padStart(3, '0')}`}
                                                </p>
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    {talento.carrera || 'Sin carrera especificada'}
                                                </p>
                                            </div>
                                            {talento.discapacidad_ley21015 && (
                                                <span className="text-[10px] font-bold bg-purple-100 text-purple-700
                          px-2 py-0.5 rounded-full border border-purple-200">
                                                    Ley 21.015
                                                </span>
                                            )}
                                        </div>

                                        {/* Nivel educacional */}
                                        {talento.nivel_educacional && (
                                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                                                {talento.nivel_educacional}
                                            </div>
                                        )}

                                        {/* Competencias */}
                                        {talento.competencias?.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {talento.competencias.slice(0, 3).map((comp, i) => (
                                                    <span key={i} className="text-[10px] font-semibold px-2 py-0.5
                            bg-slate-100 text-slate-600 rounded-lg">
                                                        {comp.nombre || comp}
                                                    </span>
                                                ))}
                                                {talento.competencias.length > 3 && (
                                                    <span className="text-[10px] text-slate-400 self-center">
                                                        +{talento.competencias.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Disponibilidad */}
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                            <p className="text-xs text-slate-500">
                                                {talento.jornada_deseada || 'Disponible'}
                                                {talento.modalidad_deseada && ` · ${talento.modalidad_deseada}`}
                                            </p>
                                        </div>

                                        {/* Botones */}
                                        <div className="flex gap-2 pt-1">
                                            <button
                                                onClick={() => navigate(`/empresa/talento/${talento.id}`)}
                                                className="flex-1 py-2 text-xs font-bold rounded-xl border-2
                          transition-all hover:bg-slate-50"
                                                style={{ borderColor: '#4D9FC1', color: '#4D9FC1' }}>
                                                Ver perfil
                                            </button>
                                            <button
                                                onClick={() => handleSolicitar(talento.id)}
                                                disabled={solicitando === talento.id}
                                                className="flex-1 py-2 text-xs font-bold rounded-xl text-white
                          transition-opacity hover:opacity-90 disabled:opacity-60
                          flex items-center justify-center gap-1"
                                                style={{ backgroundColor: '#0F243E' }}>
                                                {solicitando === talento.id
                                                    ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    : 'Solicitar'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default VitrinaTalentos;
