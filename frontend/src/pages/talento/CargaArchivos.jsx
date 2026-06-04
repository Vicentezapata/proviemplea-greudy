// =============================================
// PROVIEMPLEA - CARGA DE ARCHIVOS
// archivo: src/pages/talento/CargaArchivos.jsx
// descripción: Permite al vecino subir los
// documentos requeridos para validar su cuenta:
// certificado de residencia y currículum vitae.
// Implementa drag & drop, validación de tipo y
// tamaño, y muestra el progreso de cada archivo.
// =============================================

import { useState, useRef } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { archivoService } from '../../services/api';
import { validarArchivo } from '../../utils/validators';
import {
    Upload, FileText, CheckCircle, AlertTriangle,
    X, Loader2, File, Info
} from 'lucide-react';

const tiposArchivo = [
    {
        id: 'comprobante_residencia',
        titulo: 'Certificado de Residencia',
        desc: 'Documento que acredita tu domicilio en la comuna de Providencia.',
        requisitos: 'Emitido por la Municipalidad o Carabineros. Máximo 6 meses de antigüedad.',
        icono: '🏠',
        requerido: true,
    },
    {
        id: 'cv',
        titulo: 'Currículum Vitae',
        desc: 'Tu CV actualizado en formato PDF.',
        requisitos: 'Formato PDF. Máximo 5MB. Información actualizada.',
        icono: '📄',
        requerido: true,
    },
];

const ZonaUpload = ({ tipo, onArchivo }) => {
    const [arrastando, setArrastando] = useState(false);
    const [archivo, setArchivo] = useState(null);
    const [error, setError] = useState('');
    const [subiendo, setSubiendo] = useState(false);
    const [subido, setSubido] = useState(false);
    const inputRef = useRef(null);

    const procesarArchivo = async (file) => {
        const err = validarArchivo(file, ['pdf', 'jpg', 'jpeg', 'png'], 5);
        if (err) { setError(err); return; }
        setError('');
        setArchivo(file);
        setSubiendo(true);
        try {
            const formData = new FormData();
            formData.append('archivo', file);
            formData.append('tipo', tipo.id);
            await archivoService.subir(formData);
            setSubido(true);
        } catch {
            setError('Error al subir el archivo. Intenta nuevamente.');
            setSubido(false);
        } finally {
            setSubiendo(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setArrastando(false);
        const file = e.dataTransfer.files[0];
        if (file) procesarArchivo(file);
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) procesarArchivo(file);
    };

    const eliminar = () => {
        setArchivo(null);
        setSubido(false);
        setError('');
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            {/* Header */}
            <div className="flex items-start gap-3">
                <span className="text-2xl">{tipo.icono}</span>
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm" style={{ color: '#0F243E' }}>
                            {tipo.titulo}
                        </h3>
                        {tipo.requerido && (
                            <span className="text-[10px] font-bold text-red-500 bg-red-50
                px-1.5 py-0.5 rounded-full border border-red-100">
                                Requerido
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{tipo.desc}</p>
                </div>
            </div>

            {/* Requisitos */}
            <div className="flex items-start gap-2 bg-blue-50 border border-blue-100
        rounded-xl p-3">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">{tipo.requisitos}</p>
            </div>

            {/* Zona de subida */}
            {!archivo ? (
                <div
                    onDragOver={e => { e.preventDefault(); setArrastando(true); }}
                    onDragLeave={() => setArrastando(false)}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                    className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-all"
                    style={{
                        borderColor: arrastando ? '#4D9FC1' : '#e2e8f0',
                        backgroundColor: arrastando ? '#4D9FC115' : '#f8fafc',
                    }}>
                    <Upload className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                    <p className="text-sm font-semibold text-slate-600">
                        Arrastra tu archivo aquí o{' '}
                        <span style={{ color: '#4D9FC1' }}>haz clic para seleccionar</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                        PDF, JPG o PNG — máximo 5MB
                    </p>
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleChange}
                        className="hidden"
                    />
                </div>
            ) : (
                <div className={`flex items-center gap-3 p-4 rounded-xl border
          ${subido ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
            ${subido ? 'bg-green-100' : 'bg-slate-100'}`}>
                        {subiendo
                            ? <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                            : subido
                                ? <CheckCircle className="w-5 h-5 text-green-600" />
                                : <File className="w-5 h-5 text-slate-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-700 truncate">
                            {archivo.name}
                        </p>
                        <p className="text-xs text-slate-400">
                            {(archivo.size / 1024 / 1024).toFixed(2)}MB
                            {subiendo && ' — Subiendo...'}
                            {subido && ' — ¡Subido correctamente!'}
                        </p>
                    </div>
                    {!subiendo && (
                        <button onClick={eliminar}
                            className="text-slate-300 hover:text-red-500 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="flex items-start gap-2 text-red-600 bg-red-50
          border border-red-100 rounded-xl p-3">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p className="text-xs">{error}</p>
                </div>
            )}
        </div>
    );
};

const CargaArchivos = () => {
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
                                Mis Archivos
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Sube los documentos requeridos para validar tu cuenta en ProviEmplea.
                            </p>
                        </div>

                        {/* Banner estado */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5
              flex items-start gap-4">
                            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center
                justify-center shrink-0">
                                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className="font-bold text-yellow-800 text-sm">
                                    Documentos pendientes de validación
                                </p>
                                <p className="text-yellow-700 text-xs mt-1 leading-relaxed">
                                    Para activar tu cuenta y aparecer en la vitrina de empresas,
                                    debes subir los siguientes documentos. La OMIL los revisará
                                    en un plazo de 24 a 48 horas hábiles.
                                </p>
                            </div>
                        </div>

                        {/* Zonas de upload */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {tiposArchivo.map(tipo => (
                                <ZonaUpload key={tipo.id} tipo={tipo} />
                            ))}
                        </div>

                        {/* Nota privacidad */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5
              flex items-start gap-3">
                            <FileText className="w-5 h-5 shrink-0 mt-0.5"
                                style={{ color: '#4D9FC1' }} />
                            <div>
                                <p className="font-bold text-sm" style={{ color: '#0F243E' }}>
                                    Privacidad y seguridad de tus documentos
                                </p>
                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                    Tus documentos son almacenados de forma segura y solo son
                                    accesibles por los funcionarios OMIL de la Municipalidad de
                                    Providencia. Nunca son compartidos con empresas ni terceros.
                                </p>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default CargaArchivos;