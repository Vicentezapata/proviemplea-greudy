// =============================================
// PROVIEMPLEA - CONTEXTO DE AUTENTICACIÓN
// archivo: src/context/AuthContext.jsx
// descripción: Maneja el estado global de la
// sesión del usuario. Cualquier componente
// puede acceder al usuario actual, su rol y
// las funciones de login/logout sin necesidad
// de pasar props manualmente entre componentes.
// =============================================

import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';
import { ROLES } from '../constants/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(() => {
        try {
            const guardado = localStorage.getItem('usuario');
            return guardado ? JSON.parse(guardado) : null;
        } catch { return null; }
    });

    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const usuarioGuardado = localStorage.getItem('usuario');
        if (token && usuarioGuardado) {
            try { setUsuario(JSON.parse(usuarioGuardado)); }
            catch {
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
            }
        }
        setCargando(false);
    }, []);

    const login = async (correo, password) => {
        const response = await authService.login({ correo, password });
        const { token, usuario } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        setUsuario(usuario);
        return usuario;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setUsuario(null);
    };

    const esTalento = () => usuario?.id_rol === ROLES.TALENTO;
    const esEmpresa = () => usuario?.id_rol === ROLES.EMPRESA;
    const esAdmin = () => usuario?.id_rol === ROLES.ADMIN;

    const getDashboardRuta = () => {
        if (esAdmin()) return '/admin/dashboard';
        if (esEmpresa()) return '/empresa/dashboard';
        if (esTalento()) return '/talento/dashboard';
        return '/login';
    };

    return (
        <AuthContext.Provider value={{
            usuario, cargando, login, logout,
            esTalento, esEmpresa, esAdmin,
            getDashboardRuta,
            estaAutenticado: !!usuario,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;