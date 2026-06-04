// =============================================
// PROVIEMPLEA - FICHA DE FISCALIZACIÓN ADMIN
// archivo: src/pages/admin/DetalleTalentoAdmin.jsx
// descripción: Vista completa del perfil de un
// talento para el funcionario OMIL. Diseñada
// como ficha oficial municipal con todos los
// datos del vecino, documentos subidos y
// herramientas de validación de residencia.
// Solo accesible para funcionarios id_rol = 1.
// =============================================

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { adminService } from '../../services/api';
import { formatearFecha, formatearFechaRelativa } from '../../utils/formatters';
import {
    ArrowLeft, CheckCircle, XCircle, User,
    GraduationCap, Briefcase, Zap, FileText,
    Loader2, AlertTriangle, MapPin, Phone,
    Mail, Shield, Clock, Eye, Download
} from 'lucide-react';

const DetalleTalentoAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [talento, setTalento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [validando, setValidando] = useState(false);
    const [exito, setExito] = useState('');

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await adminService.getUsuarios({ id });
                const lista = res.data.data || [];
                setTalento(lista.find(t => t.id === id) || lista[0] || null);
            } catch {
                setTalento(null);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, [id]);

    const handleValidar = async (estado) => {
        setValidando(true);
        try {
            await adminService.validarUsuario(id, { estado_validacion: estado });
            setTalento(prev => ({ ...prev, estado_validacion: estado }));
            setExito(estado === 'Aprobado'
                ? '✓ Vecino aprobado correctamente.'
                : '✗ Vecino rechazado.');
            setTimeout(() => setExito(''), 4000);
        } catch (err) {
            alert(err.response?.data?.message || 'Error al validar.');
        } finally {
            setValidando(false);
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

    // Datos del perfil (con fallbacks para demo)
    const correo = talento?.correo || '—';
    const estado = talento?.estado_validacion || 'Pendiente';
    const fechaRegistro = talento?.createdAt;
    const perfil = talento?.talento || {};
    const codigo = `PVD-2026-${id?.slice(-4) || '0000'}`;

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main className="flex-1 space-y-6">

                        {/* Header navegación */}
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/admin/talentos')}
                                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                                <ArrowLeft className="w-4 h-4 text-slate-600" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                    Ficha de Fiscalización
                                </h1>
                                <p className="text-slate-500 text-sm mt-0.5">
                                    Panel Ejecutivo Municipal — OMIL Providencia
                                </p>
                            </div>
                        </div>

                        {/* Alerta de éxito */}
                        {exito && (
                            <div className={`flex items-center gap-3 p-4 rounded-xl border
                ${exito.startsWith('✓')
                                    ? 'bg-green-50 border-green-200 text-green-700'
                                    : 'bg-red-50 border-red-200 text-red-700'}`}>
                                <CheckCircle className="w-5 h-5 shrink-0" />
                                <p className="text-sm font-semibold">{exito}</p>
                            </div>
                        )}

                        {!talento ? (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
                                <User className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-slate-400">Talento no encontrado.</p>
                            </div>
                        ) : (
                            <>
                                {/* Ficha principal */}
                                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

                                    {/* Header de la ficha */}
                                    <div className="px-6 py-4 border-b border-slate-100 flex items-center
                    justify-between" style={{ backgroundColor: '#0F243E' }}>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest mb-1"
                                                style={{ color: '#4D9FC1' }}>
                                                Panel Ejecutivo Municipal
                                            </p>
                                            <h2 className="text-lg font-black text-white">
                                                Ficha de Fiscalización: {correo.split('@')[0]}
                                            </h2>
                                            <p className="text-slate-300 text-xs mt-0.5">
                                                Código de registro: {codigo}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-black
                        px-3 py-1.5 rounded-full
                        ${estado === 'Aprobado' ? 'bg-green-400/20 text-green-300' :
                                                    estado === 'Rechazado' ? 'bg-red-400/20 text-red-300' :
                                                        'bg-yellow-400/20 text-yellow-300'}`}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                                {estado}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Datos del vecino */}
                                    <div className="p-6 space-y-6">

                                        {/* Info de contacto */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-wider
                          text-slate-400 mb-1">Correo electrónico</p>
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-slate-400" />
                                                    <p className="text-sm font-semibold text-slate-700">{correo}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-wider
                          text-slate-400 mb-1">Teléfono directo</p>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-slate-400" />
                                                    <p className="text-sm font-semibold text-slate-700">
                                                        {perfil?.telefono || 'No registrado'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-wider
                          text-slate-400 mb-1">Dirección en Providencia</p>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-slate-400" />
                                                    <p className="text-sm font-semibold text-slate-700">
                                                        {perfil?.direccion || 'No registrada'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-wider
                          text-slate-400 mb-1">Fecha de registro</p>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-slate-400" />
                                                    <p className="text-sm font-semibold text-slate-700">
                                                        {formatearFechaRelativa(fechaRegistro)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Verificación residencia */}
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-wider
                        text-slate-400 mb-3 flex items-center gap-2">
                                                <Shield className="w-3.5 h-3.5" />
                                                Verificación residencia comunal
                                            </p>
                                            <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                                                {/* Certificado */}
                                                <div className="flex items-center justify-between p-3
                          bg-slate-50 rounded-xl">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex
                              items-center justify-center">
                                                            <FileText className="w-4 h-4 text-yellow-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-slate-700">
                                                                certificado_residencia_{correo.split('@')[0]}.pdf
                                                            </p>
                                                            <p className="text-[10px] text-slate-400">PDF — Subido por el vecino</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button className="flex items-center gap-1 text-[10px] font-bold
                              px-2 py-1 rounded-lg bg-slate-200 text-slate-600
                              hover:bg-slate-300 transition-colors">
                                                            <Eye className="w-3 h-3" /> Ver
                                                        </button>
                                                        <button className="flex items-center gap-1 text-[10px] font-bold
                              px-2 py-1 rounded-lg bg-slate-200 text-slate-600
                              hover:bg-slate-300 transition-colors">
                                                            <Download className="w-3 h-3" /> Descargar
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Estado validación */}
                                                <div className={`flex items-center gap-2 p-3 rounded-xl
                          ${estado === 'Aprobado'
                                                        ? 'bg-green-50 border border-green-200'
                                                        : estado === 'Rechazado'
                                                            ? 'bg-red-50 border border-red-200'
                                                            : 'bg-yellow-50 border border-yellow-200'}`}>
                                                    {estado === 'Aprobado'
                                                        ? <CheckCircle className="w-4 h-4 text-green-600" />
                                                        : estado === 'Rechazado'
                                                            ? <XCircle className="w-4 h-4 text-red-600" />
                                                            : <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                                                    <p className={`text-xs font-bold
                            ${estado === 'Aprobado' ? 'text-green-700' :
                                                            estado === 'Rechazado' ? 'text-red-700' : 'text-yellow-700'}`}>
                                                        {estado === 'Aprobado' ? 'Certificado Validado'
                                                            : estado === 'Rechazado' ? 'Certificado Rechazado'
                                                                : 'Pendiente de revisión por OMIL'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Perfil laboral */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                                            {/* Resumen */}
                                            <div className="border border-slate-100 rounded-xl p-4">
                                                <h3 className="text-xs font-black uppercase tracking-wider
                          text-slate-400 mb-3 flex items-center gap-2">
                                                    <User className="w-3.5 h-3.5" /> Resumen profesional
                                                </h3>
                                                <p className="text-sm text-slate-600 leading-relaxed">
                                                    {perfil?.resumen || 'Sin resumen registrado.'}
                                                </p>
                                            </div>

                                            {/* Preferencias */}
                                            <div className="border border-slate-100 rounded-xl p-4">
                                                <h3 className="text-xs font-black uppercase tracking-wider
                          text-slate-400 mb-3 flex items-center gap-2">
                                                    <Briefcase className="w-3.5 h-3.5" /> Preferencias laborales
                                                </h3>
                                                <div className="space-y-2">
                                                    {[
                                                        { label: 'Jornada', valor: perfil?.jornada_deseada },
                                                        { label: 'Modalidad', valor: perfil?.modalidad_deseada },
                                                        { label: 'Ley 21.015', valor: perfil?.discapacidad_ley21015 ? '✓ Incluido' : 'No aplica' },
                                                    ].map(({ label, valor }) => (
                                                        <div key={label} className="flex justify-between py-1.5
                              border-b border-slate-50 last:border-0">
                                                            <p className="text-xs font-semibold text-slate-500">{label}</p>
                                                            <p className="text-xs font-bold capitalize"
                                                                style={{ color: valor ? '#0F243E' : '#cbd5e1' }}>
                                                                {valor || '—'}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Competencias */}
                                        {perfil?.competencias?.length > 0 && (
                                            <div className="border border-slate-100 rounded-xl p-4">
                                                <h3 className="text-xs font-black uppercase tracking-wider
                          text-slate-400 mb-3 flex items-center gap-2">
                                                    <Zap className="w-3.5 h-3.5" /> Competencias técnicas
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {perfil.competencias.map((comp, idx) => (
                                                        <span key={idx} className="text-xs font-semibold px-2.5 py-1
                              rounded-xl border"
                                                            style={{
                                                                backgroundColor: '#4D9FC110',
                                                                borderColor: '#4D9FC130', color: '#0F243E'
                                                            }}>
                                                            {comp.nombre || comp}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Exigencia OMIL */}
                                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4
                      flex items-start gap-3">
                                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                            <p className="text-xs text-amber-800 leading-relaxed">
                                                <strong>Exigencia OMIL:</strong> El vecino debe residir,
                                                trabajar o estudiar en la comuna de Providencia para ser
                                                acreditado. Verificar con el certificado de residencia adjunto.
                                            </p>
                                        </div>

                                        {/* Estado y botones validación */}
                                        <div className="border-t border-slate-100 pt-5">
                                            <p className="text-xs font-black uppercase tracking-wider
                        text-slate-400 mb-3">
                                                Estado de postulante en vitrina
                                            </p>
                                            {estado === 'Aprobado' ? (
                                                <div className="flex items-center gap-3 p-4 bg-green-50
                          border border-green-200 rounded-xl">
                                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                                    <p className="text-sm font-bold text-green-700">
                                                        Vecino aprobado — visible en vitrina de empresas.
                                                    </p>
                                                </div>
                                            ) : estado === 'Rechazado' ? (
                                                <div className="flex items-center gap-3 p-4 bg-red-50
                          border border-red-200 rounded-xl">
                                                    <XCircle className="w-5 h-5 text-red-600" />
                                                    <p className="text-sm font-bold text-red-700">
                                                        Vecino rechazado — no visible en vitrina.
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleValidar('Aprobado')}
                                                        disabled={validando}
                                                        className="flex items-center gap-2 px-6 py-3 rounded-xl
                              text-white font-bold text-sm transition-opacity
                              hover:opacity-90 disabled:opacity-60"
                                                        style={{ backgroundColor: '#4D9FC1' }}>
                                                        {validando
                                                            ? <Loader2 className="w-4 h-4 animate-spin" />
                                                            : <CheckCircle className="w-4 h-4" />}
                                                        Aprobar Vecino
                                                    </button>
                                                    <button
                                                        onClick={() => handleValidar('Rechazado')}
                                                        disabled={validando}
                                                        className="flex items-center gap-2 px-6 py-3 rounded-xl
                              font-bold text-sm transition-all border-2 border-slate-200
                              text-slate-600 hover:bg-slate-50 disabled:opacity-60">
                                                        <XCircle className="w-4 h-4" />
                                                        Rechazar
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DetalleTalentoAdmin;