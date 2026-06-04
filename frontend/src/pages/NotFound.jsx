// =============================================
// PROVIEMPLEA - PÁGINA 404
// archivo: src/pages/NotFound.jsx
// =============================================

import { Link } from 'react-router-dom';
import { Home, ArrowLeft, SearchX } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NotFound = () => {
    const { getDashboardRuta, estaAutenticado } = useAuth();

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center
          justify-center mx-auto mb-6">
                    <SearchX className="w-12 h-12 text-slate-400" />
                </div>
                <h1 className="text-8xl font-black mb-2" style={{ color: '#4D9FC1' }}>404</h1>
                <h2 className="text-2xl font-bold mb-3" style={{ color: '#0F243E' }}>
                    Página no encontrada
                </h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                    La página que buscas no existe o fue movida.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5
              text-sm font-semibold text-slate-600 bg-white border border-slate-200
              rounded-xl hover:bg-slate-50 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Volver atrás
                    </button>
                    <Link to={estaAutenticado ? getDashboardRuta() : '/'}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5
              text-sm font-semibold text-white rounded-xl hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#4D9FC1' }}>
                        <Home className="w-4 h-4" />
                        Ir al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;