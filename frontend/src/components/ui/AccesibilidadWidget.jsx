// =============================================
// PROVIEMPLEA - WIDGET DE ACCESIBILIDAD
// archivo: src/components/ui/AccesibilidadWidget.jsx
// descripción: Widget flotante de accesibilidad
// que cumple WCAG 2.1. Permite ajustar tamaño
// de texto, fuente para dislexia, destacar
// enlaces, lector de voz y cursor gigante.
// Usa Web Speech API nativa del navegador.
// =============================================

import { useState, useEffect } from 'react';
import { Accessibility, X, Type, Eye, Link, Volume2, MousePointer, RotateCcw } from 'lucide-react';

const AccesibilidadWidget = () => {
    const [abierto, setAbierto] = useState(false);
    const [config, setConfig] = useState({
        tamanoTexto: 1,
        fuenteDislexia: false,
        destacarLinks: false,
        cursorGigante: false,
        lectorVoz: false,
    });

    // Lector de voz — lee el texto cuando el mouse pasa encima
    useEffect(() => {
        if (!config.lectorVoz) {
            window.speechSynthesis?.cancel();
            return;
        }

        const leer = (e) => {
            const el = e.target;
            if (!el || el.nodeType !== 1) return;
            const texto = el.textContent?.trim();
            if (texto && texto.length > 0 && texto.length < 200) {
                window.speechSynthesis?.cancel();
                const utterance = new SpeechSynthesisUtterance(texto);
                utterance.lang = 'es-CL';
                utterance.rate = 0.9;
                window.speechSynthesis?.speak(utterance);
            }
        };

        document.addEventListener('mouseover', leer);
        return () => {
            document.removeEventListener('mouseover', leer);
            window.speechSynthesis?.cancel();
        };
    }, [config.lectorVoz]);

    const aplicarTamano = (tamano) => {
        setConfig(prev => ({ ...prev, tamanoTexto: tamano }));
        document.documentElement.style.fontSize =
            tamano === 1 ? '16px' : tamano === 1.15 ? '18.4px' : '20px';
    };

    const toggleDislexia = () => {
        const nuevo = !config.fuenteDislexia;
        setConfig(prev => ({ ...prev, fuenteDislexia: nuevo }));
        if (nuevo) {
            document.body.style.fontFamily = 'Arial, sans-serif';
            document.body.style.letterSpacing = '0.1em';
            document.body.style.wordSpacing = '0.2em';
            document.body.style.lineHeight = '1.8';
        } else {
            document.body.style.fontFamily = '';
            document.body.style.letterSpacing = '';
            document.body.style.wordSpacing = '';
            document.body.style.lineHeight = '';
        }
    };

    const toggleLinks = () => {
        const nuevo = !config.destacarLinks;
        setConfig(prev => ({ ...prev, destacarLinks: nuevo }));
        const style = document.getElementById('highlight-links-style');
        if (nuevo) {
            if (!style) {
                const s = document.createElement('style');
                s.id = 'highlight-links-style';
                s.innerHTML = 'a { text-decoration: underline !important; outline: 2px solid #4D9FC1 !important; outline-offset: 2px !important; }';
                document.head.appendChild(s);
            }
        } else {
            style?.remove();
        }
    };

    const toggleLector = () => {
        const nuevo = !config.lectorVoz;
        setConfig(prev => ({ ...prev, lectorVoz: nuevo }));
        if (!nuevo) window.speechSynthesis.cancel();
    };

    const toggleCursor = () => {
        const nuevo = !config.cursorGigante;
        setConfig(prev => ({ ...prev, cursorGigante: nuevo }));
        document.body.style.cursor = nuevo
            ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='black' stroke='white' stroke-width='1.5'%3E%3Cpath d='M3 3l15 9-6 2 4 8-3 1.5-4-8-3.5 4.5V3z'/%3E%3C/svg%3E"), auto`
            : '';
    };

    const restablecer = () => {
        setConfig({ tamanoTexto: 1, fuenteDislexia: false, destacarLinks: false, cursorGigante: false, lectorVoz: false });
        document.documentElement.style.fontSize = '16px';
        document.body.style.fontFamily = '';
        document.body.style.letterSpacing = '';
        document.body.style.wordSpacing = '';
        document.body.style.lineHeight = '';
        document.body.style.cursor = '';
        document.getElementById('highlight-links-style')?.remove();
        window.speechSynthesis.cancel();
    };

    const opciones = [
        {
            icon: Type,
            label: 'Fuente para Dislexia',
            desc: 'Tipografía óptima de lectura',
            activo: config.fuenteDislexia,
            toggle: toggleDislexia,
        },
        {
            icon: Link,
            label: 'Destacar Enlaces',
            desc: 'Subrayar e iluminar hipervínculos',
            activo: config.destacarLinks,
            toggle: toggleLinks,
        },
        {
            icon: Volume2,
            label: 'Lector de Voz Activo',
            desc: 'Pase el cursor sobre cualquier texto',
            activo: config.lectorVoz,
            toggle: toggleLector,
        },
        {
            icon: MousePointer,
            label: 'Cursor Gigante',
            desc: 'Aumentar visibilidad del puntero',
            activo: config.cursorGigante,
            toggle: toggleCursor,
        },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50">

            {/* Panel */}
            {abierto && (
                <div className="mb-3 w-72 rounded-2xl shadow-2xl overflow-hidden"
                    style={{ backgroundColor: '#0F243E', border: '1px solid rgba(77,159,193,0.3)' }}
                    role="dialog"
                    aria-label="Opciones de accesibilidad"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b"
                        style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                        <div>
                            <p className="text-white font-bold text-sm">Accesibilidad</p>
                            <p className="text-xs" style={{ color: '#4D9FC1' }}>OMIL Providencia</p>
                        </div>
                        <button onClick={() => setAbierto(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="Cerrar panel">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Tamaño texto */}
                    <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                        <div className="flex items-center gap-2 mb-3">
                            <Type className="w-4 h-4" style={{ color: '#4D9FC1' }} />
                            <p className="text-white text-xs font-semibold">Tamaño del texto</p>
                        </div>
                        <div className="flex gap-2">
                            {[
                                { label: 'X1\nDefecto', value: 1 },
                                { label: 'X1.15', value: 1.15 },
                                { label: 'X1.25', value: 1.25 },
                            ].map((t) => (
                                <button key={t.value} onClick={() => aplicarTamano(t.value)}
                                    className="flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all"
                                    style={{
                                        backgroundColor: config.tamanoTexto === t.value ? '#4D9FC1' : 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                    }}>
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Opciones */}
                    <div className="px-4 py-2">
                        {opciones.map((item) => (
                            <button key={item.label} onClick={item.toggle}
                                className="w-full flex items-center justify-between py-3 border-b
                  transition-colors hover:bg-white/5 rounded-lg px-2"
                                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                                aria-pressed={item.activo}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: item.activo ? '#4D9FC1' : 'rgba(255,255,255,0.1)' }}>
                                        <item.icon className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-white text-xs font-semibold">{item.label}</p>
                                        <p className="text-xs" style={{ color: '#9CA3AF' }}>{item.desc}</p>
                                    </div>
                                </div>
                                <div className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0"
                                    style={{
                                        borderColor: item.activo ? '#4D9FC1' : 'rgba(255,255,255,0.3)',
                                        backgroundColor: item.activo ? '#4D9FC1' : 'transparent',
                                    }}>
                                    {item.activo && <span className="text-white text-[10px] font-bold">✓</span>}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-3 flex items-center justify-between">
                        <button onClick={restablecer}
                            className="flex items-center gap-2 text-xs font-bold transition-colors hover:text-white"
                            style={{ color: '#4D9FC1' }}>
                            <RotateCcw className="w-3.5 h-3.5" />
                            Restablecer valores
                        </button>
                        <p className="text-xs" style={{ color: '#6B7280' }}>OMIL Providencia v2.6</p>
                    </div>
                </div>
            )}

            {/* Botón flotante con animación */}
            <button
                onClick={() => setAbierto(!abierto)}
                className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
                style={{
                    backgroundColor: '#4D9FC1',
                    animation: 'pulse-accessibility 2s ease-in-out infinite',
                }}
                aria-label="Abrir opciones de accesibilidad"
                aria-expanded={abierto}
            >
                <Accessibility className="w-7 h-7 text-white" />
            </button>
        </div>
    );
};

export default AccesibilidadWidget;