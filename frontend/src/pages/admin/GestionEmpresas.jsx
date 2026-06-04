// =============================================
// PROVIEMPLEA - GESTIÓN EMPRESAS ADMIN
// archivo: src/pages/admin/GestionEmpresas.jsx
// descripción: Lista de todas las empresas
// registradas en el sistema. Solo OMIL.
// =============================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { adminService } from '../../services/api';
import { formatearFechaRelativa } from '../../utils/formatters';
import { Building2, Search, Eye, ChevronRight } from 'lucide-react';

const GestionEmpresas = () => {
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await adminService.getEmpresas();
                setEmpresas(res.data.data || []);
            } catch {
                setEmpresas([]);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    const empresasFiltradas = empresas.filter(e =>
        e.correo?.toLowerCase().includes(busqueda.toLowerCase()) ||
        e.nombre_empresa?.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main className="flex-1 space-y-6">

                        <div>
                            <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                Gestión de Empresas
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Empresas registradas en ProviEmplea.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input type="text" value={busqueda}
                                    onChange={e => setBusqueda(e.target.value)}
                                    placeholder="Buscar empresa..."
                                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200
                    rounded-xl outline-none focus:border-[#4D9FC1]" />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            {loading ? (
                                <div className="p-8 space-y-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-14 bg-slate-50 rounded-xl animate-pulse" />
                                    ))}
                                </div>
                            ) : empresasFiltradas.length === 0 ? (
                                <div className="p-16 text-center">
                                    <Building2 className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                    <p className="text-slate-400 text-sm">No hay empresas registradas.</p>
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-100">
                                            {['Empresa', 'RUT', 'Correo', 'Registro', 'Acción'].map(col => (
                                                <th key={col} className="text-left px-5 py-3.5 text-xs font-black
                          uppercase tracking-wider text-slate-400">
                                                    {col}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {empresasFiltradas.map((empresa) => (
                                            <tr key={empresa.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-xl flex items-center
                              justify-center text-white font-bold text-sm shrink-0"
                                                            style={{ backgroundColor: '#0F243E' }}>
                                                            {(empresa.nombre_empresa || 'E').charAt(0)}
                                                        </div>
                                                        <p className="text-sm font-bold text-slate-700">
                                                            {empresa.nombre_empresa || '—'}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <p className="text-xs text-slate-500">{empresa.rut_empresa || '—'}</p>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <p className="text-xs text-slate-500">{empresa.correo}</p>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <p className="text-xs text-slate-400">
                                                        {formatearFechaRelativa(empresa.createdAt)}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <Link to={`/admin/empresas/${empresa.id}`}
                                                        className="flex items-center gap-1 text-xs font-bold
                              px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-600
                              hover:bg-slate-200 transition-colors w-fit">
                                                        <Eye className="w-3.5 h-3.5" />
                                                        Ver
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default GestionEmpresas;
