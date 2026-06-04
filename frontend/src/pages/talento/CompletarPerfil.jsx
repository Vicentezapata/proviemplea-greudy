// =============================================
// PROVIEMPLEA - COMPLETAR PERFIL
// archivo: src/pages/talento/CompletarPerfil.jsx
// descripción: Formulario multi-paso para que
// el vecino complete su perfil laboral.
// Pasos: Datos básicos → Educación → Experiencia
// → Competencias → Preferencias laborales
// =============================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { talentoService, catalogoService } from '../../services/api';
import {
    User, GraduationCap, Briefcase, Zap, Settings,
    CheckCircle, ArrowRight, ArrowLeft, Plus, Trash2,
    Loader2, AlertCircle
} from 'lucide-react';
import { JORNADAS, MODALIDADES, NIVELES_EDUCACION, NIVELES_IDIOMA } from '../../constants/api';

const pasos = [
    { id: 1, label: 'Datos básicos', icon: User },
    { id: 2, label: 'Educación', icon: GraduationCap },
    { id: 3, label: 'Experiencia', icon: Briefcase },
    { id: 4, label: 'Competencias', icon: Zap },
    { id: 5, label: 'Preferencias', icon: Settings },
];

const CompletarPerfil = () => {
    const [pasoActual, setPasoActual] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errorApi, setErrorApi] = useState('');
    const navigate = useNavigate();

    // Datos básicos
    const [datosBasicos, setDatosBasicos] = useState({
        resumen: '',
        discapacidad_ley21015: false,
    });

    // Educación
    const [educaciones, setEducaciones] = useState([
        { nivel_educacional: '', carrera: '', institucion: '' }
    ]);

    // Experiencia
    const [laborales, setLaborales] = useState([
        { empresa: '', cargo: '', descripcion: '', fecha_inicio: '', fecha_fin: '' }
    ]);

    // Competencias
    const [competencias, setCompetencias] = useState([]);
    const [competenciasDisponibles, setCompetenciasDisponibles] = useState([]);
    const [competenciasSeleccionadas, setCompetenciasSeleccionadas] = useState([]);

    // Preferencias
    const [preferencias, setPreferencias] = useState({
        jornada_deseada: '',
        modalidad_deseada: '',
    });

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await catalogoService.getCompetencias();
                setCompetenciasDisponibles(res.data.data || []);
            } catch {
                setCompetenciasDisponibles([]);
            }
        };
        cargar();
    }, []);

    const toggleCompetencia = (id) => {
        setCompetenciasSeleccionadas(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const agregarEducacion = () => {
        setEducaciones(prev => [...prev, { nivel_educacional: '', carrera: '', institucion: '' }]);
    };

    const eliminarEducacion = (idx) => {
        setEducaciones(prev => prev.filter((_, i) => i !== idx));
    };

    const agregarLaboral = () => {
        setLaborales(prev => [...prev, { empresa: '', cargo: '', descripcion: '', fecha_inicio: '', fecha_fin: '' }]);
    };

    const eliminarLaboral = (idx) => {
        setLaborales(prev => prev.filter((_, i) => i !== idx));
    };

    const guardarPaso = async () => {
        setLoading(true);
        setErrorApi('');
        try {
            if (pasoActual === 1) {
                await talentoService.updatePerfil(datosBasicos);
            } else if (pasoActual === 2) {
                for (const edu of educaciones) {
                    if (edu.nivel_educacional) await talentoService.addEducacion(edu);
                }
            } else if (pasoActual === 3) {
                for (const lab of laborales) {
                    if (lab.empresa && lab.cargo) await talentoService.addLaboral(lab);
                }
            } else if (pasoActual === 4) {
                if (competenciasSeleccionadas.length > 0) {
                    await talentoService.updateCompetencias({ competencias: competenciasSeleccionadas });
                }
            } else if (pasoActual === 5) {
                await talentoService.updatePerfil(preferencias);
                navigate('/talento/dashboard');
                return;
            }
            setPasoActual(prev => prev + 1);
        } catch (err) {
            setErrorApi(err.response?.data?.message || 'Error al guardar. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none transition-all focus:border-[#4D9FC1] focus:ring-2 focus:ring-[#4D9FC1]/20";
    const labelClass = "text-sm font-semibold text-slate-700 block mb-1.5";

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
                                Completar mi perfil
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Completa tu información para que las empresas puedan encontrarte.
                            </p>
                        </div>

                        {/* Stepper */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <div className="flex items-center justify-between">
                                {pasos.map((paso, idx) => {
                                    const Icon = paso.icon;
                                    const completado = pasoActual > paso.id;
                                    const activo = pasoActual === paso.id;
                                    return (
                                        <div key={paso.id} className="flex items-center flex-1">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all"
                                                    style={{
                                                        backgroundColor: completado ? '#22C55E' : activo ? '#4D9FC1' : '#f1f5f9',
                                                        color: completado || activo ? 'white' : '#94a3b8',
                                                    }}>
                                                    {completado ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                                </div>
                                                <span className="text-[10px] font-semibold hidden sm:block"
                                                    style={{ color: activo ? '#4D9FC1' : completado ? '#22C55E' : '#94a3b8' }}>
                                                    {paso.label}
                                                </span>
                                            </div>
                                            {idx < pasos.length - 1 && (
                                                <div className="flex-1 h-0.5 mx-2 rounded"
                                                    style={{ backgroundColor: completado ? '#22C55E' : '#e2e8f0' }} />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Contenido del paso */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">

                            {errorApi && (
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200" role="alert">
                                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                                    <p className="text-sm text-red-700">{errorApi}</p>
                                </div>
                            )}

                            {/* Paso 1 — Datos básicos */}
                            {pasoActual === 1 && (
                                <div className="space-y-5">
                                    <h2 className="text-lg font-bold" style={{ color: '#0F243E' }}>
                                        Cuéntanos sobre ti
                                    </h2>
                                    <div>
                                        <label className={labelClass}>Resumen profesional</label>
                                        <textarea
                                            value={datosBasicos.resumen}
                                            onChange={e => setDatosBasicos({ ...datosBasicos, resumen: e.target.value })}
                                            placeholder="Describe brevemente tu experiencia y objetivos laborales..."
                                            rows={4}
                                            className={inputClass + ' resize-none'}
                                        />
                                        <p className="text-xs text-slate-400 mt-1">
                                            Este resumen aparecerá en tu CV Ciego
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-xl">
                                        <input
                                            type="checkbox"
                                            id="discapacidad"
                                            checked={datosBasicos.discapacidad_ley21015}
                                            onChange={e => setDatosBasicos({ ...datosBasicos, discapacidad_ley21015: e.target.checked })}
                                            className="w-4 h-4 rounded"
                                        />
                                        <label htmlFor="discapacidad" className="text-sm text-purple-800 cursor-pointer">
                                            <strong>Ley 21.015</strong> — Tengo una discapacidad certificada y deseo incluirme en el programa de inclusión laboral.
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Paso 2 — Educación */}
                            {pasoActual === 2 && (
                                <div className="space-y-5">
                                    <h2 className="text-lg font-bold" style={{ color: '#0F243E' }}>
                                        Antecedentes educacionales
                                    </h2>
                                    {educaciones.map((edu, idx) => (
                                        <div key={idx} className="p-5 border border-slate-100 rounded-2xl space-y-4 relative">
                                            {educaciones.length > 1 && (
                                                <button onClick={() => eliminarEducacion(idx)}
                                                    className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                                                    aria-label="Eliminar educación">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className={labelClass}>Nivel educacional</label>
                                                    <select
                                                        value={edu.nivel_educacional}
                                                        onChange={e => {
                                                            const nuevas = [...educaciones];
                                                            nuevas[idx].nivel_educacional = e.target.value;
                                                            setEducaciones(nuevas);
                                                        }}
                                                        className={inputClass}>
                                                        <option value="">Selecciona nivel</option>
                                                        {NIVELES_EDUCACION.map(n => (
                                                            <option key={n} value={n}>{n}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Carrera o especialidad</label>
                                                    <input type="text" value={edu.carrera}
                                                        onChange={e => {
                                                            const nuevas = [...educaciones];
                                                            nuevas[idx].carrera = e.target.value;
                                                            setEducaciones(nuevas);
                                                        }}
                                                        placeholder="Ej: Administración de Empresas"
                                                        className={inputClass} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Institución</label>
                                                <input type="text" value={edu.institucion}
                                                    onChange={e => {
                                                        const nuevas = [...educaciones];
                                                        nuevas[idx].institucion = e.target.value;
                                                        setEducaciones(nuevas);
                                                    }}
                                                    placeholder="Ej: INACAP"
                                                    className={inputClass} />
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={agregarEducacion}
                                        className="flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
                                        style={{ color: '#4D9FC1' }}>
                                        <Plus className="w-4 h-4" /> Agregar otra educación
                                    </button>
                                </div>
                            )}

                            {/* Paso 3 — Experiencia */}
                            {pasoActual === 3 && (
                                <div className="space-y-5">
                                    <h2 className="text-lg font-bold" style={{ color: '#0F243E' }}>
                                        Experiencia laboral
                                    </h2>
                                    {laborales.map((lab, idx) => (
                                        <div key={idx} className="p-5 border border-slate-100 rounded-2xl space-y-4 relative">
                                            {laborales.length > 1 && (
                                                <button onClick={() => eliminarLaboral(idx)}
                                                    className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                                                    aria-label="Eliminar experiencia">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className={labelClass}>Empresa</label>
                                                    <input type="text" value={lab.empresa}
                                                        onChange={e => {
                                                            const nuevas = [...laborales];
                                                            nuevas[idx].empresa = e.target.value;
                                                            setLaborales(nuevas);
                                                        }}
                                                        placeholder="Ej: Falabella S.A."
                                                        className={inputClass} />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Cargo</label>
                                                    <input type="text" value={lab.cargo}
                                                        onChange={e => {
                                                            const nuevas = [...laborales];
                                                            nuevas[idx].cargo = e.target.value;
                                                            setLaborales(nuevas);
                                                        }}
                                                        placeholder="Ej: Vendedor Senior"
                                                        className={inputClass} />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className={labelClass}>Fecha inicio</label>
                                                    <input type="date" value={lab.fecha_inicio}
                                                        onChange={e => {
                                                            const nuevas = [...laborales];
                                                            nuevas[idx].fecha_inicio = e.target.value;
                                                            setLaborales(nuevas);
                                                        }}
                                                        className={inputClass} />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Fecha término</label>
                                                    <input type="date" value={lab.fecha_fin}
                                                        onChange={e => {
                                                            const nuevas = [...laborales];
                                                            nuevas[idx].fecha_fin = e.target.value;
                                                            setLaborales(nuevas);
                                                        }}
                                                        className={inputClass} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Descripción del cargo</label>
                                                <textarea value={lab.descripcion}
                                                    onChange={e => {
                                                        const nuevas = [...laborales];
                                                        nuevas[idx].descripcion = e.target.value;
                                                        setLaborales(nuevas);
                                                    }}
                                                    placeholder="Describe tus responsabilidades..."
                                                    rows={3}
                                                    className={inputClass + ' resize-none'} />
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={agregarLaboral}
                                        className="flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
                                        style={{ color: '#4D9FC1' }}>
                                        <Plus className="w-4 h-4" /> Agregar otra experiencia
                                    </button>
                                </div>
                            )}

                            {/* Paso 4 — Competencias */}
                            {pasoActual === 4 && (
                                <div className="space-y-5">
                                    <h2 className="text-lg font-bold" style={{ color: '#0F243E' }}>
                                        Competencias técnicas
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        Selecciona las habilidades que dominas. Esto mejora tu visibilidad en la vitrina.
                                    </p>
                                    {competenciasDisponibles.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {competenciasDisponibles.map(comp => (
                                                <button
                                                    key={comp.id}
                                                    onClick={() => toggleCompetencia(comp.id)}
                                                    className="px-3 py-2 rounded-xl text-sm font-medium border-2 transition-all"
                                                    style={{
                                                        backgroundColor: competenciasSeleccionadas.includes(comp.id) ? '#4D9FC1' : 'white',
                                                        borderColor: competenciasSeleccionadas.includes(comp.id) ? '#4D9FC1' : '#e2e8f0',
                                                        color: competenciasSeleccionadas.includes(comp.id) ? 'white' : '#475569',
                                                    }}>
                                                    {comp.nombre}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center bg-slate-50 rounded-2xl">
                                            <p className="text-slate-400 text-sm">
                                                No hay competencias disponibles en este momento.
                                            </p>
                                        </div>
                                    )}
                                    {competenciasSeleccionadas.length > 0 && (
                                        <p className="text-xs text-slate-500">
                                            {competenciasSeleccionadas.length} competencia{competenciasSeleccionadas.length > 1 ? 's' : ''} seleccionada{competenciasSeleccionadas.length > 1 ? 's' : ''}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Paso 5 — Preferencias */}
                            {pasoActual === 5 && (
                                <div className="space-y-5">
                                    <h2 className="text-lg font-bold" style={{ color: '#0F243E' }}>
                                        Preferencias laborales
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        Indica qué tipo de trabajo buscas para mejorar las coincidencias con empresas.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className={labelClass}>Jornada deseada</label>
                                            <div className="space-y-2">
                                                {JORNADAS.map(j => (
                                                    <label key={j.value}
                                                        className="flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all"
                                                        style={{
                                                            borderColor: preferencias.jornada_deseada === j.value ? '#4D9FC1' : '#e2e8f0',
                                                            backgroundColor: preferencias.jornada_deseada === j.value ? '#4D9FC1/5' : 'white',
                                                        }}>
                                                        <input
                                                            type="radio"
                                                            name="jornada"
                                                            value={j.value}
                                                            checked={preferencias.jornada_deseada === j.value}
                                                            onChange={e => setPreferencias({ ...preferencias, jornada_deseada: e.target.value })}
                                                            className="w-4 h-4"
                                                            style={{ accentColor: '#4D9FC1' }}
                                                        />
                                                        <span className="text-sm font-medium text-slate-700">{j.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className={labelClass}>Modalidad deseada</label>
                                            <div className="space-y-2">
                                                {MODALIDADES.map(m => (
                                                    <label key={m.value}
                                                        className="flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all"
                                                        style={{
                                                            borderColor: preferencias.modalidad_deseada === m.value ? '#4D9FC1' : '#e2e8f0',
                                                            backgroundColor: preferencias.modalidad_deseada === m.value ? '#4D9FC1/5' : 'white',
                                                        }}>
                                                        <input
                                                            type="radio"
                                                            name="modalidad"
                                                            value={m.value}
                                                            checked={preferencias.modalidad_deseada === m.value}
                                                            onChange={e => setPreferencias({ ...preferencias, modalidad_deseada: e.target.value })}
                                                            className="w-4 h-4"
                                                            style={{ accentColor: '#4D9FC1' }}
                                                        />
                                                        <span className="text-sm font-medium text-slate-700">{m.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Botones navegación */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                <button
                                    onClick={() => setPasoActual(prev => prev - 1)}
                                    disabled={pasoActual === 1}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                    text-sm font-semibold border-2 border-slate-200 text-slate-600
                    hover:bg-slate-50 transition-all disabled:opacity-30
                    disabled:cursor-not-allowed">
                                    <ArrowLeft className="w-4 h-4" /> Anterior
                                </button>

                                <span className="text-xs text-slate-400">
                                    Paso {pasoActual} de {pasos.length}
                                </span>

                                <button
                                    onClick={guardarPaso}
                                    disabled={loading}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                    text-sm font-bold text-white transition-all hover:opacity-90
                    disabled:opacity-60 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: '#4D9FC1' }}>
                                    {loading
                                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</>
                                        : pasoActual === pasos.length
                                            ? <><CheckCircle className="w-4 h-4" /> Finalizar</>
                                            : <>Siguiente <ArrowRight className="w-4 h-4" /></>
                                    }
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CompletarPerfil;
