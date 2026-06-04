// =============================================
// PROVIEMPLEA - PÁGINA DE LOGIN
// archivo: src/pages/auth/Login.jsx
// descripción: Página de inicio de sesión.
// Maneja autenticación con JWT, validación
// de formulario, estados de carga y error.
// Redirige según el rol del usuario al login.
// =============================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validarCorreo, validarRequerido } from '../../utils/validators';
import { Briefcase, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';

const Login = () => {
    const [form, setForm] = useState({ correo: '', password: '' });
    const [errores, setErrores] = useState({});
    const [errorApi, setErrorApi] = useState('');
    const [loading, setLoading] = useState(false);
    const [verPassword, setVerPassword] = useState(false);

    const { login, getDashboardRuta } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrores({ ...errores, [e.target.name]: '' });
        setErrorApi('');
    };

    const validar = () => {
        const nuevosErrores = {};
        const errorCorreo = validarCorreo(form.correo);
        const errorPassword = validarRequerido(form.password, 'La contraseña');
        if (errorCorreo) nuevosErrores.correo = errorCorreo;
        if (errorPassword) nuevosErrores.password = errorPassword;
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validar()) return;
        setLoading(true);
        setErrorApi('');
        try {
            const usuario = await login(form.correo, form.password);
            // Redirigir según el rol del usuario recién logueado
            if (usuario?.id_rol === 1) navigate('/admin/dashboard');
            else if (usuario?.id_rol === 3) navigate('/empresa/dashboard');
            else navigate('/talento/dashboard');
        } catch (err) {
            setErrorApi(
                err.response?.data?.message ||
                'Correo o contraseña incorrectos. Por favor intenta nuevamente.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#F8FAFC]">

            {/* ── Panel izquierdo — decorativo ── */}
            <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
                style={{ backgroundColor: '#0F243E' }}>
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #4D9FC1 0%, transparent 60%)' }} />

                {/* Logo */}
                <div>
                    <img src="/images/logo-proviemplea.png" alt="ProviEmplea"
                        className="h-14 w-auto" style={{ mixBlendMode: 'screen' }} />
                </div>

                {/* Contenido central */}
                <div className="space-y-6 relative z-10">
                    <h2 className="text-4xl font-black text-white leading-tight">
                        Conectamos el talento de Providencia con{' '}
                        <span style={{ color: '#4D9FC1' }}>nuevas oportunidades</span>
                    </h2>
                    <p className="text-slate-300 leading-relaxed">
                        Plataforma oficial de empleabilidad de la Municipalidad de Providencia.
                        Ingresa para gestionar tu perfil y oportunidades laborales.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4">
                        {[
                            { valor: '12.000+', label: 'Vecinos' },
                            { valor: '450+', label: 'Empresas' },
                            { valor: '89%', label: 'Satisfacción' },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white/10 rounded-xl p-4 text-center">
                                <p className="text-2xl font-black text-white">{stat.valor}</p>
                                <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer panel */}
                <div>
                    <img src="/images/logo-providencia.png" alt="Municipalidad de Providencia"
                        className="h-16 w-auto opacity-60" style={{ mixBlendMode: 'screen' }} />
                </div>
            </div>

            {/* ── Panel derecho — formulario ── */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md space-y-8">

                    {/* Logo mobile */}
                    <div className="lg:hidden flex justify-center">
                        <img src="/images/logo-proviemplea.png" alt="ProviEmplea"
                            className="h-12 w-auto" />
                    </div>

                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                            Bienvenido/a de vuelta
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Ingresa tus credenciales para acceder a tu cuenta.
                        </p>
                    </div>

                    {/* Error API */}
                    {errorApi && (
                        <div className="flex items-start gap-3 p-4 rounded-xl border bg-red-50 border-red-200" role="alert">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700">{errorApi}</p>
                        </div>
                    )}

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                        {/* Correo */}
                        <div className="space-y-1.5">
                            <label htmlFor="correo" className="text-sm font-semibold text-slate-700">
                                Correo electrónico
                            </label>
                            <input
                                id="correo"
                                name="correo"
                                type="email"
                                value={form.correo}
                                onChange={handleChange}
                                placeholder="tu@correo.cl"
                                autoComplete="email"
                                aria-invalid={!!errores.correo}
                                aria-describedby={errores.correo ? 'correo-error' : undefined}
                                className="w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none"
                                style={{
                                    borderColor: errores.correo ? '#EF4444' : '#e2e8f0',
                                    boxShadow: errores.correo ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none',
                                }}
                                onFocus={(e) => {
                                    if (!errores.correo) e.target.style.borderColor = '#4D9FC1';
                                    if (!errores.correo) e.target.style.boxShadow = '0 0 0 3px rgba(77,159,193,0.15)';
                                }}
                                onBlur={(e) => {
                                    if (!errores.correo) e.target.style.borderColor = '#e2e8f0';
                                    if (!errores.correo) e.target.style.boxShadow = 'none';
                                }}
                            />
                            {errores.correo && (
                                <p id="correo-error" className="text-xs text-red-500 flex items-center gap-1" role="alert">
                                    <AlertCircle className="w-3 h-3" /> {errores.correo}
                                </p>
                            )}
                        </div>

                        {/* Contraseña */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                                    Contraseña
                                </label>
                                <Link to="/recuperar-password"
                                    className="text-xs font-medium hover:underline"
                                    style={{ color: '#4D9FC1' }}>
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={verPassword ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Tu contraseña"
                                    autoComplete="current-password"
                                    aria-invalid={!!errores.password}
                                    aria-describedby={errores.password ? 'password-error' : undefined}
                                    className="w-full px-4 py-3 pr-12 rounded-xl border text-sm transition-all outline-none"
                                    style={{
                                        borderColor: errores.password ? '#EF4444' : '#e2e8f0',
                                        boxShadow: errores.password ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none',
                                    }}
                                    onFocus={(e) => {
                                        if (!errores.password) e.target.style.borderColor = '#4D9FC1';
                                        if (!errores.password) e.target.style.boxShadow = '0 0 0 3px rgba(77,159,193,0.15)';
                                    }}
                                    onBlur={(e) => {
                                        if (!errores.password) e.target.style.borderColor = '#e2e8f0';
                                        if (!errores.password) e.target.style.boxShadow = 'none';
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setVerPassword(!verPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    aria-label={verPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {verPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errores.password && (
                                <p id="password-error" className="text-xs text-red-500 flex items-center gap-1" role="alert">
                                    <AlertCircle className="w-3 h-3" /> {errores.password}
                                </p>
                            )}
                        </div>

                        {/* Botón submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 rounded-xl text-white font-bold text-sm
                transition-all flex items-center justify-center gap-2
                disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{ backgroundColor: '#4D9FC1' }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Ingresando...
                                </>
                            ) : 'Ingresar'}
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-[#F8FAFC] px-3 text-slate-400">¿No tienes cuenta?</span>
                        </div>
                    </div>

                    {/* Links registro */}
                    <div className="grid grid-cols-3 gap-3">
                        <Link to="/registro/talento"
                            className="flex items-center justify-center py-2.5 px-4 rounded-xl
      border-2 text-xs font-semibold transition-all hover:bg-slate-50"
                            style={{ borderColor: '#0F243E', color: '#0F243E' }}>
                            Soy vecino/a
                        </Link>
                        <Link to="/registro/empresa"
                            className="flex items-center justify-center py-2.5 px-4 rounded-xl
      border-2 text-xs font-semibold transition-all hover:bg-slate-50"
                            style={{ borderColor: '#4D9FC1', color: '#4D9FC1' }}>
                            Soy empresa
                        </Link>
                        <Link to="/registro/omil"
                            className="flex items-center justify-center py-2.5 px-4 rounded-xl
      border-2 text-xs font-semibold transition-all hover:bg-slate-50"
                            style={{ borderColor: '#22C55E', color: '#22C55E' }}>
                            OMIL Municipal
                        </Link>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-xs text-slate-400">
                        © {new Date().getFullYear()} Municipalidad de Providencia — ProviEmplea
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
