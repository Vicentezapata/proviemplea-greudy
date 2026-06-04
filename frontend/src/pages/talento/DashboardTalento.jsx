// =============================================
// PROVIEMPLEA - DASHBOARD TALENTO
// archivo: src/pages/talento/DashboardTalento.jsx
// descripción: Panel principal del vecino/a.
// Muestra KPIs, estado de validación, empresas
// interesadas y accesos rápidos al perfil.
// =============================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { talentoService } from '../../services/api';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import {
    User, FileText, Briefcase, Clock, Eye,
    ArrowRight, CheckCircle, AlertTriangle, Upload
} from 'lucide-react';

const DashboardTalento = () => {
    const { usuario } = useAuth();
    const [estadisticas, setEstadisticas] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await talentoService.getEstadisticas();
                setEstadisticas(res.data.data);
            } catch {
                setEstadisticas({
                    empresas_interesadas: 0,
                    procesos_activos: 0,
                    perfil_visto: 0,
                    solicitudes_total: 0,
                });
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    const kpis = [
        { label: 'Empresas interesadas', valor: estadisticas?.empresas_interesadas ?? 0, icon: Eye, color: '#4D9FC1' },
        { label: 'Procesos activos', valor: estadisticas?.procesos_activos ?? 0, icon: Briefcase, color: '#6366f1' },
        { label: 'Veces visto mi CV', valor: estadisticas?.perfil_visto ?? 0, icon: User, color: '#22C55E' },
        { label: 'Total solicitudes', valor: estadisticas?.solicitudes_total ?? 0, icon: FileText, color: '#F59E0B' },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main id="main-content" className="flex-1 space-y-6">

                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                    Bienvenido/a 👋
                                </h1>
                                <p className="text-slate-500 text-sm mt-1">
                                    {usuario?.correo} — Panel de vecino/a
                                </p>
                            </div>
                            <Link to="/talento/perfil"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                  text-white text-sm font-semibold transition-opacity hover:opacity-90"
                                style={{ backgroundColor: '#4D9FC1' }}>
                                Mi perfil <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Banner validación pendiente */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5
              flex items-start gap-4">
                            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center
                justify-center shrink-0">
                                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-yellow-800 text-sm">
                                    Cuenta pendiente de validación
                                </p>
                                <p className="text-yellow-700 text-xs mt-1">
                                    La OMIL Municipal está revisando tu certificado de residencia.
                                    Te notificaremos cuando tu cuenta sea aprobada (24-48 hrs hábiles).
                                </p>
                            </div>
                            <Link to="/talento/archivos"
                                className="inline-flex items-center gap-1.5 text-xs font-bold
                  text-yellow-800 hover:text-yellow-900 transition-colors shrink-0">
                                <Upload className="w-3.5 h-3.5" />
                                Subir documentos
                            </Link>
                        </div>

                        {/* KPIs */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {kpis.map((kpi, idx) => (
                                <div key={idx} className="bg-white rounded-2xl border border-slate-100
                  shadow-sm p-5 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-medium text-slate-500">{kpi.label}</p>
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                            style={{ backgroundColor: `${kpi.color}15` }}>
                                            <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
                                        </div>
                                    </div>
                                    <p className="text-3xl font-black" style={{ color: '#0F243E' }}>
                                        {loading ? '—' : kpi.valor}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Accesos rápidos */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { titulo: 'Completar mi perfil', desc: 'Agrega experiencia, educación y competencias', icon: User, to: '/talento/completar-perfil', color: '#4D9FC1' },
                                { titulo: 'Ver mi CV Ciego', desc: 'Así te ven las empresas que te buscan', icon: Eye, to: '/talento/cv-ciego', color: '#6366f1' },
                                { titulo: 'Mis solicitudes', desc: 'Empresas interesadas en tu perfil', icon: Briefcase, to: '/talento/solicitudes', color: '#22C55E' },
                                { titulo: 'Subir documentos', desc: 'Certificado de residencia y CV', icon: Upload, to: '/talento/archivos', color: '#F59E0B' },
                                { titulo: 'Historial de procesos', desc: 'Timeline de tus oportunidades', icon: Clock, to: '/talento/historial', color: '#EF4444' },
                                { titulo: 'Mi perfil completo', desc: 'Ver y editar todos tus datos', icon: FileText, to: '/talento/perfil', color: '#0F243E' },
                            ].map((item, idx) => (
                                <Link key={idx} to={item.to}
                                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5
                    hover:shadow-md transition-all hover:-translate-y-0.5 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${item.color}15` }}>
                                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm" style={{ color: '#0F243E' }}>{item.titulo}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardTalento;
