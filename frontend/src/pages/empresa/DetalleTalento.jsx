// =============================================
// PROVIEMPLEA - DETALLE TALENTO EMPRESA
// archivo: src/pages/empresa/DetalleTalento.jsx
// descripción: Vista del CV Ciego de un talento
// específico para la empresa. Sin datos personales.
// =============================================

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { vitrinaService, solicitudService } from '../../services/api';
import {
    ArrowLeft, Eye, Lock, Briefcase, GraduationCap,
    Zap, Clock, MapPin, CheckCircle, Loader2, Send
} from 'lucide-react';

const DetalleTalento = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [talento, setTalento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [solicitando, setSolicitando] = useState(false);
    const [solicitado, setSolicitado] = useState(false);

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await vitrinaService.getTalento(id);
                setTalento(res.data.data);
            } catch {
                setTalento(null);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, [id]);

    const handleSolicitar = async () => {
        setSolicitando(true);
        try {
            await solicitudService.crear({ id_talento: id });
            setSolicitado(true);
        } catch (err) {
            alert(err.response?.data?.message || 'Error al enviar solicitud.');
        } finally {
            setSolicitando(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC]">
                <Navbar />
                <div className="flex items-center justify-center h-96">
                    <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#4D9FC1' }} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main className="flex-1 space-y-6">

                        {/* Header */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <button onClick={() => navigate('/empresa/vitrina')}
                                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                                    <ArrowLeft className="w-4 h-4 text-slate-600" />
                                </button>
                                <div>
                                    <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                        CV Ciego — Talento
                                    </h1>
                                    <p className="text-slate-500 text-sm mt-0.5">
                                        Perfil sin datos personales identificables.
                                    </p>
                                </div>
                            </div>

                            {!solicitado ? (
                                <button onClick={handleSolicitar} disabled={solicitando}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                    text-white font-bold text-sm transition-opacity hover:opacity-90
                    disabled:opacity-60"
                                    style={{ backgroundColor: '#0F243E' }}>
                                    {solicitando
                                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
                                        : <><Send className="w-4 h-4" /> Solicitar contacto</>}
                                </button>
                            ) : (
                                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                  text-white font-bold text-sm bg-green-500">
                                    <CheckCircle className="w-4 h-4" />
                                    Solicitud enviada
                                </div>
                            )}
                        </div>

                        {!talento ? (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
                                <Eye className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-slate-400">Talento no encontrado.</p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

                                {/* Header CV */}
                                <div className="p-6 border-b"
                                    style={{ background: 'linear-gradient(135deg, #0F243E, #4D9FC1)' }}>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="bg-white/20 text-white text-xs font-black
                          px-2.5 py-1 rounded-lg uppercase tracking-wider">
                                                    CV Ciego
                                                </span>
                                                <span className="bg-green-400/20 text-green-300 text-xs font-bold
                          px-2.5 py-1 rounded-lg">
                                                    ✓ Verificado OMIL
                                                </span>
                                            </div>
                                            <p className="text-white/60 text-xs font-mono uppercase tracking-widest">
                                                Código oficial
                                            </p>
                                            <h2 className="text-2xl font-black text-white mt-1">
                                                {talento.codigo || `TALENTO PVD-2026-${id?.slice(-3)}`}
                                            </h2>
                                            <p className="text-white/80 text-sm mt-1">
                                                {talento.carrera || 'Perfil disponible'}
                                            </p>
                                        </div>
                                        <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                                            <Lock className="w-6 h-6 text-white/60" />
                                        </div>
                                    </div>
                                </div>

                                {/* Contenido */}
                                <div className="p-6 space-y-6">

                                    {/* Datos ocultos */}
                                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                            Datos protegidos
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {['Nombre', 'Edad', 'Género', 'Dirección', 'Fotografía', 'RUT'].map(item => (
                                                <span key={item} className="flex items-center gap-1.5 text-xs
                          bg-red-50 text-red-600 border border-red-100 px-2.5 py-1 rounded-lg">
                                                    <Lock className="w-3 h-3" /> {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Disponibilidad */}
                                    <div>
                                        <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-3">
                                            Disponibilidad
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5">
                                                <Clock className="w-4 h-4 text-slate-400" />
                                                <div>
                                                    <p className="text-[10px] text-slate-400 uppercase font-bold">Jornada</p>
                                                    <p className="text-sm font-semibold text-slate-700 capitalize">
                                                        {talento.jornada_deseada || 'No especificada'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5">
                                                <MapPin className="w-4 h-4 text-slate-400" />
                                                <div>
                                                    <p className="text-[10px] text-slate-400 uppercase font-bold">Modalidad</p>
                                                    <p className="text-sm font-semibold text-slate-700 capitalize">
                                                        {talento.modalidad_deseada || 'No especificada'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
                                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                                <p className="text-sm font-semibold text-green-700">Disponible</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Competencias */}
                                    {talento.competencias?.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-3
                        flex items-center gap-2">
                                                <Zap className="w-4 h-4" /> Competencias técnicas
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {talento.competencias.map((comp, idx) => (
                                                    <span key={idx} className="flex items-center gap-1.5 text-xs font-semibold
                            px-3 py-1.5 rounded-xl border"
                                                        style={{ backgroundColor: '#4D9FC110', borderColor: '#4D9FC130', color: '#0F243E' }}>
                                                        <CheckCircle className="w-3 h-3" style={{ color: '#4D9FC1' }} />
                                                        {comp.nombre || comp}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Nota privacidad */}
                                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4
                    flex items-start gap-3">
                                        <Lock className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                                        <p className="text-xs text-indigo-700 leading-relaxed">
                                            <strong>Para contactar a este talento</strong> debes hacer clic en
                                            "Solicitar contacto". La OMIL Municipal revisará tu solicitud y coordinará
                                            el proceso de intermediación respetando la privacidad del vecino/a.
                                        </p>
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

export default DetalleTalento;
