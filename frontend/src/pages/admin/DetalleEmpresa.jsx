// =============================================
// PROVIEMPLEA - DETALLE EMPRESA ADMIN
// archivo: src/pages/admin/DetalleEmpresa.jsx
// descripción: Vista completa del perfil de
// una empresa para el funcionario OMIL.
// =============================================

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { adminService } from '../../services/api';
import { formatearFechaRelativa } from '../../utils/formatters';
import {
    ArrowLeft, Building2, Users, Briefcase,
    Mail, Loader2, Globe
} from 'lucide-react';

const DetalleEmpresa = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [empresa, setEmpresa] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await adminService.getEmpresas();
                const lista = res.data.data || [];
                setEmpresa(lista.find(e => e.id === id) || lista[0] || null);
            } catch {
                setEmpresa(null);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, [id]);

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

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main className="flex-1 space-y-6">

                        {/* Header */}
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/admin/empresas')}
                                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                                <ArrowLeft className="w-4 h-4 text-slate-600" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                    Detalle de Empresa
                                </h1>
                                <p className="text-slate-500 text-sm mt-0.5">
                                    Información completa de la empresa.
                                </p>
                            </div>
                        </div>

                        {!empresa ? (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
                                <Building2 className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-slate-400">Empresa no encontrada.</p>
                            </div>
                        ) : (
                            <>
                                {/* Card principal */}
                                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center
                      text-white font-black text-2xl shrink-0"
                                            style={{ backgroundColor: '#0F243E' }}>
                                            {(empresa.nombre_empresa || 'E').charAt(0)}
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-black" style={{ color: '#0F243E' }}>
                                                {empresa.nombre_empresa || 'Empresa'}
                                            </h2>
                                            <p className="text-sm text-slate-500">{empresa.correo}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                RUT: {empresa.rut_empresa || '—'}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                Registrada {formatearFechaRelativa(empresa.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Info detalle */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                                        <h3 className="font-bold text-sm flex items-center gap-2 mb-4"
                                            style={{ color: '#0F243E' }}>
                                            <Building2 className="w-4 h-4" style={{ color: '#4D9FC1' }} />
                                            Información empresarial
                                        </h3>
                                        <div className="space-y-3">
                                            {[
                                                { label: 'Nombre', valor: empresa.nombre_empresa },
                                                { label: 'RUT', valor: empresa.rut_empresa },
                                                { label: 'Correo', valor: empresa.correo },
                                                { label: 'Rubro', valor: empresa.empresa?.rubro?.nombre || '—' },
                                            ].map(({ label, valor }) => (
                                                <div key={label} className="flex justify-between py-2 border-b border-slate-50">
                                                    <p className="text-xs font-semibold text-slate-500">{label}</p>
                                                    <p className="text-xs font-bold text-slate-700">{valor || '—'}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                                        <h3 className="font-bold text-sm flex items-center gap-2 mb-4"
                                            style={{ color: '#0F243E' }}>
                                            <Briefcase className="w-4 h-4" style={{ color: '#4D9FC1' }} />
                                            Actividad en ProviEmplea
                                        </h3>
                                        <div className="space-y-3">
                                            {[
                                                { label: 'Solicitudes enviadas', valor: '0' },
                                                { label: 'Talentos contactados', valor: '0' },
                                                { label: 'Contrataciones', valor: '0' },
                                            ].map(({ label, valor }) => (
                                                <div key={label} className="flex justify-between py-2 border-b border-slate-50">
                                                    <p className="text-xs font-semibold text-slate-500">{label}</p>
                                                    <p className="text-xs font-black" style={{ color: '#4D9FC1' }}>{valor}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Presentación */}
                                {empresa.empresa?.presentacion && (
                                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                                        <h3 className="font-bold text-sm mb-3" style={{ color: '#0F243E' }}>
                                            Presentación
                                        </h3>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {empresa.empresa.presentacion}
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DetalleEmpresa;
