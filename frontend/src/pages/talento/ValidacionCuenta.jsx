// =============================================
// PROVIEMPLEA - VALIDACIÓN CUENTA
// archivo: src/pages/talento/ValidacionCuenta.jsx
// descripción: Página informativa sobre el
// estado de validación de la cuenta del vecino.
// =============================================

import { Link } from 'react-router-dom';
import { Clock, CheckCircle, Upload, ArrowRight, Shield } from 'lucide-react';

const ValidacionCuenta = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
            <div className="max-w-lg w-full space-y-6">

                {/* Logo */}
                <div className="text-center">
                    <img src="/images/logo-proviemplea.png" alt="ProviEmplea"
                        className="h-12 w-auto mx-auto mb-6" style={{ mixBlendMode: 'multiply' }} />
                </div>

                {/* Card principal */}
                <div className="bg-white rounded-3xl shadow-xl p-8 text-center space-y-6">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center
            justify-center mx-auto">
                        <Clock className="w-10 h-10 text-yellow-500" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-black mb-2" style={{ color: '#0F243E' }}>
                            Cuenta en validación
                        </h1>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            La OMIL Municipal de Providencia está revisando tu certificado
                            de residencia. Este proceso toma entre 24 y 48 horas hábiles.
                        </p>
                    </div>

                    {/* Pasos */}
                    <div className="space-y-3 text-left">
                        {[
                            { paso: 1, label: 'Registro completado', done: true },
                            { paso: 2, label: 'Documentos subidos', done: true },
                            { paso: 3, label: 'Revisión OMIL Municipal', done: false, activo: true },
                            { paso: 4, label: 'Cuenta aprobada', done: false },
                        ].map(({ paso, label, done, activo }) => (
                            <div key={paso} className="flex items-center gap-3">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center
                  text-xs font-black shrink-0
                  ${done ? 'bg-green-500 text-white' : activo
                                        ? 'bg-yellow-400 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    {done ? '✓' : paso}
                                </div>
                                <p className={`text-sm font-semibold
                  ${done ? 'text-green-700' : activo ? 'text-yellow-700' : 'text-slate-400'}`}>
                                    {label}
                                    {activo && <span className="text-xs font-normal ml-2">— En progreso</span>}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left">
                        <div className="flex items-start gap-3">
                            <Shield className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-blue-800">¿Por qué se valida la cuenta?</p>
                                <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                                    ProviEmplea es exclusivo para vecinos de Providencia. La OMIL
                                    verifica tu residencia para garantizar la calidad del servicio
                                    y proteger a los participantes.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Acciones */}
                    <div className="space-y-3">
                        <Link to="/talento/archivos"
                            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4
                rounded-xl text-white font-bold text-sm transition-opacity hover:opacity-90"
                            style={{ backgroundColor: '#4D9FC1' }}>
                            <Upload className="w-4 h-4" />
                            Subir documentos
                        </Link>
                        <Link to="/login"
                            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4
                rounded-xl text-sm font-semibold border-2 border-slate-200
                text-slate-600 hover:bg-slate-50 transition-colors">
                            Volver al login
                        </Link>
                    </div>
                </div>

                <p className="text-center text-xs text-slate-400">
                    © {new Date().getFullYear()} Municipalidad de Providencia — ProviEmplea
                </p>
            </div>
        </div>
    );
};

export default ValidacionCuenta;
