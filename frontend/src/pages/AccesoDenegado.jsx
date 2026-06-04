const Page = () => <div className='p-8'>En construcción</div>; export default Page;
// =============================================
// PROVIEMPLEA - ACCESO DENEGADO
// archivo: src/pages/AccesoDenegado.jsx
// =============================================

import { Link } from 'react-router-dom';
import { ShieldX, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AccesoDenegado = () => {
    const { getDashboardRuta } = useAuth();

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-yellow-50 rounded-3xl flex items-center
          justify-center mx-auto mb-6">
                    <ShieldX className="w-12 h-12 text-yellow-400" />
                </div>
                <h1 className="text-3xl font-black mb-3" style={{ color: '#0F243E' }}>
                    Acceso denegado
                </h1>
                <p className="text-slate-500 mb-8 leading-relaxed">
                    No tienes permisos para acceder a esta sección.
                    Si crees que esto es un error, contacta al equipo OMIL.
                </p>
                <Link to={getDashboardRuta()}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3
            text-sm font-semibold text-white rounded-xl hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#4D9FC1' }}>
                    <Home className="w-4 h-4" />
                    Ir a mi dashboard
                </Link>
            </div>
        </div>
    );
};

export default AccesoDenegado;