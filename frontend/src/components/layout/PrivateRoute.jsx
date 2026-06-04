// =============================================
// PROVIEMPLEA - RUTAS PROTEGIDAS
// archivo: src/components/layout/PrivateRoute.jsx
// descripción: Protege rutas según autenticación
// y rol del usuario. Si no está autenticado
// redirige al login. Si tiene rol incorrecto
// redirige a su dashboard correspondiente.
// =============================================

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../constants/api';

const CargandoSesion = () => (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-[#4D9FC1]
        rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-slate-500 text-sm font-medium">Verificando sesión...</p>
        </div>
    </div>
);

const PrivateRoute = ({ children, roles = [] }) => {
    const { usuario, cargando, estaAutenticado } = useAuth();

    if (cargando) return <CargandoSesion />;
    if (!estaAutenticado) return <Navigate to="/login" replace />;

    if (roles.length > 0 && !roles.includes(usuario?.id_rol)) {
        if (usuario?.id_rol === ROLES.TALENTO) return <Navigate to="/talento/dashboard" replace />;
        if (usuario?.id_rol === ROLES.EMPRESA) return <Navigate to="/empresa/dashboard" replace />;
        if (usuario?.id_rol === ROLES.ADMIN) return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
};

export default PrivateRoute;