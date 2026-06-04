// =============================================
// PROVIEMPLEA - MENSAJES ADMIN / OMIL
// archivo: src/pages/admin/MensajesAdmin.jsx
// descripción: Bandeja de comunicación oficial
// del funcionario OMIL con vecinos y empresas.
// Permite enviar notificaciones institucionales,
// responder consultas y gestionar validaciones
// por canal de mensajería interno del sistema.
// =============================================

import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import {
    Search, MessageSquare, CheckCheck, Clock,
    AlertTriangle, FileText, Info, X, Send,
    Users, Building2, Filter
} from 'lucide-react';

const mensajesEjemplo = [
    {
        id: 1, leido: false, tipo: 'validacion',
        remitente: 'Sistema ProviEmplea',
        destinatario: 'Vecino #PVD-2026-001',
        asunto: 'Solicitud de validación pendiente',
        preview: 'Nuevo vecino requiere revisión de certificado de residencia.',
        fecha: 'Hoy 09:00',
        origen: 'talento',
        mensajes: [{
            id: 1, emisor: 'Sistema', fecha: 'Hoy 09:00', esOmil: false,
            texto: 'El vecino registrado con correo juan@gmail.com ha subido su certificado de residencia y requiere validación. Por favor revisa los documentos adjuntos y procede a aprobar o rechazar su cuenta.'
        }]
    },
    {
        id: 2, leido: false, tipo: 'empresa',
        remitente: 'Tech Solutions SpA',
        destinatario: 'OMIL Providencia',
        asunto: 'Consulta sobre proceso de contratación',
        preview: 'Necesitamos orientación sobre el proceso para contratar un talento.',
        fecha: 'Hoy 10:30',
        origen: 'empresa',
        mensajes: [{
            id: 1, emisor: 'Tech Solutions SpA', fecha: 'Hoy 10:30', esOmil: false,
            texto: 'Estimado equipo OMIL, hemos solicitado el contacto con el talento PVD-2026-154 y queremos saber cuáles son los pasos a seguir para formalizar la contratación. ¿Existe algún formulario o proceso específico que debamos completar?'
        }]
    },
    {
        id: 3, leido: true, tipo: 'proceso',
        remitente: 'OMIL Providencia',
        destinatario: 'Vecino #PVD-2026-032',
        asunto: 'Proceso finalizado exitosamente',
        preview: 'El proceso con empresa Falabella fue marcado como contratado.',
        fecha: 'Ayer 15:00',
        origen: 'talento',
        mensajes: [
            {
                id: 1, emisor: 'OMIL Providencia', fecha: 'Ayer 15:00', esOmil: true,
                texto: 'Estimado/a vecino/a, nos complace informarte que el proceso de selección con Falabella S.A. ha concluido exitosamente y has sido seleccionado/a. La empresa se contactará contigo directamente para coordinar tu incorporación. ¡Felicitaciones!'
            }
        ]
    },
    {
        id: 4, leido: true, tipo: 'informacion',
        remitente: 'OMIL Providencia',
        destinatario: 'Todos los talentos',
        asunto: 'Feria laboral virtual — Junio 2026',
        preview: 'Invitación a participar en la próxima feria laboral virtual.',
        fecha: 'Hace 2 días',
        origen: 'broadcast',
        mensajes: [{
            id: 1, emisor: 'OMIL Providencia', fecha: 'Hace 2 días', esOmil: true,
            texto: 'Estimados vecinos, los invitamos a participar en nuestra Feria Laboral Virtual del próximo 15 de junio de 2026. Contaremos con más de 20 empresas socias ofreciendo oportunidades de empleo en distintas áreas. La inscripción es gratuita y exclusiva para vecinos de Providencia.'
        }]
    },
];

const tipoIcono = {
    validacion: { icon: AlertTriangle, color: '#F59E0B', bg: 'bg-yellow-100' },
    empresa: { icon: Building2, color: '#6366f1', bg: 'bg-indigo-100' },
    proceso: { icon: CheckCheck, color: '#22C55E', bg: 'bg-green-100' },
    informacion: { icon: Info, color: '#4D9FC1', bg: 'bg-sky-100' },
};

const filtros = [
    { value: 'todos', label: 'Todos' },
    { value: 'validacion', label: 'Validaciones' },
    { value: 'empresa', label: 'Empresas' },
    { value: 'proceso', label: 'Procesos' },
    { value: 'informacion', label: 'Información' },
];

/*import { mensajesService } from '../../services/api';

const [mensajes, setMensajes] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const cargar = async () => {
    try {
      const res = await mensajesService.getConversaciones();
      setMensajes(res.data.data || []);
    } catch {
      setMensajes([]);
    } finally {
      setLoading(false);
    }
  };
  cargar();
}, []);

const enviarRespuesta = async () => {
  if (!respuesta.trim()) return;
  try {
    const res = await mensajesService.responder(seleccionado.id, respuesta);
    const nuevoMsg = res.data.data;
    setMensajes(prev => prev.map(m =>
      m.id === seleccionado.id
        ? { ...m, mensajes: [...m.mensajes, nuevoMsg] }
        : m
    ));
    setSeleccionado(prev => ({
      ...prev, mensajes: [...prev.mensajes, nuevoMsg]
    }));
    setRespuesta('');
  } catch {
    alert('Error al enviar mensaje.');
  }
};*/
const MensajesAdmin = () => {
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
        const nuevoMsg = {
            id: Date.now(), emisor: 'OMIL Providencia',
            fecha: 'Ahora', esOmil: true, texto: respuesta
        };
        setMensajes(prev => prev.map(m =>
            m.id === seleccionado.id ? { ...m, mensajes: [...m.mensajes, nuevoMsg] } : m
        ));
        setSeleccionado(prev => ({ ...prev, mensajes: [...prev.mensajes, nuevoMsg] }));
        setRespuesta('');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main className="flex-1">

                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                    Mensajes OMIL
                                </h1>
                                <p className="text-slate-500 text-sm mt-1">
                                    {noLeidos > 0
                                        ? `${noLeidos} mensaje${noLeidos > 1 ? 's' : ''} sin leer`
                                        : 'Todo al día'}
                                </p>
                            </div>
                            <button
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                  text-white text-sm font-bold transition-opacity hover:opacity-90"
                                style={{ backgroundColor: '#4D9FC1' }}>
                                <Send className="w-4 h-4" />
                                Nuevo mensaje
                            </button>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm
              overflow-hidden flex" style={{ height: '72vh' }}>

                            {/* Lista */}
                            <div className={`w-full lg:w-80 border-r border-slate-100 flex flex-col
                shrink-0 ${vistaMovil === 'detalle' ? 'hidden lg:flex' : 'flex'}`}>

                                <div className="p-4 border-b border-slate-100">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input type="search" value={busqueda}
                                            onChange={e => setBusqueda(e.target.value)}
                                            placeholder="Buscar mensajes..."
                                            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border
                        border-slate-200 rounded-xl outline-none focus:border-[#4D9FC1]" />
                                    </div>
                                </div>

                                <div className="px-4 py-2 border-b border-slate-100 flex gap-1.5 overflow-x-auto">
                                    {filtros.map(f => (
                                        <button key={f.value} onClick={() => setFiltroActivo(f.value)}
                                            className="text-xs font-semibold px-3 py-1.5 rounded-lg
                        whitespace-nowrap shrink-0 transition-all"
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
                                                    </div>
                                                    {!mensaje.leido && (
                                                        <div className="w-2 h-2 rounded-full shrink-0 mt-1"
                                                            style={{ backgroundColor: '#4D9FC1' }} />
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Detalle */}
                            <div className={`flex-1 flex flex-col min-w-0
                ${vistaMovil === 'lista' ? 'hidden lg:flex' : 'flex'}`}>
                                {seleccionado ? (
                                    <>
                                        <div className="px-6 py-4 border-b border-slate-100 flex
                      items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => setVistaMovil('lista')}
                                                    className="lg:hidden text-slate-400">
                                                    <X className="w-5 h-5" />
                                                </button>
                                                <div>
                                                    <h2 className="font-bold text-sm" style={{ color: '#0F243E' }}>
                                                        {seleccionado.asunto}
                                                    </h2>
                                                    <p className="text-xs text-slate-500 mt-0.5">
                                                        {seleccionado.remitente} → {seleccionado.destinatario}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs px-2.5 py-1 rounded-full font-bold
                          text-white" style={{ backgroundColor: '#4D9FC1' }}>
                                                    {filtros.find(f => f.value === seleccionado.tipo)?.label || 'General'}
                                                </span>
                                                <span className={`text-xs px-2.5 py-1 rounded-full font-bold
                          ${seleccionado.origen === 'talento' ? 'bg-sky-100 text-sky-700' :
                                                        seleccionado.origen === 'empresa' ? 'bg-indigo-100 text-indigo-700' :
                                                            'bg-slate-100 text-slate-600'}`}>
                                                    {seleccionado.origen === 'talento' ? 'Vecino'
                                                        : seleccionado.origen === 'empresa' ? 'Empresa'
                                                            : 'Broadcast'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                            {seleccionado.mensajes.map(msg => (
                                                <div key={msg.id}
                                                    className={`flex ${msg.esOmil ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-lg rounded-2xl px-5 py-4
                            ${msg.esOmil
                                                            ? 'text-white'
                                                            : 'bg-slate-50 border border-slate-100'}`}
                                                        style={msg.esOmil ? { backgroundColor: '#0F243E' } : {}}>
                                                        <div className="flex items-center justify-between gap-4 mb-2">
                                                            <p className={`text-xs font-bold
                                ${msg.esOmil ? 'text-white/90' : 'text-slate-700'}`}>
                                                                {msg.emisor}
                                                            </p>
                                                            <p className={`text-[10px]
                                ${msg.esOmil ? 'text-white/60' : 'text-slate-400'}`}>
                                                                {msg.fecha}
                                                            </p>
                                                        </div>
                                                        <p className={`text-sm leading-relaxed
                              ${msg.esOmil ? 'text-white/90' : 'text-slate-600'}`}>
                                                            {msg.texto}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="px-6 py-4 border-t border-slate-100">
                                            <div className="flex gap-3 items-end">
                                                <textarea value={respuesta}
                                                    onChange={e => setRespuesta(e.target.value)}
                                                    placeholder="Escribe tu respuesta como OMIL..."
                                                    rows={2}
                                                    className="flex-1 px-4 py-3 text-sm bg-slate-50 border
                            border-slate-200 rounded-xl outline-none resize-none
                            focus:border-[#4D9FC1]"
                                                    onKeyDown={e => {
                                                        if (e.key === 'Enter' && !e.shiftKey) {
                                                            e.preventDefault();
                                                            enviarRespuesta();
                                                        }
                                                    }} />
                                                <button onClick={enviarRespuesta}
                                                    disabled={!respuesta.trim()}
                                                    className="p-3 rounded-xl text-white hover:opacity-90
                            disabled:opacity-50 transition-all"
                                                    style={{ backgroundColor: '#0F243E' }}>
                                                    <Send className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-[10px] text-slate-400 mt-2">
                                                Los mensajes enviados desde OMIL aparecen como comunicación oficial.
                                            </p>
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

export default MensajesAdmin;
