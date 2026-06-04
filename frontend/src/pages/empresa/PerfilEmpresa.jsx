// =============================================
// PROVIEMPLEA - PERFIL EMPRESA
// archivo: src/pages/empresa/PerfilEmpresa.jsx
// descripción: Gestión del perfil empresarial.
// Permite ver y editar información de la empresa.
// =============================================

import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { empresaService, catalogoService } from '../../services/api';
import { Building2, Edit, Save, Loader2, AlertCircle, CheckCircle, Users, X } from 'lucide-react';

const PerfilEmpresa = () => {
    const [perfil, setPerfil] = useState(null);
    const [rubros, setRubros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editando, setEditando] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [exito, setExito] = useState(false);
    const [errorApi, setErrorApi] = useState('');
    const [form, setForm] = useState({
        nombre_empresa: '', presentacion: '',
        beneficios: '', id_rubro: '',
    });

    useEffect(() => {
        const cargar = async () => {
            try {
                const [perfilRes, rubrosRes] = await Promise.all([
                    empresaService.getPerfil(),
                    catalogoService.getRubros(),
                ]);
                const datos = perfilRes.data.data;
                setPerfil(datos);
                setRubros(rubrosRes.data.data || []);
                setForm({
                    nombre_empresa: datos?.nombre_empresa || '',
                    presentacion: datos?.presentacion || '',
                    beneficios: datos?.beneficios || '',
                    id_rubro: datos?.id_rubro || '',
                });
            } catch {
                setPerfil(null);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    const handleGuardar = async () => {
        setGuardando(true);
        setErrorApi('');
        try {
            await empresaService.updatePerfil(form);
            setPerfil({ ...perfil, ...form });
            setEditando(false);
            setExito(true);
            setTimeout(() => setExito(false), 3000);
        } catch (err) {
            setErrorApi(err.response?.data?.message || 'Error al guardar.');
        } finally {
            setGuardando(false);
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none transition-all focus:border-[#4D9FC1] focus:ring-2 focus:ring-[#4D9FC1]/20";

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main className="flex-1 space-y-6">

                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                    Perfil de Empresa
                                </h1>
                                <p className="text-slate-500 text-sm mt-1">
                                    Gestiona la información de tu empresa.
                                </p>
                            </div>
                            {!editando ? (
                                <button onClick={() => setEditando(true)}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                    text-white text-sm font-semibold transition-opacity hover:opacity-90"
                                    style={{ backgroundColor: '#4D9FC1' }}>
                                    <Edit className="w-4 h-4" /> Editar
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button onClick={() => setEditando(false)}
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                      text-sm font-semibold border-2 border-slate-200 text-slate-600
                      hover:bg-slate-50 transition-all">
                                        <X className="w-4 h-4" /> Cancelar
                                    </button>
                                    <button onClick={handleGuardar} disabled={guardando}
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                      text-white text-sm font-semibold transition-opacity hover:opacity-90
                      disabled:opacity-60"
                                        style={{ backgroundColor: '#4D9FC1' }}>
                                        {guardando
                                            ? <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</>
                                            : <><Save className="w-4 h-4" /> Guardar</>}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Alertas */}
                        {exito && (
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <p className="text-sm text-green-700 font-semibold">Perfil actualizado correctamente.</p>
                            </div>
                        )}
                        {errorApi && (
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <p className="text-sm text-red-700">{errorApi}</p>
                            </div>
                        )}

                        {/* Card perfil */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">

                            {/* Avatar empresa */}
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center
                  text-white font-black text-2xl shrink-0"
                                    style={{ backgroundColor: '#0F243E' }}>
                                    {(form.nombre_empresa || perfil?.nombre_empresa || 'E').charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-lg font-black" style={{ color: '#0F243E' }}>
                                        {perfil?.nombre_empresa || 'Mi Empresa'}
                                    </h2>
                                    <p className="text-sm text-slate-500">{perfil?.rut_empresa}</p>
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-6 space-y-5">

                                {/* Nombre empresa */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 block mb-1.5">
                                        Nombre de la empresa
                                    </label>
                                    {editando ? (
                                        <input type="text" value={form.nombre_empresa}
                                            onChange={e => setForm({ ...form, nombre_empresa: e.target.value })}
                                            className={inputClass} />
                                    ) : (
                                        <p className="text-sm text-slate-700">{perfil?.nombre_empresa || '—'}</p>
                                    )}
                                </div>

                                {/* Rubro */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 block mb-1.5">
                                        Rubro
                                    </label>
                                    {editando ? (
                                        <select value={form.id_rubro}
                                            onChange={e => setForm({ ...form, id_rubro: e.target.value })}
                                            className={inputClass}>
                                            <option value="">Selecciona rubro</option>
                                            {rubros.map(r => (
                                                <option key={r.id} value={r.id}>{r.nombre}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p className="text-sm text-slate-700">{perfil?.rubro?.nombre || '—'}</p>
                                    )}
                                </div>

                                {/* Presentación */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 block mb-1.5">
                                        Presentación
                                    </label>
                                    {editando ? (
                                        <textarea value={form.presentacion}
                                            onChange={e => setForm({ ...form, presentacion: e.target.value })}
                                            placeholder="Describe tu empresa..."
                                            rows={4}
                                            className={inputClass + ' resize-none'} />
                                    ) : (
                                        <p className="text-sm text-slate-700 leading-relaxed">
                                            {perfil?.presentacion || '—'}
                                        </p>
                                    )}
                                </div>

                                {/* Beneficios */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 block mb-1.5">
                                        Beneficios para empleados
                                    </label>
                                    {editando ? (
                                        <textarea value={form.beneficios}
                                            onChange={e => setForm({ ...form, beneficios: e.target.value })}
                                            placeholder="Ej: Seguro médico, trabajo remoto, bono anual..."
                                            rows={3}
                                            className={inputClass + ' resize-none'} />
                                    ) : (
                                        <p className="text-sm text-slate-700 leading-relaxed">
                                            {perfil?.beneficios || '—'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Usuarios de la empresa */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-sm flex items-center gap-2"
                                    style={{ color: '#0F243E' }}>
                                    <Users className="w-4 h-4" style={{ color: '#4D9FC1' }} />
                                    Usuarios de la empresa
                                </h3>
                            </div>
                            <div className="text-center py-8">
                                <p className="text-sm text-slate-400">
                                    Gestión de usuarios disponible próximamente.
                                </p>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default PerfilEmpresa;

