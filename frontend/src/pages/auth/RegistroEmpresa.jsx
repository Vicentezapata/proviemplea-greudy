// =============================================
// PROVIEMPLEA - REGISTRO EMPRESA
// archivo: src/pages/auth/RegistroEmpresa.jsx
// =============================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/api';
import { validarCorreo, validarPassword, validarConfirmPassword, validarRUT, validarRequerido } from '../../utils/validators';
import { AlertCircle, CheckCircle, Loader2, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const RegistroEmpresa = () => {
    const [form, setForm] = useState({
        correo: '', password: '', confirmarPassword: '',
        rut_empresa: '', nombre_empresa: '',
    });
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
        const eNombre = validarRequerido(form.nombre_empresa, 'El nombre de la empresa');
        const eRut = validarRUT(form.rut_empresa);
        const eCorreo = validarCorreo(form.correo);
        const ePassword = validarPassword(form.password);
        const eConfirm = validarConfirmPassword(form.password, form.confirmarPassword);
        if (eNombre) nuevosErrores.nombre_empresa = eNombre;
        if (eRut) nuevosErrores.rut_empresa = eRut;
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
            await authService.registrarEmpresa({
                correo: form.correo,
                password: form.password,
                rut_empresa: form.rut_empresa,
                nombre_empresa: form.nombre_empresa,
            });
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
                        ¡Empresa registrada!
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                        Tu empresa ha sido registrada exitosamente. Inicia sesión para acceder a la vitrina de talentos.
                    </p>
                    <a href="/login" style={{ display: 'block', backgroundColor: '#4D9FC1', color: 'white', padding: '14px 24px', borderRadius: '12px', fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}>
                        Iniciar sesión →
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-[#F8FAFC]">
            <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
                style={{ backgroundColor: '#0F243E' }}>
                <div>
                    <img src="/images/logo-proviemplea.png" alt="ProviEmplea"
                        className="h-14 w-auto" style={{ mixBlendMode: 'screen' }} />
                </div>
                <div className="space-y-6 relative z-10">
                    <h2 className="text-4xl font-black text-white leading-tight">
                        Accede al mejor talento local de{' '}
                        <span style={{ color: '#4D9FC1' }}>Providencia</span>
                    </h2>
                    <p className="text-slate-300 leading-relaxed">
                        Regístra tu empresa y busca candidatos verificados por la Municipalidad de Providencia mediante CV Ciego.
                    </p>
                    <ul className="space-y-3">
                        {['Acceso a vitrina de talentos', 'Candidatos verificados por OMIL', 'Búsqueda por habilidades', 'Seguimiento de procesos'].map((item) => (
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

            <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md space-y-6">
                    <Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Volver al login
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>Registrar empresa</h1>
                        <p className="text-slate-500 text-sm mt-1">Completa los datos de tu empresa para comenzar.</p>
                    </div>

                    {errorApi && (
                        <div className="flex items-start gap-3 p-4 rounded-xl border bg-red-50 border-red-200" role="alert">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700">{errorApi}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                        <div className="space-y-1.5">
                            <label htmlFor="nombre_empresa" className="text-sm font-semibold text-slate-700">Nombre de la empresa</label>
                            <input id="nombre_empresa" name="nombre_empresa" type="text"
                                value={form.nombre_empresa} onChange={handleChange}
                                placeholder="Tech Solutions SpA"
                                className="w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none"
                                style={{ borderColor: errores.nombre_empresa ? '#EF4444' : '#e2e8f0' }}
                                onFocus={(e) => { if (!errores.nombre_empresa) e.target.style.borderColor = '#4D9FC1'; }}
                                onBlur={(e) => { if (!errores.nombre_empresa) e.target.style.borderColor = '#e2e8f0'; }}
                            />
                            {errores.nombre_empresa && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errores.nombre_empresa}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="rut_empresa" className="text-sm font-semibold text-slate-700">RUT de la empresa</label>
                            <input id="rut_empresa" name="rut_empresa" type="text"
                                value={form.rut_empresa} onChange={handleChange}
                                placeholder="76.123.456-7"
                                className="w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none"
                                style={{ borderColor: errores.rut_empresa ? '#EF4444' : '#e2e8f0' }}
                                onFocus={(e) => { if (!errores.rut_empresa) e.target.style.borderColor = '#4D9FC1'; }}
                                onBlur={(e) => { if (!errores.rut_empresa) e.target.style.borderColor = '#e2e8f0'; }}
                            />
                            {errores.rut_empresa && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errores.rut_empresa}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="correo" className="text-sm font-semibold text-slate-700">Correo empresarial</label>
                            <input id="correo" name="correo" type="email"
                                value={form.correo} onChange={handleChange}
                                placeholder="rrhh@empresa.cl"
                                className="w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none"
                                style={{ borderColor: errores.correo ? '#EF4444' : '#e2e8f0' }}
                                onFocus={(e) => { if (!errores.correo) e.target.style.borderColor = '#4D9FC1'; }}
                                onBlur={(e) => { if (!errores.correo) e.target.style.borderColor = '#e2e8f0'; }}
                            />
                            {errores.correo && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errores.correo}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="password" className="text-sm font-semibold text-slate-700">Contraseña</label>
                            <div className="relative">
                                <input id="password" name="password"
                                    type={verPassword ? 'text' : 'password'}
                                    value={form.password} onChange={handleChange}
                                    placeholder="Mínimo 8 caracteres, 1 mayúscula y 1 número"
                                    className="w-full px-4 py-3 pr-12 rounded-xl border text-sm transition-all outline-none"
                                    style={{ borderColor: errores.password ? '#EF4444' : '#e2e8f0' }}
                                    onFocus={(e) => { if (!errores.password) e.target.style.borderColor = '#4D9FC1'; }}
                                    onBlur={(e) => { if (!errores.password) e.target.style.borderColor = '#e2e8f0'; }}
                                />
                                <button type="button" onClick={() => setVerPassword(!verPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    {verPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errores.password && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errores.password}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="confirmarPassword" className="text-sm font-semibold text-slate-700">Confirmar contraseña</label>
                            <div className="relative">
                                <input id="confirmarPassword" name="confirmarPassword"
                                    type={verConfirm ? 'text' : 'password'}
                                    value={form.confirmarPassword} onChange={handleChange}
                                    placeholder="Repite tu contraseña"
                                    className="w-full px-4 py-3 pr-12 rounded-xl border text-sm transition-all outline-none"
                                    style={{ borderColor: errores.confirmarPassword ? '#EF4444' : '#e2e8f0' }}
                                    onFocus={(e) => { if (!errores.confirmarPassword) e.target.style.borderColor = '#4D9FC1'; }}
                                    onBlur={(e) => { if (!errores.confirmarPassword) e.target.style.borderColor = '#e2e8f0'; }}
                                />
                                <button type="button" onClick={() => setVerConfirm(!verConfirm)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    {verConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errores.confirmarPassword && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errores.confirmarPassword}</p>}
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full py-3 px-4 rounded-xl text-white font-bold text-sm
                transition-all flex items-center justify-center gap-2
                disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{ backgroundColor: '#4D9FC1' }}>
                            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Registrando...</> : 'Registrar empresa'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="font-semibold hover:underline" style={{ color: '#4D9FC1' }}>Inicia sesión</Link>
                    </p>
                    <p className="text-center text-xs text-slate-400">
                        © {new Date().getFullYear()} Municipalidad de Providencia — ProviEmplea
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistroEmpresa;
