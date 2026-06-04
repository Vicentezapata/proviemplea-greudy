// =============================================
// PROVIEMPLEA - MENSAJES EMPRESA
// archivo: src/pages/empresa/MensajesEmpresa.jsx
// descripción: Bandeja de comunicación oficial
// entre empresa y OMIL Municipal.
// =============================================

import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { Search, MessageSquare, CheckCheck, Clock, FileText, Info, X, Send } from 'lucide-react';

const mensajesEjemplo = [
    {
        id: 1, leido: false, tipo: 'solicitudes',
        remitente: 'OMIL Providencia',
        asunto: 'Solicitud de contacto aprobada',
        preview: 'Tu solicitud para el talento PVD-2026-154 ha sido aprobada.',
        fecha: 'Hoy 10:30',
        mensajes: [{
            id: 1, emisor: 'OMIL Providencia', fecha: 'Hoy 10:30', esOmil: true,
            texto: 'Estimada empresa, tu solicitud de contacto para el talento PVD-2026-154 ha sido aprobada. El talento ha autorizado compartir su información de contacto. Nos pondremos en contacto contigo en las próximas horas.'
        }]
    },
    {
        id: 2, leido: false, tipo: 'informacion',
        remitente: 'OMIL Providencia',
        asunto: 'Nuevos talentos disponibles',
        preview: 'Se han incorporado 15 nuevos talentos a la vitrina esta semana.',
        fecha: 'Ayer 09:00',
        mensajes: [{
            id: 1, emisor: 'OMIL Providencia', fecha: 'Ayer 09:00', esOmil: true,
            texto: 'Estimada empresa, esta semana se incorporaron 15 nuevos talentos a la vitrina de ProviEmplea. Algunos perfiles incluyen especialidades en tecnología, administración y ventas. Te invitamos a revisar los nuevos perfiles disponibles.'
        }]
    },
    {
        id: 3, leido: true, tipo: 'procesos',
        remitente: 'OMIL Providencia',
        asunto: 'Actualización de proceso',
        preview: 'El proceso con talento PVD-2026-089 avanzó a etapa Entrevista.',
        fecha: 'Hace 3 días',
        mensajes: [{
            id: 1, emisor: 'OMIL Providencia', fecha: 'Hace 3 días', esOmil: true,
            texto: 'El proceso de selección con el talento PVD-2026-089 ha avanzado a la etapa de Entrevista. Por favor coordina con nuestro equipo para agendar la reunión.'
        }]
    },
];

const tipoIcono = {
    solicitudes: { icon: CheckCheck, color: '#4D9FC1', bg: 'bg-sky-100' },
    informacion: { icon: Info, color: '#6366f1', bg: 'bg-indigo-100' },
    procesos: { icon: Clock, color: '#F59E0B', bg: 'bg-yellow-100' },
    documentos: { icon: FileText, color: '#EF4444', bg: 'bg-red-100' },
};

const filtros = [
    { value: 'todos', label: 'Todos' },
    { value: 'solicitudes', label: 'Solicitudes' },
    { value: 'procesos', label: 'Procesos' },
    { value: 'informacion', label: 'Información' },
];

const MensajesEmpresa = () => {
    const [mensajes, setMensajes] = useState(mensajesEjemplo);
    const [seleccionado, setSeleccionado] = useState(mensajesEjemplo[0]);
    const [busqueda, setBusqueda] = useState('');
    const [filtroActivo, setFiltroActivo] = useState('todos');
    const [respuesta, setRespuesta] = useState('');
    const [vistaMovil, setVistaMovil] = useState('lista');

    const noLeidos = mensajes.filter(m => !m.leido).length;

    const mensajesFiltrados = mensajes.filter(m => {
        const coincideBusqueda = m.asunto.toLowerCase().includes(busqueda.toLowerCase());
        const coincideFiltro = filtroActivo === 'todos' || m.tipo === filtroActivo;
        return coincideBusqueda && coincideFiltro;
    });

    const seleccionar = (mensaje) => {
        setSeleccionado(mensaje);
        setMensajes(prev => prev.map(m => m.id === mensaje.id ? { ...m, leido: true } : m));
        setVistaMovil('detalle');
    };

    const enviarRespuesta = () => {
        if (!respuesta.trim()) return;
        const nuevoMsg = { id: Date.now(), emisor: 'Mi empresa', fecha: 'Ahora', esOmil: false, texto: respuesta };
        setMensajes(prev => prev.map(m =>
            m.id === seleccionado.id ? { ...m, mensajes: [...m.mensajes, nuevoMsg] } : m
        ));
        setSeleccionado(prev => ({ ...prev, mensajes: [...prev.mensajes, nuevoMsg] }));
        setRespuesta(''); setseleccionado(null); setVistaMovil('lista');
        setTimeout(() => {
            setSeleccionado(mensajes.find(m => m.id === seleccionado.id));
            setVistaMovil('detalle');
        }, 500);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main className="flex-1">
                        <div className="mb-6">
                            <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>Mensajes</h1>
                            <p className="text-slate-500 text-sm mt-1">
                                {noLeidos > 0 ? `${noLeidos} mensaje${noLeidos > 1 ? 's' : ''} sin leer` : 'Todo al día'}
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm
              overflow-hidden flex" style={{ height: '70vh' }}>

                            {/* Lista */}
                            <div className={`w-full lg:w-80 border-r border-slate-100 flex flex-col shrink-0
                ${vistaMovil === 'detalle' ? 'hidden lg:flex' : 'flex'}`}>
                                <div className="p-4 border-b border-slate-100">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input type="search" value={busqueda}
                                            onChange={e => setBusqueda(e.target.value)}
                                            placeholder="Buscar mensajes..."
                                            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200
                        rounded-xl outline-none focus:border-[#4D9FC1]" />
                                    </div>
                                </div>

                                <div className="px-4 py-2 border-b border-slate-100 flex gap-1.5 overflow-x-auto">
                                    {filtros.map(f => (
                                        <button key={f.value} onClick={() => setFiltroActivo(f.value)}
                                            className="text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0"
                                            style={{
                                                backgroundColor: filtroActivo === f.value ? '#4D9FC1' : '#f1f5f9',
                                                color: filtroActivo === f.value ? 'white' : '#64748b',
                                            }}>
                                            {f.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                                    {mensajesFiltrados.map(mensaje => {
                                        const tipo = tipoIcono[mensaje.tipo] || tipoIcono.informacion;
                                        const Icon = tipo.icon;
                                        return (
                                            <button key={mensaje.id} onClick={() => seleccionar(mensaje)}
                                                className={`w-full p-4 text-left hover:bg-slate-50 transition-colors
                          ${seleccionado?.id === mensaje.id ? 'bg-[#4D9FC1]/5 border-l-2' : ''}
                          ${!mensaje.leido ? 'bg-blue-50/30' : ''}`}
                                                style={seleccionado?.id === mensaje.id ? { borderLeftColor: '#4D9FC1' } : {}}>
                                                <div className="flex items-start gap-3">
                                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${tipo.bg}`}>
                                                        <Icon className="w-4 h-4" style={{ color: tipo.color }} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <p className={`text-sm truncate ${!mensaje.leido ? 'font-bold text-slate-800' : 'font-medium text-slate-600'}`}>
                                                                {mensaje.remitente}
                                                            </p>
                                                            <span className="text-[10px] text-slate-400 shrink-0">{mensaje.fecha}</span>
                                                        </div>
                                                        <p className={`text-xs mt-0.5 truncate ${!mensaje.leido ? 'font-semibold text-slate-700' : 'text-slate-500'}`}>
                                                            {mensaje.asunto}
                                                        </p>
                                                    </div>
                                                    {!mensaje.leido && <div className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ backgroundColor: '#4D9FC1' }} />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Detalle */}
                            <div className={`flex-1 flex flex-col min-w-0 ${vistaMovil === 'lista' ? 'hidden lg:flex' : 'flex'}`}>
                                {seleccionado ? (
                                    <>
                                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => setVistaMovil('lista')} className="lg:hidden text-slate-400">
                                                    <X className="w-5 h-5" />
                                                </button>
                                                <div>
                                                    <h2 className="font-bold text-sm" style={{ color: '#0F243E' }}>{seleccionado.asunto}</h2>
                                                    <p className="text-xs text-slate-500 mt-0.5">{seleccionado.remitente}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs px-2.5 py-1 rounded-full font-semibold text-white"
                                                style={{ backgroundColor: '#4D9FC1' }}>
                                                {filtros.find(f => f.value === seleccionado.tipo)?.label || 'General'}
                                            </span>
                                        </div>

                                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                            {seleccionado.mensajes.map(msg => (
                                                <div key={msg.id} className={`flex ${msg.esOmil ? 'justify-start' : 'justify-end'}`}>
                                                    <div className={`max-w-lg rounded-2xl px-5 py-4 ${msg.esOmil ? 'bg-slate-50 border border-slate-100' : 'text-white'}`}
                                                        style={!msg.esOmil ? { backgroundColor: '#4D9FC1' } : {}}>
                                                        <div className="flex items-center justify-between gap-4 mb-2">
                                                            <p className={`text-xs font-bold ${msg.esOmil ? 'text-slate-700' : 'text-white/90'}`}>{msg.emisor}</p>
                                                            <p className={`text-[10px] ${msg.esOmil ? 'text-slate-400' : 'text-white/70'}`}>{msg.fecha}</p>
                                                        </div>
                                                        <p className={`text-sm leading-relaxed ${msg.esOmil ? 'text-slate-600' : 'text-white'}`}>{msg.texto}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="px-6 py-4 border-t border-slate-100">
                                            <div className="flex gap-3 items-end">
                                                <textarea value={respuesta} onChange={e => setRespuesta(e.target.value)}
                                                    placeholder="Escribe tu respuesta..." rows={2}
                                                    className="flex-1 px-4 py-3 text-sm bg-slate-50 border border-slate-200
                            rounded-xl outline-none resize-none focus:border-[#4D9FC1]"
                                                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviarRespuesta(); } }} />
                                                <button onClick={enviarRespuesta} disabled={!respuesta.trim()}
                                                    className="p-3 rounded-xl text-white hover:opacity-90 disabled:opacity-50"
                                                    style={{ backgroundColor: '#4D9FC1' }}>
                                                    <Send className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="text-center">
                                            <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                                            <p className="text-slate-400 text-sm">Selecciona un mensaje</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default MensajesEmpresa;