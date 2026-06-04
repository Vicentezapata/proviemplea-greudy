// =============================================
// PROVIEMPLEA - PERFIL TALENTO
// archivo: src/pages/talento/PerfilTalento.jsx
// descripción: Vista del perfil completo del
// vecino con todos sus datos laborales.
// Permite editar información y ver el progreso
// de completitud del perfil.
// =============================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { talentoService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
    User, GraduationCap, Briefcase, Zap,
    Settings, Edit, CheckCircle, Clock,
    Upload, Eye, AlertTriangle
} from 'lucide-react';

const PerfilTalento = () => {
    const { usuario } = useAuth();
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

    // Calcular completitud del perfil
    const calcularCompletitud = () => {
        if (!perfil) return 0;
        let puntos = 0;
        if (perfil.resumen) puntos += 20;
        if (perfil.educaciones?.length > 0) puntos += 20;
        if (perfil.laborales?.length > 0) puntos += 20;
        if (perfil.competencias?.length > 0) puntos += 20;
        if (perfil.jornada_deseada) puntos += 10;
        if (perfil.modalidad_deseada) puntos += 10;
        return puntos;
    };

    const completitud = calcularCompletitud();

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
                                    Mi Perfil
                                </h1>
                                <p className="text-slate-500 text-sm mt-1">
                                    Gestiona tu información laboral y personal.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Link to="/talento/cv-ciego"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                    text-sm font-semibold border-2 transition-all hover:bg-slate-50"
                                    style={{ borderColor: '#4D9FC1', color: '#4D9FC1' }}>
                                    <Eye className="w-4 h-4" />
                                    Ver CV Ciego
                                </Link>
                                <Link to="/talento/completar-perfil"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                    text-white text-sm font-semibold transition-opacity hover:opacity-90"
                                    style={{ backgroundColor: '#4D9FC1' }}>
                                    <Edit className="w-4 h-4" />
                                    Editar perfil
                                </Link>
                            </div>
                        </div>

                        {/* Card usuario + completitud */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <div className="flex items-start gap-5">

                                {/* Avatar */}
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center
                  text-white font-black text-2xl shrink-0"
                                    style={{ backgroundColor: '#4D9FC1' }}>
                                    {usuario?.correo?.charAt(0).toUpperCase()}
                                </div>

                                {/* Info usuario */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-lg font-black" style={{ color: '#0F243E' }}>
                                                {usuario?.correo?.split('@')[0]}
                                            </h2>
                                            <p className="text-sm text-slate-500">{usuario?.correo}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="inline-flex items-center gap-1.5 text-xs font-bold
                          bg-yellow-100 text-yellow-800 px-2.5 py-1 rounded-full border border-yellow-200">
                                                    <AlertTriangle className="w-3 h-3" />
                                                    Pendiente de validación
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Barra de completitud */}
                                    <div className="mt-4">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <p className="text-xs font-semibold text-slate-600">
                                                Completitud del perfil
                                            </p>
                                            <p className="text-xs font-black" style={{ color: '#4D9FC1' }}>
                                                {completitud}%
                                            </p>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${completitud}%`,
                                                    backgroundColor: completitud >= 80 ? '#22C55E' : completitud >= 50 ? '#4D9FC1' : '#F59E0B'
                                                }} />
                                        </div>
                                        {completitud < 100 && (
                                            <p className="text-xs text-slate-400 mt-1.5">
                                                Completa tu perfil para aumentar tu visibilidad en la vitrina.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Resumen */}
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-sm flex items-center gap-2"
                                        style={{ color: '#0F243E' }}>
                                        <User className="w-4 h-4" style={{ color: '#4D9FC1' }} />
                                        Resumen profesional
                                    </h3>
                                    <Link to="/talento/completar-perfil"
                                        className="text-xs font-semibold hover:underline"
                                        style={{ color: '#4D9FC1' }}>
                                        Editar
                                    </Link>
                                </div>
                                {perfil?.resumen ? (
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {perfil.resumen}
                                    </p>
                                ) : (
                                    <div className="text-center py-6">
                                        <p className="text-sm text-slate-400">Sin resumen agregado.</p>
                                        <Link to="/talento/completar-perfil"
                                            className="text-xs font-semibold mt-2 inline-block hover:underline"
                                            style={{ color: '#4D9FC1' }}>
                                            + Agregar resumen
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Preferencias */}
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-sm flex items-center gap-2"
                                        style={{ color: '#0F243E' }}>
                                        <Settings className="w-4 h-4" style={{ color: '#4D9FC1' }} />
                                        Preferencias laborales
                                    </h3>
                                    <Link to="/talento/completar-perfil"
                                        className="text-xs font-semibold hover:underline"
                                        style={{ color: '#4D9FC1' }}>
                                        Editar
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Jornada', valor: perfil?.jornada_deseada },
                                        { label: 'Modalidad', valor: perfil?.modalidad_deseada },
                                    ].map(({ label, valor }) => (
                                        <div key={label} className="flex items-center justify-between
                      py-2 border-b border-slate-50">
                                            <p className="text-xs font-semibold text-slate-500">{label}</p>
                                            <p className="text-sm font-semibold capitalize"
                                                style={{ color: valor ? '#0F243E' : '#cbd5e1' }}>
                                                {valor || 'No especificado'}
                                            </p>
                                        </div>
                                    ))}
                                    {perfil?.discapacidad_ley21015 && (
                                        <div className="bg-purple-50 border border-purple-100 rounded-xl p-3">
                                            <p className="text-xs font-bold text-purple-700">
                                                ✓ Incluido en programa Ley 21.015
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Educación */}
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-sm flex items-center gap-2"
                                        style={{ color: '#0F243E' }}>
                                        <GraduationCap className="w-4 h-4" style={{ color: '#4D9FC1' }} />
                                        Educación
                                    </h3>
                                    <Link to="/talento/completar-perfil"
                                        className="text-xs font-semibold hover:underline"
                                        style={{ color: '#4D9FC1' }}>
                                        Editar
                                    </Link>
                                </div>
                                {perfil?.educaciones?.length > 0 ? (
                                    <div className="space-y-3">
                                        {perfil.educaciones.map((edu, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-3
                        bg-slate-50 rounded-xl">
                                                <div className="w-8 h-8 rounded-lg flex items-center
                          justify-center shrink-0"
                                                    style={{ backgroundColor: '#4D9FC1' }}>
                                                    <GraduationCap className="w-4 h-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-xs text-slate-800">
                                                        {edu.nivel_educacional}
                                                    </p>
                                                    {edu.carrera && (
                                                        <p className="text-xs text-slate-600">{edu.carrera}</p>
                                                    )}
                                                    {edu.institucion && (
                                                        <p className="text-xs text-slate-400">{edu.institucion}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
                                        <p className="text-sm text-slate-400">Sin educación agregada.</p>
                                        <Link to="/talento/completar-perfil"
                                            className="text-xs font-semibold mt-2 inline-block hover:underline"
                                            style={{ color: '#4D9FC1' }}>
                                            + Agregar educación
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Experiencia */}
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-sm flex items-center gap-2"
                                        style={{ color: '#0F243E' }}>
                                        <Briefcase className="w-4 h-4" style={{ color: '#4D9FC1' }} />
                                        Experiencia laboral
                                    </h3>
                                    <Link to="/talento/completar-perfil"
                                        className="text-xs font-semibold hover:underline"
                                        style={{ color: '#4D9FC1' }}>
                                        Editar
                                    </Link>
                                </div>
                                {perfil?.laborales?.length > 0 ? (
                                    <div className="space-y-3">
                                        {perfil.laborales.map((lab, idx) => (
                                            <div key={idx} className="p-3 bg-slate-50 rounded-xl">
                                                <p className="font-bold text-xs text-slate-800">{lab.cargo}</p>
                                                <p className="text-xs text-slate-600">{lab.empresa}</p>
                                                {lab.fecha_inicio && (
                                                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {lab.fecha_inicio} — {lab.fecha_fin || 'Actualidad'}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
                                        <p className="text-sm text-slate-400">Sin experiencia agregada.</p>
                                        <Link to="/talento/completar-perfil"
                                            className="text-xs font-semibold mt-2 inline-block hover:underline"
                                            style={{ color: '#4D9FC1' }}>
                                            + Agregar experiencia
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Competencias */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-sm flex items-center gap-2"
                                    style={{ color: '#0F243E' }}>
                                    <Zap className="w-4 h-4" style={{ color: '#4D9FC1' }} />
                                    Competencias técnicas
                                </h3>
                                <Link to="/talento/completar-perfil"
                                    className="text-xs font-semibold hover:underline"
                                    style={{ color: '#4D9FC1' }}>
                                    Editar
                                </Link>
                            </div>
                            {perfil?.competencias?.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {perfil.competencias.map((comp, idx) => (
                                        <span key={idx} className="flex items-center gap-1.5 text-xs
                      font-semibold px-3 py-1.5 rounded-xl border"
                                            style={{ backgroundColor: '#4D9FC1/10', borderColor: '#4D9FC1/30', color: '#0F243E' }}>
                                            <CheckCircle className="w-3 h-3" style={{ color: '#4D9FC1' }} />
                                            {comp.nombre || comp}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <p className="text-sm text-slate-400">Sin competencias agregadas.</p>
                                    <Link to="/talento/completar-perfil"
                                        className="text-xs font-semibold mt-2 inline-block hover:underline"
                                        style={{ color: '#4D9FC1' }}>
                                        + Agregar competencias
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Documentos */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-sm flex items-center gap-2"
                                    style={{ color: '#0F243E' }}>
                                    <Upload className="w-4 h-4" style={{ color: '#4D9FC1' }} />
                                    Documentos
                                </h3>
                                <Link to="/talento/archivos"
                                    className="text-xs font-semibold hover:underline"
                                    style={{ color: '#4D9FC1' }}>
                                    Gestionar
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { label: 'Certificado de residencia', tipo: 'comprobante_residencia' },
                                    { label: 'Currículum Vitae', tipo: 'cv' },
                                ].map(({ label, tipo }) => (
                                    <div key={tipo} className="flex items-center gap-3 p-3
                    bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center
                      justify-center shrink-0">
                                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-700">{label}</p>
                                            <p className="text-xs text-yellow-600">Pendiente de validación</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default PerfilTalento;