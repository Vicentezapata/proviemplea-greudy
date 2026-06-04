// =============================================
// PROVIEMPLEA - EXPORTACIÓN ADMIN
// archivo: src/pages/admin/Exportacion.jsx
// descripción: Exportación de reportes en
// diferentes formatos para la OMIL Municipal.
// =============================================

import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import {
    Download, FileText, Users, Building2,
    Briefcase, BarChart3, CheckCircle, Loader2
} from 'lucide-react';

const reportes = [
    {
        id: 'talentos',
        titulo: 'Reporte de Talentos',
        desc: 'Lista completa de vecinos registrados con estado de validación.',
        icon: Users,
        color: '#4D9FC1',
        formatos: ['Excel', 'CSV', 'PDF'],
    },
    {
        id: 'empresas',
        titulo: 'Reporte de Empresas',
        desc: 'Empresas socias registradas con sus datos y actividad.',
        icon: Building2,
        color: '#6366f1',
        formatos: ['Excel', 'CSV', 'PDF'],
    },
    {
        id: 'solicitudes',
        titulo: 'Reporte de Solicitudes',
        desc: 'Historial de procesos de contacto empresa → talento.',
        icon: Briefcase,
        color: '#22C55E',
        formatos: ['Excel', 'CSV', 'PDF'],
    },
    {
        id: 'estadisticas',
        titulo: 'Reporte Estadístico',
        desc: 'KPIs y analíticas generales del sistema ProviEmplea.',
        icon: BarChart3,
        color: '#F59E0B',
        formatos: ['Excel', 'PDF'],
    },
    {
        id: 'ley21015',
        titulo: 'Reporte Ley 21.015',
        desc: 'Inclusión laboral — talentos y contrataciones con discapacidad.',
        icon: CheckCircle,
        color: '#8B5CF6',
        formatos: ['Excel', 'PDF'],
    },
];

const Exportacion = () => {
    const [descargando, setDescargando] = useState(null);
    const [exitos, setExitos] = useState([]);

    const handleDescargar = async (reporteId, formato) => {
        const key = `${reporteId}-${formato}`;
        setDescargando(key);
        // Simulación de descarga
        await new Promise(resolve => setTimeout(resolve, 1500));
        setDescargando(null);
        setExitos(prev => [...prev, key]);
        setTimeout(() => setExitos(prev => prev.filter(k => k !== key)), 3000);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main className="flex-1 space-y-6">

                        <div>
                            <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                Exportación de reportes
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Descarga reportes del sistema en diferentes formatos.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {reportes.map((reporte) => (
                                <div key={reporte.id}
                                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                            style={{ backgroundColor: `${reporte.color}15` }}>
                                            <reporte.icon className="w-6 h-6" style={{ color: reporte.color }} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm" style={{ color: '#0F243E' }}>
                                                {reporte.titulo}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                                {reporte.desc}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {reporte.formatos.map((formato) => {
                                            const key = `${reporte.id}-${formato}`;
                                            const cargando = descargando === key;
                                            const exitoso = exitos.includes(key);
                                            return (
                                                <button
                                                    key={formato}
                                                    onClick={() => handleDescargar(reporte.id, formato)}
                                                    disabled={cargando}
                                                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl
                            text-xs font-bold transition-all disabled:opacity-60"
                                                    style={{
                                                        backgroundColor: exitoso ? '#22C55E' : `${reporte.color}15`,
                                                        color: exitoso ? 'white' : reporte.color,
                                                    }}>
                                                    {cargando
                                                        ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                        : exitoso
                                                            ? <CheckCircle className="w-3.5 h-3.5" />
                                                            : <Download className="w-3.5 h-3.5" />
                                                    }
                                                    {exitoso ? '¡Descargado!' : formato}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Nota */}
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                            <div className="flex items-start gap-3">
                                <FileText className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-blue-800 text-sm">Información sobre exportaciones</p>
                                    <p className="text-blue-700 text-xs mt-1 leading-relaxed">
                                        Los reportes se generan con datos en tiempo real del sistema.
                                        Los archivos PDF incluyen el logo oficial de la Municipalidad de Providencia.
                                        Para reportes programados o automatizados, contacta al equipo técnico.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default Exportacion;
