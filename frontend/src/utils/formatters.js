// =============================================
// PROVIEMPLEA - UTILIDADES DE FORMATO
// archivo: src/utils/formatters.js
// =============================================

export const formatearFecha = (fecha) => {
    if (!fecha) return '—';
    try {
        return new Date(fecha).toLocaleDateString('es-CL', {
            day: '2-digit', month: '2-digit', year: 'numeric',
        });
    } catch { return '—'; }
};

export const formatearFechaRelativa = (fecha) => {
    if (!fecha) return '—';
    const ahora = new Date();
    const date = new Date(fecha);
    const dias = Math.floor((ahora - date) / (1000 * 60 * 60 * 24));
    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Hace 1 día';
    if (dias < 7) return `Hace ${dias} días`;
    if (dias < 30) return `Hace ${Math.floor(dias / 7)} semanas`;
    if (dias < 365) return `Hace ${Math.floor(dias / 30)} meses`;
    return `Hace ${Math.floor(dias / 365)} años`;
};

export const formatearMonto = (monto) => {
    if (!monto && monto !== 0) return '—';
    return new Intl.NumberFormat('es-CL', {
        style: 'currency', currency: 'CLP', minimumFractionDigits: 0,
    }).format(monto);
};

export const formatearRUT = (rut) => {
    if (!rut) return '—';
    const limpio = rut.replace(/[^0-9kK]/g, '');
    if (limpio.length < 2) return limpio;
    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1).toUpperCase();
    return `${cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${dv}`;
};

export const truncarTexto = (texto, maxLength = 100) => {
    if (!texto) return '—';
    if (texto.length <= maxLength) return texto;
    return `${texto.substring(0, maxLength)}...`;
};

export const capitalizarTexto = (texto) => {
    if (!texto) return '';
    return texto.toLowerCase().split(' ')
        .map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
};

export const obtenerIniciales = (nombre) => {
    if (!nombre) return '??';
    return nombre.split(' ').slice(0, 2)
        .map(n => n.charAt(0).toUpperCase()).join('');
};