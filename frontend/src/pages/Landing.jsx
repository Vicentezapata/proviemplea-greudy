// =============================================
// PROVIEMPLEA - LANDING PAGE PRINCIPAL
// archivo: src/pages/Landing.jsx
// descripción: Página pública principal.
// =============================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Users, Building2, FileText, Shield, Eye,
    CheckCircle, ArrowRight, MapPin, Phone,
    Mail, Lock, ChevronDown, Star, Zap,
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube, FaXTwitter } from 'react-icons/fa6';
import AccesibilidadWidget from '../components/ui/AccesibilidadWidget';

// ── Carrusel ──
const slides = [
    { img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', titulo: 'Feria de Empleo 2025', desc: 'Más de 500 vecinos participaron' },
    { img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80', titulo: 'Networking Empresarial', desc: '80 empresas presentes' },
    { img: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&q=80', titulo: 'Talleres de Empleabilidad', desc: 'CV, entrevistas y más' },
    { img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80', titulo: 'Inclusión Laboral', desc: 'Ley 21.015 en acción' },
    { img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80', titulo: 'Capacitación Digital', desc: 'Habilidades para el futuro' },
];

const Carrusel = () => {
    const [actual, setActual] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActual((prev) => (prev + 1) % slides.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    const anterior = () => setActual((prev) => (prev - 1 + slides.length) % slides.length);
    const siguiente = () => setActual((prev) => (prev + 1) % slides.length);
    const visibles = [0, 1, 2].map((i) => slides[(actual + i) % slides.length]);

    return (
        <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibles.map((slide, idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden shadow-md border border-slate-100 group">
                        <div className="relative overflow-hidden h-48">
                            <img src={slide.img} alt={slide.titulo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-4">
                                <p className="text-white font-bold text-sm">{slide.titulo}</p>
                                <p className="text-white/80 text-xs">{slide.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
                <button onClick={anterior} className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-lg font-bold transition-all hover:bg-[#4D9FC1] hover:text-white" style={{ borderColor: '#4D9FC1', color: '#4D9FC1' }} aria-label="Anterior">‹</button>
                <div className="flex gap-2">
                    {slides.map((_, idx) => (
                        <button key={idx} onClick={() => setActual(idx)} className="h-2 rounded-full transition-all" style={{ backgroundColor: idx === actual ? '#4D9FC1' : '#CBD5E1', width: idx === actual ? '20px' : '8px' }} aria-label={`Slide ${idx + 1}`} />
                    ))}
                </div>
                <button onClick={siguiente} className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-lg font-bold transition-all hover:bg-[#4D9FC1] hover:text-white" style={{ borderColor: '#4D9FC1', color: '#4D9FC1' }} aria-label="Siguiente">›</button>
            </div>
        </div>
    );
};

const Landing = () => {
    const [faqAbierto, setFaqAbierto] = useState(null);

    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC]">

            {/* NAVBAR */}
            <nav style={{ backgroundColor: '#0F243E' }} className="sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/"><img src="/images/logo-proviemplea.png" alt="ProviEmplea" className="h-14 w-auto" style={{ mixBlendMode: 'screen' }} /></Link>
                        <div className="hidden md:flex items-center gap-6">
                            {[{ label: 'Cómo funciona', href: '#como-funciona' }, { label: 'Beneficios', href: '#beneficios' }, { label: 'Preguntas frecuentes', href: '#faq' }].map((item) => (
                                <a key={item.label} href={item.href} className="text-gray-300 hover:text-white text-sm transition-colors">{item.label}</a>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="text-gray-300 hover:text-white text-sm transition-colors">Iniciar sesión</Link>
                            <Link to="/registro/talento" style={{ backgroundColor: '#4D9FC1' }} className="text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">Crear perfil</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main id="main-content" className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

                    {/* HERO */}
                    <section className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[500px] flex items-center">
                        <div className="absolute inset-0">
                            <img src="/images/hero-costanera.jpg" alt="Santiago de Chile" className="w-full h-full object-cover" />
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,36,62,0.92) 0%, rgba(15,36,62,0.75) 50%, rgba(77,159,193,0.4) 100%)' }} />
                        </div>
                        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-14 py-16 flex flex-col lg:flex-row items-center gap-10 w-full">
                            <div className="max-w-2xl space-y-6">
                                <span style={{ backgroundColor: 'rgba(77,159,193,0.3)', borderColor: 'rgba(77,159,193,0.4)', color: '#eaf5fa' }} className="font-extrabold text-xs tracking-widest uppercase px-3.5 py-1.5 rounded-lg inline-flex items-center gap-2 border">
                                    🏛️ Ilustre Municipalidad de Providencia
                                </span>
                                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                                    Conectamos el talento de Providencia con{' '}
                                    <span style={{ color: '#4D9FC1' }}>nuevas oportunidades</span> laborales
                                </h1>
                                <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl">
                                    Una plataforma municipal inclusiva, transparente y segura. Vecinos conectados con empresas mediante CV Ciego.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link to="/registro/talento" style={{ backgroundColor: '#4D9FC1' }} className="inline-flex items-center gap-2 text-white font-bold px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity text-sm uppercase tracking-wide shadow-lg">
                                        Crear mi perfil <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link to="/registro/empresa" className="inline-flex items-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 font-bold px-6 py-3.5 rounded-xl transition-colors text-sm uppercase tracking-wide">
                                        Buscar talento
                                    </Link>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl max-w-sm w-full shadow-xl space-y-4">
                                <div className="flex items-center gap-2">
                                    <div style={{ backgroundColor: '#4D9FC1' }} className="text-white text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-lg flex items-center gap-1">
                                        <Eye className="w-3 h-3" /> CV Ciego
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-100 uppercase tracking-widest">Inclusión Real</span>
                                </div>
                                <h3 className="text-lg font-bold text-white leading-snug">Selección justa basada en experiencia y competencias.</h3>
                                <p className="text-xs text-slate-200 leading-relaxed">Sin nombre, foto ni datos personales. Eliminamos sesgos inconscientes.</p>
                                <div className="bg-black/20 p-3 rounded-xl border border-white/10 text-xs text-slate-300 flex items-center gap-2">
                                    <Shield className="w-4 h-4 shrink-0" style={{ color: '#4D9FC1' }} />
                                    <span>Soporte Oficial Departamento de Empleo Municipal</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* MÉTRICAS */}
                    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { count: '12.000+', label: 'Vecinos registrados', icon: Users, color: '#4D9FC1' },
                            { count: '450+', label: 'Empresas activas', icon: Building2, color: '#6366f1' },
                            { count: '2.300+', label: 'Procesos gestionados', icon: FileText, color: '#22C55E' },
                            { count: '89%', label: 'Satisfacción usuaria', icon: Star, color: '#F59E0B' },
                        ].map((m, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                                <div className="p-3 rounded-xl shrink-0" style={{ backgroundColor: `${m.color}15` }}>
                                    <m.icon className="w-5 h-5" style={{ color: m.color }} />
                                </div>
                                <div>
                                    <p className="text-2xl font-black tracking-tight" style={{ color: '#0F243E' }}>{m.count}</p>
                                    <p className="text-xs text-slate-500 font-medium">{m.label}</p>
                                </div>
                            </div>
                        ))}
                    </section>



                    {/* CÓMO FUNCIONA */}
                    <section id="como-funciona" className="space-y-8">
                        <div className="text-center space-y-2">
                            <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#4D9FC1' }}>Metodología Comunal</span>
                            <h2 className="text-2xl sm:text-3xl font-black" style={{ color: '#0F243E' }}>¿Cómo funciona ProviEmplea?</h2>
                            <div className="w-16 h-1 mx-auto rounded" style={{ backgroundColor: '#4D9FC1' }} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {[
                                { step: '01', title: 'Crea tu perfil', desc: 'Regístrate y completa tu información laboral.' },
                                { step: '02', title: 'CV Ciego activado', desc: 'Tu experiencia visible, datos personales protegidos.' },
                                { step: '03', title: 'Filtro Empresas', desc: 'Empresas buscan candidatos por habilidades.' },
                                { step: '04', title: 'Intermediación', desc: 'La OMIL acompaña el proceso de contacto.' },
                                { step: '05', title: 'Participa y Gana', desc: 'Recibe solicitudes y sigue tus oportunidades.' },
                            ].map((s, idx) => (
                                <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col gap-3 relative pt-10">
                                    <span className="absolute top-3 right-4 text-4xl font-black opacity-10" style={{ color: '#4D9FC1' }}>{s.step}</span>
                                    <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs" style={{ backgroundColor: '#0F243E' }}>{idx + 1}</div>
                                    <div>
                                        <h3 className="font-extrabold text-sm" style={{ color: '#0F243E' }}>{s.title}</h3>
                                        <p className="text-xs text-slate-500 leading-relaxed mt-1">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CARRUSEL */}
                    <section className="space-y-8">
                        <div className="text-center space-y-2">
                            <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#4D9FC1' }}>Galería</span>
                            <h2 className="text-2xl sm:text-3xl font-black" style={{ color: '#0F243E' }}>Ferias de Empleo Providencia</h2>
                            <div className="w-16 h-1 mx-auto rounded" style={{ backgroundColor: '#4D9FC1' }} />
                            <p className="text-slate-500 text-sm max-w-lg mx-auto">Conectamos a vecinos y empresas en instancias organizadas por la OMIL de Providencia.</p>
                        </div>
                        <Carrusel />
                    </section>

                    {/* ALIANZAS */}
                    <section className="space-y-8">
                        <div className="text-center space-y-2">
                            <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#4D9FC1' }}>Empresas Socias</span>
                            <h2 className="text-2xl sm:text-3xl font-black" style={{ color: '#0F243E' }}>Nuestras alianzas estratégicas</h2>
                            <div className="w-16 h-1 mx-auto rounded" style={{ backgroundColor: '#4D9FC1' }} />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {[
                                { nombre: 'Falabella', inicial: 'F', color: '#4D9FC1' },
                                { nombre: 'Ripley', inicial: 'R', color: '#0F243E' },
                                { nombre: 'Sodimac', inicial: 'S', color: '#22C55E' },
                                { nombre: 'Banco Chile', inicial: 'B', color: '#6366f1' },
                                { nombre: 'Entel', inicial: 'E', color: '#F59E0B' },
                                { nombre: 'Claro', inicial: 'C', color: '#EF4444' },
                                { nombre: 'Walmart', inicial: 'W', color: '#4D9FC1' },
                                { nombre: 'Cencosud', inicial: 'C', color: '#0F243E' },
                                { nombre: 'Cruz Verde', inicial: 'CV', color: '#22C55E' },
                                { nombre: 'Líder', inicial: 'L', color: '#6366f1' },
                                { nombre: 'Paris', inicial: 'P', color: '#F59E0B' },
                                { nombre: 'Easy', inicial: 'E', color: '#EF4444' },
                            ].map((empresa, idx) => (
                                <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 p-4 flex flex-col items-center gap-3 cursor-pointer group">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg transition-transform group-hover:scale-110" style={{ backgroundColor: empresa.color }}>
                                        {empresa.inicial}
                                    </div>
                                    <p className="text-xs font-semibold text-slate-600 text-center">{empresa.nombre}</p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <p className="text-slate-500 text-sm mb-4">¿Tu empresa quiere ser parte de ProviEmplea?</p>
                            <Link to="/registro/empresa" className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-opacity hover:opacity-90 text-sm text-white" style={{ backgroundColor: '#4D9FC1' }}>
                                Únete como empresa socia <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </section>



                    {/* CV CIEGO */}
                    <section style={{ backgroundColor: '#0F243E' }} className="text-white rounded-3xl p-8 sm:p-14 shadow-xl border border-white/10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            <div className="space-y-6">
                                <span className="font-bold text-xs uppercase px-3 py-1 rounded-md inline-block border" style={{ backgroundColor: 'rgba(77,159,193,0.2)', color: '#4D9FC1', borderColor: 'rgba(77,159,193,0.3)' }}>
                                    Estrategia Antisesgo Certificada
                                </span>
                                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">El valor del Currículum Ciego</h2>
                                <p className="text-sm text-slate-300 leading-relaxed">ProviEmplea promueve procesos de selección más justos al ocultar información personal.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-black/20 p-4 rounded-xl border border-red-500/10">
                                        <span className="text-red-400 font-bold text-xs block uppercase mb-2">❌ Se oculta</span>
                                        <ul className="text-xs text-slate-300 space-y-1">{['Nombre completo', 'Edad', 'Género', 'Dirección', 'Fotografía'].map(i => <li key={i}>• {i}</li>)}</ul>
                                    </div>
                                    <div className="bg-black/20 p-4 rounded-xl border border-emerald-500/10">
                                        <span className="text-emerald-400 font-bold text-xs block uppercase mb-2">✔ Se muestra</span>
                                        <ul className="text-xs text-slate-300 space-y-1">{['Experiencia', 'Competencias', 'Formación', 'Idiomas', 'Disponibilidad'].map(i => <li key={i}>• {i}</li>)}</ul>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white text-slate-800 p-6 rounded-2xl shadow-2xl space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                    <div>
                                        <p className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">Código Oficial</p>
                                        <h4 className="text-base font-black" style={{ color: '#0F243E' }}>TALENTO PVD-2026-154</h4>
                                        <p className="text-xs font-bold mt-0.5" style={{ color: '#4D9FC1' }}>Analista de Datos Junior</p>
                                    </div>
                                    <div className="bg-emerald-100 text-emerald-800 font-mono text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase">CV Ciego ✓</div>
                                </div>
                                <div className="space-y-3 text-xs">
                                    {[{ label: 'Disponibilidad', value: 'Inmediata • Jornada Completa' }, { label: 'Experiencia', value: '5 años en Retail & Datos' }, { label: 'Formación', value: 'Ing. Comercial / Data Science' }, { label: 'Idiomas', value: 'Inglés B2 — Avanzado' }].map(({ label, value }) => (
                                        <div key={label}>
                                            <p className="text-[10px] font-bold uppercase text-slate-400">{label}</p>
                                            <p className="font-semibold text-slate-700 mt-0.5">{value}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-[10px] text-indigo-900 flex items-start gap-1.5">
                                    <Lock className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#0F243E' }} />
                                    <span>Datos de identidad se revelan solo previa aprobación del vecino.</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* BENEFICIOS */}
                    <section id="beneficios" className="space-y-8">
                        <div className="text-center space-y-2">
                            <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#4D9FC1' }}>Beneficios Para Todos</span>
                            <h2 className="text-2xl sm:text-3xl font-black" style={{ color: '#0F243E' }}>Potenciamos el ecosistema laboral de Providencia</h2>
                            <div className="w-16 h-1 mx-auto rounded" style={{ backgroundColor: '#4D9FC1' }} />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {[
                                { icon: Users, color: '#4D9FC1', titulo: 'Para vecinos', desc: 'Toma control de tu carrera con igualdad real.', items: ['Perfil laboral guiado', 'Subir CV en línea', 'Destacar por competencias', 'Recibir solicitudes'], cta: 'Registrarme', to: '/registro/talento' },
                                { icon: Building2, color: '#6366f1', titulo: 'Para empresas socias', desc: 'Accede al mejor talento local verificado.', items: ['Buscar por habilidades', 'Filtrar por experiencia', 'Solicitar contacto OMIL', 'Seguimiento de fases'], cta: 'Registrar empresa', to: '/registro/empresa' },
                                { icon: Shield, color: '#22C55E', titulo: 'Para la OMIL Municipal', desc: 'Canal integral de intermediación oficial.', items: ['Validar perfiles', 'Gestionar solicitudes', 'Intermediar contactos', 'Analíticas Ley 21.015'], cta: 'Acceso OMIL', to: '/login' },
                            ].map((card, idx) => (
                                <div key={idx} className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col hover:-translate-y-1">
                                    <div className="space-y-4 flex-1">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${card.color}15` }}>
                                            <card.icon className="w-6 h-6" style={{ color: card.color }} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold" style={{ color: '#0F243E' }}>{card.titulo}</h3>
                                            <p className="text-xs text-slate-500 mt-1">{card.desc}</p>
                                        </div>
                                        <ul className="space-y-2">
                                            {card.items.map((item) => (
                                                <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                                                    <CheckCircle className="w-3.5 h-3.5 shrink-0 text-emerald-500" />{item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <Link to={card.to} className="mt-6 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-white text-xs font-bold uppercase tracking-wide rounded-xl transition-opacity hover:opacity-90" style={{ backgroundColor: '#0F243E' }}>
                                        {card.cta} <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Preguntas Frecuentes */}
                    <section id="faq" className="space-y-6">
                        <div className="text-center space-y-2">
                            <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#4D9FC1' }}>Preguntas frecuentes</span>
                            <h2 className="text-2xl sm:text-3xl font-black" style={{ color: '#0F243E' }}>¿Tienes dudas?</h2>
                            <div className="w-16 h-1 mx-auto rounded" style={{ backgroundColor: '#4D9FC1' }} />
                        </div>
                        <div className="max-w-2xl mx-auto space-y-3">
                            {[
                                { q: '¿Quién puede registrarse?', a: 'Vecinos y vecinasde Providencia con certificado de residencia válido.' },
                                { q: '¿Qué es el CV Ciego?', a: 'Perfil que oculta nombre, edad, género y foto para eliminar sesgos.' },
                                { q: '¿Tiene costo para los vecinos y vecinas de Providencia?', a: 'No, ProviEmplea es completamente gratuito.' },
                                { q: '¿Cómo se valida mi cuenta?', a: 'La OMIL Municipal revisa tu certificado en 24 a 48 horas hábiles.' },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                    <button onClick={() => setFaqAbierto(faqAbierto === idx ? null : idx)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors" aria-expanded={faqAbierto === idx}>
                                        <span className="font-semibold text-sm pr-4" style={{ color: '#0F243E' }}>{item.q}</span>
                                        <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${faqAbierto === idx ? 'rotate-180' : ''}`} style={{ color: '#4D9FC1' }} />
                                    </button>
                                    {faqAbierto === idx && (
                                        <div className="px-5 pb-5"><p className="text-sm text-slate-500 leading-relaxed">{item.a}</p></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA FINAL */}
                    <section style={{ background: 'linear-gradient(135deg, #0F243E, #4D9FC1)' }} className="rounded-3xl p-10 sm:p-14 text-center text-white shadow-xl">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Zap className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-black mb-4 tracking-tight">Tu próxima oportunidad te está esperando</h2>
                        <p className="text-white/80 text-sm sm:text-base mb-8 max-w-xl mx-auto">Únete a la comunidad de vecinos y vecinas de Providencia que ya conectan con empresas comprometidas.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/registro/talento" className="inline-flex items-center justify-center gap-2 bg-white font-bold px-8 py-3.5 rounded-xl hover:bg-slate-50 transition-colors text-sm uppercase tracking-wide" style={{ color: '#0F243E' }}>
                                Registrarme gratis <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link to="/registro/empresa" className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-sm uppercase tracking-wide">
                                Soy empresa
                            </Link>
                        </div>
                    </section>

                </div>
            </main>

            {/* FOOTER */}
            <footer style={{ backgroundColor: '#0F243E' }} className="text-gray-400 mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <img src="/images/logo-proviemplea.png" alt="ProviEmplea" className="h-20 w-auto mb-4" style={{ mixBlendMode: 'screen' }} />
                            <p className="text-sm leading-relaxed">Plataforma digital de empleabilidad de la Municipalidad de Providencia.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Plataforma</h4>
                            <div className="space-y-2">
                                {[{ to: '/login', label: 'Iniciar sesión' }, { to: '/registro/talento', label: 'Registro vecinos' }, { to: '/registro/empresa', label: 'Registro empresas' }].map(({ to, label }) => (
                                    <Link key={to} to={to} className="block text-sm hover:text-white transition-colors">{label}</Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Contacto OMIL</h4>
                            <div className="space-y-3">
                                {[{ icon: MapPin, text: 'Av. Pedro de Valdivia 924' }, { icon: Phone, text: '+56 2 2374 8900' }, { icon: Mail, text: 'empleo@providencia.cl' }].map(({ icon: Icon, text }) => (
                                    <div key={text} className="flex items-start gap-2.5 text-sm">
                                        <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#4D9FC1' }} />
                                        <span>{text}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-3 mt-5">
                                {[
                                    { icon: FaFacebook, href: 'https://facebook.com/municipalidadprovidencia', label: 'Facebook' },
                                    { icon: FaInstagram, href: 'https://instagram.com/municipalidadprovidencia', label: 'Instagram' },
                                    { icon: FaYoutube, href: 'https://youtube.com/municipalidadprovidencia', label: 'YouTube' },
                                    { icon: FaXTwitter, href: 'https://twitter.com/mprovidencia', label: 'X Twitter' },
                                ].map(({ icon: Icon, href, label }) => (
                                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:opacity-80" style={{ backgroundColor: 'rgba(77,159,193,0.2)', color: '#4D9FC1' }}>
                                        <Icon size={16} />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-4">
                            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Municipalidad</h4>
                            <img src="/images/logo-providencia.png" alt="Municipalidad de Providencia" className="h-24 w-auto opacity-90 hover:opacity-100 transition-opacity" style={{ mixBlendMode: 'screen' }} />
                            <p className="text-xs text-gray-500">© {new Date().getFullYear()} Todos los derechos reservados.</p>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-6 text-center">
                        <p className="text-xs text-gray-600">Desarrollado con ❤️ para la comunidad de Providencia</p>
                    </div>
                </div>
            </footer>

            {/* Widget Accesibilidad */}
            <AccesibilidadWidget /> {/* <AccesibilidadWidget /> */}

        </div>
    );
};

export default Landing;