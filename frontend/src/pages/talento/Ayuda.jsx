// =============================================
// PROVIEMPLEA - AYUDA TALENTO
// archivo: src/pages/talento/Ayuda.jsx
// descripción: Centro de ayuda para el vecino.
// Contiene preguntas frecuentes organizadas
// por categorías, información de contacto
// con la OMIL y guías de uso del sistema.
// =============================================

import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import {
    HelpCircle, ChevronDown, ChevronUp,
    Phone, Mail, MapPin, Clock,
    FileText, User, Briefcase, Shield
} from 'lucide-react';

const categorias = [
    {
        id: 'cuenta',
        icon: User,
        color: '#4D9FC1',
        titulo: 'Mi cuenta',
        preguntas: [
            {
                q: '¿Por qué mi cuenta dice "pendiente de validación"?',
                a: 'La OMIL Municipal debe verificar que eres vecino/a de Providencia revisando tu certificado de residencia. Este proceso toma entre 24 y 48 horas hábiles. Mientras tanto puedes completar tu perfil.',
            },
            {
                q: '¿Cómo activo mi cuenta?',
                a: 'Sube tu certificado de residencia en la sección "Mis Archivos". Una vez aprobado por la OMIL, tu cuenta quedará activa y aparecerás en la vitrina de empresas.',
            },
            {
                q: '¿Qué documentos necesito subir?',
                a: 'Son obligatorios el certificado de residencia (emitido por la Municipalidad o Carabineros, máximo 6 meses de antigüedad) y tu currículum vitae en formato PDF.',
            },
        ],
    },
    {
        id: 'perfil',
        icon: FileText,
        color: '#6366f1',
        titulo: 'Mi perfil y CV Ciego',
        preguntas: [
            {
                q: '¿Qué es el CV Ciego?',
                a: 'Es una versión de tu perfil sin datos personales identificables (sin nombre, foto, edad, género ni dirección). Las empresas solo ven tus competencias, experiencia y habilidades, eliminando sesgos en el proceso de selección.',
            },
            {
                q: '¿Cómo mejoro mi visibilidad en la vitrina?',
                a: 'Completa el 100% de tu perfil: agrega un resumen profesional, tu educación, experiencia laboral, competencias técnicas y preferencias laborales. Los perfiles completos tienen 3 veces más visibilidad.',
            },
            {
                q: '¿Las empresas pueden ver mis datos personales?',
                a: 'No. Tus datos personales solo se revelan si tú autorizas explícitamente el contacto a través de la OMIL Municipal. Siempre tendrás el control.',
            },
        ],
    },
    {
        id: 'solicitudes',
        icon: Briefcase,
        color: '#22C55E',
        titulo: 'Solicitudes y procesos',
        preguntas: [
            {
                q: '¿Qué pasa cuando una empresa se interesa en mi perfil?',
                a: 'Recibirás una notificación y un mensaje de la OMIL consultando si autorizas compartir tus datos. Solo si aceptas, la OMIL coordinará el proceso de contacto con la empresa.',
            },
            {
                q: '¿Cuánto dura un proceso de selección?',
                a: 'Depende de cada empresa. La OMIL hace seguimiento de cada proceso. Puedes ver el estado actualizado en "Mis Solicitudes" e "Historial de procesos".',
            },
            {
                q: '¿Puedo rechazar una solicitud de empresa?',
                a: 'Sí. Cuando la OMIL te notifique sobre una empresa interesada, puedes declinar sin ningún problema. Tu privacidad siempre está protegida.',
            },
        ],
    },
    {
        id: 'privacidad',
        icon: Shield,
        color: '#F59E0B',
        titulo: 'Privacidad y seguridad',
        preguntas: [
            {
                q: '¿Quién puede ver mi información?',
                a: 'Solo los funcionarios OMIL de la Municipalidad de Providencia. Las empresas nunca ven tus datos personales a menos que tú lo autorices explícitamente.',
            },
            {
                q: '¿Puedo eliminar mi cuenta?',
                a: 'Sí. Puedes solicitar la eliminación de tu cuenta y todos tus datos contactando directamente a la OMIL Municipal por correo o teléfono.',
            },
            {
                q: '¿Mis documentos están seguros?',
                a: 'Sí. Los documentos son almacenados en servidores seguros de la Municipalidad de Providencia y solo son accesibles por funcionarios autorizados.',
            },
        ],
    },
];

const ItemFAQ = ({ pregunta, respuesta }) => {
    const [abierto, setAbierto] = useState(false);
    return (
        <div className="border-b border-slate-100 last:border-0">
            <button
                onClick={() => setAbierto(!abierto)}
                className="w-full flex items-start justify-between gap-4 py-4 text-left
          hover:text-[#4D9FC1] transition-colors">
                <p className="text-sm font-semibold text-slate-700">{pregunta}</p>
                {abierto
                    ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />}
            </button>
            {abierto && (
                <div className="pb-4">
                    <p className="text-sm text-slate-500 leading-relaxed">{respuesta}</p>
                </div>
            )}
        </div>
    );
};

const Ayuda = () => {
    const [categoriaActiva, setCategoriaActiva] = useState('cuenta');

    const categoriaSeleccionada = categorias.find(c => c.id === categoriaActiva);

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <Sidebar />
                    <main className="flex-1 space-y-6">

                        {/* Header */}
                        <div>
                            <h1 className="text-2xl font-black" style={{ color: '#0F243E' }}>
                                Centro de Ayuda
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Encuentra respuestas a las preguntas más frecuentes.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Categorías */}
                            <div className="space-y-2">
                                {categorias.map((cat) => (
                                    <button key={cat.id}
                                        onClick={() => setCategoriaActiva(cat.id)}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                      text-left transition-all text-sm font-semibold"
                                        style={{
                                            backgroundColor: categoriaActiva === cat.id ? cat.color : 'white',
                                            color: categoriaActiva === cat.id ? 'white' : '#475569',
                                            border: `1px solid ${categoriaActiva === cat.id ? cat.color : '#e2e8f0'}`,
                                        }}>
                                        <cat.icon className="w-4 h-4 shrink-0" />
                                        {cat.titulo}
                                    </button>
                                ))}

                                {/* Contacto OMIL */}
                                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5
                  space-y-4 mt-4">
                                    <h3 className="font-bold text-sm" style={{ color: '#0F243E' }}>
                                        Contactar OMIL
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { icon: Phone, label: '+56 2 2323 8500', desc: 'Lunes a Viernes' },
                                            { icon: Mail, label: 'omil@providencia.cl', desc: 'Correo oficial' },
                                            { icon: MapPin, label: 'Av. Providencia 1111', desc: 'Oficina presencial' },
                                            { icon: Clock, label: '8:30 - 17:30', desc: 'Horario de atención' },
                                        ].map(({ icon: Icon, label, desc }) => (
                                            <div key={label} className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                                    style={{ backgroundColor: '#4D9FC115' }}>
                                                    <Icon className="w-3.5 h-3.5" style={{ color: '#4D9FC1' }} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-700">{label}</p>
                                                    <p className="text-[10px] text-slate-400">{desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Preguntas frecuentes */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                            style={{ backgroundColor: `${categoriaSeleccionada?.color}15` }}>
                                            {categoriaSeleccionada && (
                                                <categoriaSeleccionada.icon className="w-5 h-5"
                                                    style={{ color: categoriaSeleccionada.color }} />
                                            )}
                                        </div>
                                        <h2 className="font-bold" style={{ color: '#0F243E' }}>
                                            {categoriaSeleccionada?.titulo}
                                        </h2>
                                    </div>
                                    <div>
                                        {categoriaSeleccionada?.preguntas.map((item, idx) => (
                                            <ItemFAQ key={idx} pregunta={item.q} respuesta={item.a} />
                                        ))}
                                    </div>
                                </div>

                                {/* Banner ayuda adicional */}
                                <div className="bg-[#0F243E] rounded-2xl p-5 flex items-start gap-4 mt-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: 'rgba(77,159,193,0.3)' }}>
                                        <HelpCircle className="w-5 h-5" style={{ color: '#4D9FC1' }} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm">
                                            ¿No encontraste tu respuesta?
                                        </p>
                                        <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                                            Escríbenos directamente a través del módulo de Mensajes
                                            o acércate a nuestra oficina en Av. Providencia 1111,
                                            de lunes a viernes de 8:30 a 17:30 hrs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Ayuda;
