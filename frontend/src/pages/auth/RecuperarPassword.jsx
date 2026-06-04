// =============================================
// PROVIEMPLEA - RECUPERAR CONTRASEÑA
// archivo: src/pages/auth/RecuperarPassword.jsx
// descripción: Página para solicitar restablec-
// imiento de contraseña por correo electrónico.
// =============================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { validarCorreo } from '../../utils/validators';
import { AlertCircle, CheckCircle, Loader2, ArrowLeft, Mail } from 'lucide-react';

const RecuperarPassword = () => {
    const [correo, setCorreo] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [enviado, setEnviado] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorCorreo = validarCorreo(correo);
        if (errorCorreo) { setError(errorCorreo); return; }
        setLoading(true);
        // Simulación — el backend no tiene este endpoint aún
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setEnviado(true);
    };

    if (enviado) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6">
                <div style={{ backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '40px', maxWidth: '420px', width: '100%', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', backgroundColor: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <CheckCircle style={{ width: '40px', height: '40px', color: '#22C55E' }} />
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0F243E', marginBottom: '12px' }}>
                        Correo enviado
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                        Si el correo <strong>{correo}</strong> está registrado, recibirás
                        las instrucciones para restablecer tu contraseña.
                    </p>
                    <a href="/login" style={{ display: 'block', backgroundColor: '#4D9FC1', color: 'white', padding: '14px 24px', borderRadius: '12px', fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}>
                        Volver al login →
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-[#F8FAFC]">
            <div className="hidden lg:flex flex-col justify-between w-1/2 p-12"
                style={{ backgroundColor: '#0F243E' }}>
                <div>
                    <img src="/images/logo-proviemplea.png" alt="ProviEmplea"
                        className="h-14 w-auto" style={{ mixBlendMode: 'screen' }} />
                </div>
                <div className="space-y-4">
                    <h2 className="text-4xl font-black text-white leading-tight">
                        Recupera el acceso a tu cuenta de{' '}
                        <span style={{ color: '#4D9FC1' }}>ProviEmplea</span>
                    </h2>
                    <p className="text-slate-300 leading-relaxed">
                        Te enviaremos un correo con las instrucciones para restablecer
                        tu contraseña de forma segura.
                    </p>
                </div>
                <div>
                    <img src="/images/logo-providencia.png" alt="Municipalidad de Providencia"
                        className="h-16 w-auto opacity-60" style={{ mixBlendMode: 'screen' }} />
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md space-y-6">
                    <Link to="/login"
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Volver al login
                    </Link>

                    <div>
                        <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                            Recuperar contraseña
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Ingresa tu correo y te enviaremos las instrucciones.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div className="space-y-1.5">
                            <label htmlFor="correo" className="text-sm font-semibold text-slate-700">
                                Correo electrónico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    id="correo" type="email" value={correo}
                                    onChange={e => { setCorreo(e.target.value); setError(''); }}
                                    placeholder="tu@correo.cl"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none"
                                    style={{ borderColor: error ? '#EF4444' : '#e2e8f0' }}
                                    onFocus={e => { if (!error) e.target.style.borderColor = '#4D9FC1'; }}
                                    onBlur={e => { if (!error) e.target.style.borderColor = '#e2e8f0'; }}
                                />
                            </div>
                            {error && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {error}
                                </p>
                            )}
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full py-3 px-4 rounded-xl text-white font-bold text-sm
                transition-all flex items-center justify-center gap-2
                disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{ backgroundColor: '#4D9FC1' }}>
                            {loading
                                ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
                                : 'Enviar instrucciones'}
                        </button>
                    </form>

                    <p className="text-center text-xs text-slate-400">
                        © {new Date().getFullYear()} Municipalidad de Providencia — ProviEmplea
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RecuperarPassword;
