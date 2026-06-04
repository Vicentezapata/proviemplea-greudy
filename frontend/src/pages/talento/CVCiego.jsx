// =============================================
// PROVIEMPLEA - CV CIEGO TALENTO
// archivo: src/pages/talento/CVCiego.jsx
// descripción: Muestra cómo ve la empresa el
// perfil del vecino. Sin datos personales.
// Solo experiencia, competencias y habilidades.
// =============================================

import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { talentoService } from '../../services/api';
import { Eye, Lock, Download, CheckCircle, Briefcase, GraduationCap, Zap, Globe, Clock, MapPin } from 'lucide-react';

const CVCiego = () => {
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await talentoService.getPerfil();
                setPerfil(res.data.data);
            } catch {
                setPerfil(null);
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
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                    Mi CV Ciego
                                </h1>
                                <p className="text-slate-500 text-sm mt-1">
                                    Así te ven las empresas — sin datos personales identificables.
                                </p>
                            </div>
                            <button
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                  text-white text-sm font-semibold transition-opacity hover:opacity-90"
                                style={{ backgroundColor: '#0F243E' }}>
                                <Download className="w-4 h-4" />
                                Descargar PDF
                            </button>
                        </div>

                        {/* Banner informativo */}
                        <div className="bg-[#0F243E] rounded-2xl p-5 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                style={{ backgroundColor: 'rgba(77,159,193,0.3)' }}>
                                <Eye className="w-5 h-5" style={{ color: '#4D9FC1' }} />
                            </div>
                            <div>
                                <p className="font-bold text-white text-sm">¿Qué es el CV Ciego?</p>
                                <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                                    Tu perfil se muestra a las empresas sin nombre, foto, edad, género ni dirección.
                                    Solo ven tus competencias, experiencia y habilidades. Esto elimina sesgos
                                    inconscientes en el proceso de selección.
                                </p>
                            </div>
                        </div>

                        {/* CV Ciego */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

                            {/* Header del CV */}
                            <div className="p-6 border-b border-slate-100"
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
                                            TALENTO PVD-2026-{String(Math.floor(Math.random() * 999)).padStart(3, '0')}
                                        </h2>
                                        <p className="text-white/80 text-sm mt-1">
                                            {perfil?.resumen ? 'Perfil activo' : 'Perfil en construcción'}
                                        </p>
                                    </div>
                                    <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                                        <Lock className="w-6 h-6 text-white/60" />
                                    </div>
                                </div>
                            </div>

                            {/* Contenido del CV */}
                            <div className="p-6 space-y-6">

                                {/* Datos ocultos */}
                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                        Datos protegidos — No visibles para empresas
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Nombre completo', 'Edad', 'Género', 'Dirección', 'Fotografía', 'RUT'].map(item => (
                                            <span key={item} className="flex items-center gap-1.5 text-xs
                        bg-red-50 text-red-600 border border-red-100 px-2.5 py-1 rounded-lg font-medium">
                                                <Lock className="w-3 h-3" />
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Resumen */}
                                {perfil?.resumen && (
                                    <div>
                                        <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-3">
                                            Resumen profesional
                                        </h3>
                                        <p className="text-slate-700 text-sm leading-relaxed">
                                            {perfil.resumen}
                                        </p>
                                    </div>
                                )}

                                {/* Disponibilidad */}
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-3">
                                        Disponibilidad
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {[
                                            { icon: Clock, label: perfil?.jornada_deseada || 'No especificada', titulo: 'Jornada' },
                                            { icon: MapPin, label: perfil?.modalidad_deseada || 'No especificada', titulo: 'Modalidad' },
                                        ].map(({ icon: Icon, label, titulo }) => (
                                            <div key={titulo} className="flex items-center gap-2 bg-slate-50
                        border border-slate-100 rounded-xl px-4 py-2.5">
                                                <Icon className="w-4 h-4 text-slate-400" />
                                                <div>
                                                    <p className="text-[10px] text-slate-400 uppercase font-bold">{titulo}</p>
                                                    <p className="text-sm font-semibold text-slate-700 capitalize">{label}</p>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex items-center gap-2 bg-green-50
                      border border-green-100 rounded-xl px-4 py-2.5">
                                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                                            <p className="text-sm font-semibold text-green-700">Disponible inmediatamente</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Educación */}
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-3
                    flex items-center gap-2">
                                        <GraduationCap className="w-4 h-4" />
                                        Formación académica
                                    </h3>
                                    {perfil?.educaciones?.length > 0 ? (
                                        <div className="space-y-3">
                                            {perfil.educaciones.map((edu, idx) => (
                                                <div key={idx} className="flex items-start gap-3 p-4
                          bg-slate-50 rounded-xl border border-slate-100">
                                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                                        style={{ backgroundColor: '#4D9FC1' }}>
                                                        <GraduationCap className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-slate-800">{edu.nivel_educacional}</p>
                                                        {edu.carrera && <p className="text-sm text-slate-600">{edu.carrera}</p>}
                                                        {edu.institucion && <p className="text-xs text-slate-400 mt-0.5">{edu.institucion}</p>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-400 italic">Sin información educacional registrada.</p>
                                    )}
                                </div>

                                {/* Experiencia */}
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-3
                    flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" />
                                        Experiencia laboral
                                    </h3>
                                    {perfil?.laborales?.length > 0 ? (
                                        <div className="space-y-3">
                                            {perfil.laborales.map((lab, idx) => (
                                                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <p className="font-bold text-sm text-slate-800">{lab.cargo}</p>
                                                            <p className="text-sm text-slate-600">{lab.empresa}</p>
                                                        </div>
                                                        {lab.fecha_inicio && (
                                                            <p className="text-xs text-slate-400">
                                                                {lab.fecha_inicio} — {lab.fecha_fin || 'Actualidad'}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {lab.descripcion && (
                                                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                                            {lab.descripcion}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-400 italic">Sin experiencia laboral registrada.</p>
                                    )}
                                </div>

                                {/* Competencias */}
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-3
                    flex items-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        Competencias técnicas
                                    </h3>
                                    {perfil?.competencias?.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {perfil.competencias.map((comp, idx) => (
                                                <span key={idx} className="flex items-center gap-1.5 text-xs font-semibold
                          px-3 py-1.5 rounded-xl border"
                                                    style={{ backgroundColor: '#4D9FC1/10', borderColor: '#4D9FC1/30', color: '#0F243E' }}>
                                                    <CheckCircle className="w-3 h-3" style={{ color: '#4D9FC1' }} />
                                                    {comp.nombre || comp}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-400 italic">Sin competencias registradas.</p>
                                    )}
                                </div>

                                {/* Nota privacidad */}
                                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4
                  flex items-start gap-3">
                                    <Lock className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                                    <p className="text-xs text-indigo-700 leading-relaxed">
                                        <strong>Privacidad garantizada:</strong> Tu nombre, edad, género y dirección
                                        solo se revelan a la empresa si tú autorizas explícitamente el contacto
                                        a través de la OMIL Municipal de Providencia.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CVCiego;
