// =============================================
// PROVIEMPLEA - VALIDADORES DE FORMULARIOS
// archivo: src/utils/validators.js
// descripción: Funciones puras de validación
// para todos los formularios del sistema.
// Retornan un string con el error si hay alguno
// o null si la validación pasa correctamente.
// Se usan en Login, Registro, CompletarPerfil
// y cualquier formulario con campos validados.
// =============================================

// Valida que un campo no esté vacío
export const validarRequerido = (valor, nombreCampo = 'Este campo') => {
    if (!valor || String(valor).trim() === '') {
        return `${nombreCampo} es requerido.`;
    }
    return null;
};

// Valida formato de correo electrónico
export const validarCorreo = (correo) => {
    if (!correo || correo.trim() === '') return 'El correo es requerido.';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(correo)) return 'Ingresa un correo electrónico válido.';
    return null;
};

// Valida que la contraseña cumpla los requisitos mínimos
export const validarPassword = (password) => {
    if (!password) return 'La contraseña es requerida.';
    if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
    if (!/[A-Z]/.test(password)) return 'Debe incluir al menos una letra mayúscula.';
    if (!/[0-9]/.test(password)) return 'Debe incluir al menos un número.';
    return null;
};

// Valida que la confirmación de contraseña coincida
export const validarConfirmPassword = (password, confirmar) => {
    if (!confirmar) return 'Confirma tu contraseña.';
    if (password !== confirmar) return 'Las contraseñas no coinciden.';
    return null;
};

// Valida formato de RUT chileno (ej: 12.345.678-9)
export const validarRUT = (rut) => {
    if (!rut || rut.trim() === '') return 'El RUT es requerido.';
    const limpio = rut.replace(/[.\-]/g, '');
    if (limpio.length < 8 || limpio.length > 9) return 'Ingresa un RUT válido (ej: 12.345.678-9).';
    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1).toUpperCase();
    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : String(dvEsperado);
    if (dv !== dvCalculado) return 'El RUT ingresado no es válido.';
    return null;
};

// Valida que un archivo cumpla tipo y tamaño permitidos
export const validarArchivo = (archivo, tiposPermitidos = ['pdf', 'jpg', 'jpeg', 'png'], maxMB = 5) => {
    if (!archivo) return 'Selecciona un archivo.';
    const extension = archivo.name.split('.').pop().toLowerCase();
    if (!tiposPermitidos.includes(extension)) {
        return `Solo se permiten archivos: ${tiposPermitidos.join(', ').toUpperCase()}.`;
    }
    const maxBytes = maxMB * 1024 * 1024;
    if (archivo.size > maxBytes) {
        return `El archivo no debe superar los ${maxMB}MB.`;
    }
    return null;
};

// Sanitiza input removiendo caracteres peligrosos
export const sanitizarInput = (valor) => {
    if (!valor) return '';
    return String(valor)
        .replace(/[<>]/g, '')
        .trim();
};

// Valida un número de teléfono chileno
export const validarTelefono = (telefono) => {
    if (!telefono) return null; // opcional
    const regex = /^(\+56|56)?[\s-]?[2-9]\d{8}$/;
    const limpio = telefono.replace(/\s/g, '');
    if (!regex.test(limpio)) return 'Ingresa un teléfono válido (ej: +56 9 8765 4321).';
    return null;
};