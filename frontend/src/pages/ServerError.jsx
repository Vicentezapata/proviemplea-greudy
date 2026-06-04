const Page = () => <div className='p-8'>En construcción</div>; export default Page;
// =============================================
// PROVIEMPLEA - PÁGINA 500
// archivo: src/pages/ServerError.jsx
// =============================================

import { Link } from 'react-router-dom';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

const ServerError = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center
          justify-center mx-auto mb-6">
                    <AlertTriangle className="w-12 h-12 text-red-400" />
                </div>
                <h1 className="text-8xl font-black mb-2 text-red-400">500</h1>
                <h2 className="text-2xl font-bold mb-3" style={{ color: '#0F243E' }}>
                    Error del servidor
                </h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                    Ocurrió un error interno. Por favor intenta nuevamente en unos minutos.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button onClick={() => window.location.reload()}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5
              text-sm font-semibold text-slate-600 bg-white border border-slate-200
              rounded-xl hover:bg-slate-50 transition-colors">
                        <RefreshCw className="w-4 h-4" />
                        Reintentar
                    </button>
                    <Link to="/"
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

export default ServerError;