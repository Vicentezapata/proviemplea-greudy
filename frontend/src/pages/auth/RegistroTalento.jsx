/// =============================================
// PROVIEMPLEA - REGISTRO TALENTO
// archivo: src/pages/auth/RegistroTalento.jsx
// descripción: Página de registro para vecinos
// de Providencia. Al registrarse exitosamente
// redirige al login para iniciar sesión y
// luego subir documentos con token válido.
// =============================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/api';
import { validarCorreo, validarPassword, validarConfirmPassword } from '../../utils/validators';
import { AlertCircle, CheckCircle, Loader2, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const RegistroTalento = () => {
    const [form, setForm] = useState({ correo: '', password: '', confirmarPassword: '' });
    const [errores, setErrores] = useState({});
    const [errorApi, setErrorApi] = useState('');
    const [loading, setLoading] = useState(false);
    const [exito, setExito] = useState(false);
    const [verPassword, setVerPassword] = useState(false);
    const [verConfirm, setVerConfirm] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrores({ ...errores, [e.target.name]: '' });
        setErrorApi('');
    };

    const validar = () => {
        const nuevosErrores = {};
        const eCorreo = validarCorreo(form.correo);
        const ePassword = validarPassword(form.password);
        const eConfirm = validarConfirmPassword(form.password, form.confirmarPassword);
        if (eCorreo) nuevosErrores.correo = eCorreo;
        if (ePassword) nuevosErrores.password = ePassword;
        if (eConfirm) nuevosErrores.confirmarPassword = eConfirm;
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validar()) return;
        setLoading(true);
        try {
            await authService.registrarTalento({ correo: form.correo, password: form.password });
            setExito(true);
        } catch (err) {
            setErrorApi(err.response?.data?.message || 'Error al registrarse. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    if (exito) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', padding: '24px' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '40px', maxWidth: '420px', width: '100%', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', backgroundColor: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <span style={{ fontSize: '40px' }}>✅</span>
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0F243E', marginBottom: '12px' }}>
                        ¡Cuenta creada exitosamente!
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                        Tu cuenta fue creada correctamente. Inicia sesión para continuar subiendo tus documentos.
                    </p>
                    <div style={{ backgroundColor: '#fefce8', border: '1px solid #fde047', borderRadius: '12px', padding: '12px', marginBottom: '24px', fontSize: '12px', color: '#854d0e', textAlign: 'left' }}>
                        ⚠️ Inicia sesión con tu nueva cuenta para subir tu certificado de residencia y CV.
                    </div>
                    <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '12px', marginBottom: '24px', fontSize: '12px', color: '#1e40af', textAlign: 'left' }}>
                        <strong>📋 Próximos pasos:</strong><br />
                        1. Iniciar sesión<br />
                        2. Subir certificado de residencia y CV<br />
                        3. Completar perfil laboral<br />
                        4. Esperar validación OMIL (24-48 hrs)
                    </div>
                    <a href="/login" style={{ display: 'block', backgroundColor: '#4D9FC1', color: 'white', padding: '14px 24px', borderRadius: '12px', fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}>
                        Continuar — Iniciar sesión →
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-[#F8FAFC]">

            {/* Panel izquierdo */}
            <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
                style={{ backgroundColor: '#0F243E' }}>
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #4D9FC1 0%, transparent 60%)' }} />
                <div>
                    <img src="/images/logo-proviemplea.png" alt="ProviEmplea"
                        className="h-14 w-auto" style={{ mixBlendMode: 'screen' }} />
                </div>
                <div className="space-y-6 relative z-10">
                    <h2 className="text-4xl font-black text-white leading-tight">
                        Crea tu perfil laboral y conecta con{' '}
                        <span style={{ color: '#4D9FC1' }}>oportunidades reales</span>
                    </h2>
                    <p className="text-slate-300 leading-relaxed">
                        Únete a miles de vecinos de Providencia que ya encontraron
                        trabajo gracias a ProviEmplea y su sistema de CV Ciego.
                    </p>
                    <ul className="space-y-3">
                        {[
                            'Perfil laboral gratuito',
                            'CV Ciego para eliminar sesgos',
                            'Validación OMIL Municipal',
                            'Inclusión Ley 21.015',
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                                <CheckCircle className="w-4 h-4 shrink-0" style={{ color: '#4D9FC1' }} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <img src="/images/logo-providencia.png" alt="Municipalidad de Providencia"
                        className="h-16 w-auto opacity-60" style={{ mixBlendMode: 'screen' }} />
                </div>
            </div>

            {/* Panel derecho */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md space-y-6">

                    <Link to="/login"
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Volver al login
                    </Link>

                    <div>
                        <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                            Crear cuenta vecino/a
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Regístrate con tu correo para comenzar.
                        </p>
                    </div>

                    {errorApi && (
                        <div className="flex items-start gap-3 p-4 rounded-xl border bg-red-50 border-red-200" role="alert">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700">{errorApi}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                        <div className="space-y-1.5">
                            <label htmlFor="correo" className="text-sm font-semibold text-slate-700">
                                Correo electrónico
                            </label>
                            <input
                                id="correo" name="correo" type="email"
                                value={form.correo} onChange={handleChange}
                                placeholder="tu@correo.cl" autoComplete="email"
                                className="w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none"
                                style={{ borderColor: errores.correo ? '#EF4444' : '#e2e8f0' }}
                                onFocus={(e) => { if (!errores.correo) e.target.style.borderColor = '#4D9FC1'; }}
                                onBlur={(e) => { if (!errores.correo) e.target.style.borderColor = '#e2e8f0'; }}
                            />
                            {errores.correo && (
                                <p className="text-xs text-red-500 flex items-center gap-1" role="alert">
                                    <AlertCircle className="w-3 h-3" /> {errores.correo}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    id="password" name="password"
                                    type={verPassword ? 'text' : 'password'}
                                    value={form.password} onChange={handleChange}
                                    placeholder="Mínimo 8 caracteres, 1 mayúscula y 1 número"
                                    autoComplete="new-password"
                                    className="w-full px-4 py-3 pr-12 rounded-xl border text-sm transition-all outline-none"
                                    style={{ borderColor: errores.password ? '#EF4444' : '#e2e8f0' }}
                                    onFocus={(e) => { if (!errores.password) e.target.style.borderColor = '#4D9FC1'; }}
                                    onBlur={(e) => { if (!errores.password) e.target.style.borderColor = '#e2e8f0'; }}
                                />
                                <button type="button" onClick={() => setVerPassword(!verPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    aria-label={verPassword ? 'Ocultar' : 'Mostrar'}>
                                    {verPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errores.password && (
                                <p className="text-xs text-red-500 flex items-center gap-1" role="alert">
                                    <AlertCircle className="w-3 h-3" /> {errores.password}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="confirmarPassword" className="text-sm font-semibold text-slate-700">
                                Confirmar contraseña
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmarPassword" name="confirmarPassword"
                                    type={verConfirm ? 'text' : 'password'}
                                    value={form.confirmarPassword} onChange={handleChange}
                                    placeholder="Repite tu contraseña"
                                    autoComplete="new-password"
                                    className="w-full px-4 py-3 pr-12 rounded-xl border text-sm transition-all outline-none"
                                    style={{ borderColor: errores.confirmarPassword ? '#EF4444' : '#e2e8f0' }}
                                    onFocus={(e) => { if (!errores.confirmarPassword) e.target.style.borderColor = '#4D9FC1'; }}
                                    onBlur={(e) => { if (!errores.confirmarPassword) e.target.style.borderColor = '#e2e8f0'; }}
                                />
                                <button type="button" onClick={() => setVerConfirm(!verConfirm)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    aria-label={verConfirm ? 'Ocultar' : 'Mostrar'}>
                                    {verConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errores.confirmarPassword && (
                                <p className="text-xs text-red-500 flex items-center gap-1" role="alert">
                                    <AlertCircle className="w-3 h-3" /> {errores.confirmarPassword}
                                </p>
                            )}
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-800">
                            ℹ️ Tu cuenta quedará <strong>pendiente de validación</strong> hasta que
                            la OMIL Municipal verifique tu certificado de residencia.
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full py-3 px-4 rounded-xl text-white font-bold text-sm
                transition-all flex items-center justify-center gap-2
                disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{ backgroundColor: '#4D9FC1' }}>
                            {loading
                                ? <><Loader2 className="w-4 h-4 animate-spin" /> Registrando...</>
                                : 'Crear mi cuenta'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="font-semibold hover:underline" style={{ color: '#4D9FC1' }}>
                            Inicia sesión
                        </Link>
                    </p>

                    <p className="text-center text-xs text-slate-400">
                        © {new Date().getFullYear()} Municipalidad de Providencia — ProviEmplea
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistroTalento;