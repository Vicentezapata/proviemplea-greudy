// =============================================
// PROVIEMPLEA - MENSAJES TALENTO
// archivo: src/pages/talento/Mensajes.jsx
// descripción: Bandeja de comunicación oficial
// entre vecino/a y OMIL Municipal. Diseño
// institucional con lista de conversaciones
// y detalle del mensaje seleccionado.
// =============================================

import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import {
    Search, Filter, MessageSquare, CheckCheck,
    Clock, AlertTriangle, FileText, Info,
    ChevronRight, Send, Paperclip, X
} from 'lucide-react';

// Mensajes de ejemplo
const mensajesEjemplo = [
    {
        id: 1,
        remitente: 'OMIL Providencia',
        asunto: 'Validación de residencia',
        preview: 'Tu certificado fue recibido y está en revisión.',
        fecha: 'Hoy 09:15',
        leido: false,
        tipo: 'validacion',
        mensajes: [
            {
                id: 1, emisor: 'OMIL Providencia', fecha: 'Hoy 09:15', esOmil: true,
                texto: 'Estimado/a vecino/a, hemos recibido tu certificado de residencia y se encuentra actualmente en proceso de revisión por nuestro equipo. Te notificaremos el resultado en un plazo de 24 a 48 horas hábiles. Gracias por tu paciencia.'
            }
        ]
    },
    {
        id: 2,
        remitente: 'OMIL Providencia',
        asunto: 'Documento observado',
        preview: 'Necesitamos que vuelvas a subir tu certificado con mejor resolución.',
        fecha: 'Ayer 14:30',
        leido: false,
        tipo: 'documentos',
        mensajes: [
            {
                id: 1, emisor: 'OMIL Providencia', fecha: 'Ayer 14:30', esOmil: true,
                texto: 'El certificado de residencia que subiste no tiene la resolución mínima requerida para su validación. Por favor sube nuevamente el documento con mayor claridad. El archivo debe ser PDF o imagen JPG/PNG de al menos 300 DPI.'
            }
        ]
    },
    {
        id: 3,
        remitente: 'OMIL Providencia',
        asunto: 'Solicitud de contacto empresarial',
        preview: 'Una empresa solicitó avanzar con tu perfil laboral.',
        fecha: 'Hace 2 días',
        leido: true,
        tipo: 'solicitudes',
        mensajes: [
            {
                id: 1, emisor: 'OMIL Providencia', fecha: 'Hace 2 días', esOmil: true,
                texto: 'Una empresa socia de ProviEmplea ha solicitado conocer más sobre tu perfil laboral. Según nuestro protocolo, antes de revelar tus datos personales necesitamos tu autorización explícita. ¿Autorizas que compartamos tu información de contacto con esta empresa?'
            },
            {
                id: 2, emisor: 'Tú', fecha: 'Hace 2 días', esOmil: false,
                texto: 'Sí, autorizo que compartan mi información de contacto.'
            },
            {
                id: 3, emisor: 'OMIL Providencia', fecha: 'Hace 1 día', esOmil: true,
                texto: 'Perfecto, hemos comunicado tu autorización a la empresa. Pronto recibirás más información sobre el proceso de selección.'
            }
        ]
    },
    {
        id: 4,
        remitente: 'Sistema ProviEmplea',
        asunto: 'Perfil incompleto',
        preview: 'Agrega tus competencias técnicas para mejorar tu visibilidad.',
        fecha: 'Hace 3 días',
        leido: true,
        tipo: 'informacion',
        mensajes: [
            {
                id: 1, emisor: 'Sistema ProviEmplea', fecha: 'Hace 3 días', esOmil: true,
                texto: 'Tu perfil tiene un 60% de completitud. Para aumentar tus posibilidades de ser contactado por empresas, te recomendamos agregar tus competencias técnicas, experiencia laboral y nivel de idiomas. Los perfiles completos tienen 3 veces más visibilidad en la vitrina.'
            }
        ]
    },
];

const tipoIcono = {
    validacion: { icon: CheckCheck, color: '#22C55E', bg: 'bg-green-100' },
    documentos: { icon: FileText, color: '#EF4444', bg: 'bg-red-100' },
    solicitudes: { icon: MessageSquare, color: '#4D9FC1', bg: 'bg-sky-100' },
    informacion: { icon: Info, color: '#6366f1', bg: 'bg-indigo-100' },
    procesos: { icon: Clock, color: '#F59E0B', bg: 'bg-yellow-100' },
};

const filtros = [
    { value: 'todos', label: 'Todos' },
    { value: 'validacion', label: 'Validación' },
    { value: 'solicitudes', label: 'Solicitudes' },
    { value: 'procesos', label: 'Procesos' },
    { value: 'documentos', label: 'Documentos' },
    { value: 'informacion', label: 'Información' },
];

const Mensajes = () => {
    const [mensajes, setMensajes] = useState(mensajesEjemplo);
    const [seleccionado, setSeleccionado] = useState(mensajesEjemplo[0]);
    const [busqueda, setBusqueda] = useState('');
    const [filtroActivo, setFiltroActivo] = useState('todos');
    const [respuesta, setRespuesta] = useState('');
    const [vistaMovil, setVistaMovil] = useState('lista');

    const noLeidos = mensajes.filter(m => !m.leido).length;

    const mensajesFiltrados = mensajes.filter(m => {
        const coincideBusqueda = m.asunto.toLowerCase().includes(busqueda.toLowerCase()) ||
            m.remitente.toLowerCase().includes(busqueda.toLowerCase());
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
        const nuevoMensaje = {
            id: Date.now(), emisor: 'Tú',
            fecha: 'Ahora', esOmil: false, texto: respuesta,
        };
        setMensajes(prev => prev.map(m =>
            m.id === seleccionado.id
                ? { ...m, mensajes: [...m.mensajes, nuevoMensaje] }
                : m
        ));
        setSeleccionado(prev => ({
            ...prev, mensajes: [...prev.mensajes, nuevoMensaje]
        }));
        setRespuesta('');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main className="flex-1 min-w-0">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                    Mensajes
                                </h1>
                                <p className="text-slate-500 text-sm mt-1">
                                    {noLeidos > 0 ? `${noLeidos} mensaje${noLeidos > 1 ? 's' : ''} sin leer` : 'Todo al día'}
                                </p>
                            </div>
                        </div>

                        {/* Panel principal */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm
              overflow-hidden flex" style={{ height: '70vh' }}>

                            {/* Lista de conversaciones */}
                            <div className={`w-full lg:w-80 border-r border-slate-100 flex flex-col
                shrink-0 ${vistaMovil === 'detalle' ? 'hidden lg:flex' : 'flex'}`}>

                                {/* Buscador */}
                                <div className="p-4 border-b border-slate-100">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2
                      w-4 h-4 text-slate-400" />
                                        <input
                                            type="search"
                                            value={busqueda}
                                            onChange={e => setBusqueda(e.target.value)}
                                            placeholder="Buscar mensajes..."
                                            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border
                        border-slate-200 rounded-xl outline-none transition-all
                        focus:border-[#4D9FC1] focus:ring-2 focus:ring-[#4D9FC1]/20"
                                        />
                                    </div>
                                </div>

                                {/* Filtros */}
                                <div className="px-4 py-2 border-b border-slate-100 flex gap-1.5 overflow-x-auto">
                                    {filtros.map(f => (
                                        <button key={f.value}
                                            onClick={() => setFiltroActivo(f.value)}
                                            className="text-xs font-semibold px-3 py-1.5 rounded-lg
                        whitespace-nowrap transition-all shrink-0"
                                            style={{
                                                backgroundColor: filtroActivo === f.value ? '#4D9FC1' : '#f1f5f9',
                                                color: filtroActivo === f.value ? 'white' : '#64748b',
                                            }}>
                                            {f.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Lista mensajes */}
                                <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                                    {mensajesFiltrados.length === 0 ? (
                                        <div className="p-8 text-center text-slate-400 text-sm">
                                            No hay mensajes
                                        </div>
                                    ) : (
                                        mensajesFiltrados.map(mensaje => {
                                            const tipo = tipoIcono[mensaje.tipo] || tipoIcono.informacion;
                                            const Icon = tipo.icon;
                                            return (
                                                <button key={mensaje.id}
                                                    onClick={() => seleccionar(mensaje)}
                                                    className={`w-full p-4 text-left transition-colors hover:bg-slate-50
                            ${seleccionado?.id === mensaje.id ? 'bg-[#4D9FC1]/5 border-l-2' : ''}
                            ${!mensaje.leido ? 'bg-blue-50/30' : ''}`}
                                                    style={seleccionado?.id === mensaje.id
                                                        ? { borderLeftColor: '#4D9FC1' } : {}}>
                                                    <div className="flex items-start gap-3">
                                                        <div className={`w-9 h-9 rounded-xl flex items-center
                              justify-center shrink-0 ${tipo.bg}`}>
                                                            <Icon className="w-4 h-4" style={{ color: tipo.color }} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between gap-2">
                                                                <p className={`text-sm truncate
                                  ${!mensaje.leido ? 'font-bold text-slate-800' : 'font-medium text-slate-600'}`}>
                                                                    {mensaje.remitente}
                                                                </p>
                                                                <span className="text-[10px] text-slate-400 shrink-0">
                                                                    {mensaje.fecha}
                                                                </span>
                                                            </div>
                                                            <p className={`text-xs mt-0.5 truncate
                                ${!mensaje.leido ? 'font-semibold text-slate-700' : 'text-slate-500'}`}>
                                                                {mensaje.asunto}
                                                            </p>
                                                            <p className="text-xs text-slate-400 truncate mt-0.5">
                                                                {mensaje.preview}
                                                            </p>
                                                        </div>
                                                        {!mensaje.leido && (
                                                            <div className="w-2 h-2 rounded-full shrink-0 mt-1"
                                                                style={{ backgroundColor: '#4D9FC1' }} />
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                            </div>

                            {/* Detalle del mensaje */}
                            <div className={`flex-1 flex flex-col min-w-0
                ${vistaMovil === 'lista' ? 'hidden lg:flex' : 'flex'}`}>

                                {seleccionado ? (
                                    <>
                                        {/* Header conversación */}
                                        <div className="px-6 py-4 border-b border-slate-100 flex
                      items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => setVistaMovil('lista')}
                                                    className="lg:hidden text-slate-400 hover:text-slate-600">
                                                    <X className="w-5 h-5" />
                                                </button>
                                                <div>
                                                    <h2 className="font-bold text-sm" style={{ color: '#0F243E' }}>
                                                        {seleccionado.asunto}
                                                    </h2>
                                                    <p className="text-xs text-slate-500 mt-0.5">
                                                        {seleccionado.remitente}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                                                style={{ backgroundColor: '#4D9FC1', color: 'white' }}>
                                                {filtros.find(f => f.value === seleccionado.tipo)?.label || 'General'}
                                            </span>
                                        </div>

                                        {/* Mensajes */}
                                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                            {seleccionado.mensajes.map(msg => (
                                                <div key={msg.id}
                                                    className={`flex ${msg.esOmil ? 'justify-start' : 'justify-end'}`}>
                                                    <div className={`max-w-lg rounded-2xl px-5 py-4 space-y-1
                            ${msg.esOmil
                                                            ? 'bg-slate-50 border border-slate-100'
                                                            : 'text-white'}`}
                                                        style={!msg.esOmil ? { backgroundColor: '#4D9FC1' } : {}}>
                                                        <div className="flex items-center justify-between gap-4 mb-2">
                                                            <p className={`text-xs font-bold
                                ${msg.esOmil ? 'text-slate-700' : 'text-white/90'}`}>
                                                                {msg.emisor}
                                                            </p>
                                                            <p className={`text-[10px]
                                ${msg.esOmil ? 'text-slate-400' : 'text-white/70'}`}>
                                                                {msg.fecha}
                                                            </p>
                                                        </div>
                                                        <p className={`text-sm leading-relaxed
                              ${msg.esOmil ? 'text-slate-600' : 'text-white'}`}>
                                                            {msg.texto}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Responder */}
                                        <div className="px-6 py-4 border-t border-slate-100">
                                            <div className="flex gap-3 items-end">
                                                <div className="flex-1 relative">
                                                    <textarea
                                                        value={respuesta}
                                                        onChange={e => setRespuesta(e.target.value)}
                                                        placeholder="Escribe tu respuesta..."
                                                        rows={2}
                                                        className="w-full px-4 py-3 text-sm bg-slate-50 border
                              border-slate-200 rounded-xl outline-none resize-none
                              transition-all focus:border-[#4D9FC1]
                              focus:ring-2 focus:ring-[#4D9FC1]/20"
                                                        onKeyDown={e => {
                                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                                e.preventDefault();
                                                                enviarRespuesta();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <button
                                                    onClick={enviarRespuesta}
                                                    disabled={!respuesta.trim()}
                                                    className="p-3 rounded-xl text-white transition-all
                            disabled:opacity-50 disabled:cursor-not-allowed
                            hover:opacity-90"
                                                    style={{ backgroundColor: '#4D9FC1' }}
                                                    aria-label="Enviar respuesta">
                                                    <Send className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-[10px] text-slate-400 mt-2">
                                                Presiona Enter para enviar o Shift+Enter para nueva línea
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="text-center">
                                            <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                                            <p className="text-slate-400 text-sm">
                                                Selecciona un mensaje para leerlo
                                            </p>
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

export default Mensajes;