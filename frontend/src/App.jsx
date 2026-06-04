// =============================================
// PROVIEMPLEA - ENRUTADOR PRINCIPAL
// archivo: src/App.jsx
// =============================================

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Suspense, lazy } from 'react';
import PrivateRoute from './components/layout/PrivateRoute';
import { ROLES } from './constants/api';

const LoadingPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-[#4D9FC1]
        rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-gray-500 text-sm">Cargando...</p>
    </div>
  </div>
);

// Públicas
const Landing = lazy(() => import('./pages/Landing'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ServerError = lazy(() => import('./pages/ServerError'));
const AccesoDenegado = lazy(() => import('./pages/AccesoDenegado'));

// Auth
const Login = lazy(() => import('./pages/auth/Login'));
const RegistroTalento = lazy(() => import('./pages/auth/RegistroTalento'));
const RegistroEmpresa = lazy(() => import('./pages/auth/RegistroEmpresa'));
const RecuperarPassword = lazy(() => import('./pages/auth/RecuperarPassword'));

// Talento
const DashboardTalento = lazy(() => import('./pages/talento/DashboardTalento'));
const PerfilTalento = lazy(() => import('./pages/talento/PerfilTalento'));
const CompletarPerfil = lazy(() => import('./pages/talento/CompletarPerfil'));
const CVCiego = lazy(() => import('./pages/talento/CVCiego'));
const MisSolicitudes = lazy(() => import('./pages/talento/MisSolicitudes'));
const HistorialProcesos = lazy(() => import('./pages/talento/HistorialProcesos'));
const ValidacionCuenta = lazy(() => import('./pages/talento/ValidacionCuenta'));
const CargaArchivos = lazy(() => import('./pages/talento/CargaArchivos'));
const Mensajes = lazy(() => import('./pages/talento/Mensajes'));
const Ayuda = lazy(() => import('./pages/talento/Ayuda'));

// Empresa
const DashboardEmpresa = lazy(() => import('./pages/empresa/DashboardEmpresa'));
const PerfilEmpresa = lazy(() => import('./pages/empresa/PerfilEmpresa'));
const VitrinaTalentos = lazy(() => import('./pages/empresa/VitrinaTalentos'));
const DetalleTalento = lazy(() => import('./pages/empresa/DetalleTalento'));
const SeguimientoCandidatos = lazy(() => import('./pages/empresa/SeguimientoCandidatos'));
const HistorialSolicitudes = lazy(() => import('./pages/empresa/HistorialSolicitudes'));
const MensajesEmpresa = lazy(() => import('./pages/empresa/MensajesEmpresa'));

// Admin
const DashboardAdmin = lazy(() => import('./pages/admin/DashboardAdmin'));
const GestionTalentos = lazy(() => import('./pages/admin/GestionTalentos'));
const DetalleTalentoAdmin = lazy(() => import('./pages/admin/DetalleTalentoAdmin'));
const GestionEmpresas = lazy(() => import('./pages/admin/GestionEmpresas'));
const DetalleEmpresa = lazy(() => import('./pages/admin/DetalleEmpresa'));
const SolicitudesAdmin = lazy(() => import('./pages/admin/SolicitudesAdmin'));
const EnvioTalentos = lazy(() => import('./pages/admin/EnvioTalentos'));
const SeguimientoProcesos = lazy(() => import('./pages/admin/SeguimientoProcesos'));
const Estadisticas = lazy(() => import('./pages/admin/Estadisticas'));
const Exportacion = lazy(() => import('./pages/admin/Exportacion'));
const MensajesAdmin = lazy(() => import('./pages/admin/MensajesAdmin'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            {/* Públicas */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro/talento" element={<RegistroTalento />} />
            <Route path="/registro/empresa" element={<RegistroEmpresa />} />
            <Route path="/recuperar-password" element={<RecuperarPassword />} />
            <Route path="/500" element={<ServerError />} />
            <Route path="/acceso-denegado" element={<AccesoDenegado />} />

            {/* Talento */}
            <Route path="/talento/validacion" element={<ValidacionCuenta />} />
            <Route path="/talento/archivos" element={<CargaArchivos />} />
            <Route path="/talento/dashboard" element={
              <PrivateRoute roles={[ROLES.TALENTO]}><DashboardTalento /></PrivateRoute>} />
            <Route path="/talento/perfil" element={
              <PrivateRoute roles={[ROLES.TALENTO]}><PerfilTalento /></PrivateRoute>} />
            <Route path="/talento/completar-perfil" element={
              <PrivateRoute roles={[ROLES.TALENTO]}><CompletarPerfil /></PrivateRoute>} />
            <Route path="/talento/cv-ciego" element={
              <PrivateRoute roles={[ROLES.TALENTO]}><CVCiego /></PrivateRoute>} />
            <Route path="/talento/solicitudes" element={
              <PrivateRoute roles={[ROLES.TALENTO]}><MisSolicitudes /></PrivateRoute>} />
            <Route path="/talento/historial" element={
              <PrivateRoute roles={[ROLES.TALENTO]}><HistorialProcesos /></PrivateRoute>} />
            <Route path="/talento/mensajes" element={
              <PrivateRoute roles={[ROLES.TALENTO]}><Mensajes /></PrivateRoute>} />
            <Route path="/talento/ayuda" element={
              <PrivateRoute roles={[ROLES.TALENTO]}><Ayuda /></PrivateRoute>} />

            {/* Empresa */}
            <Route path="/empresa/dashboard" element={
              <PrivateRoute roles={[ROLES.EMPRESA]}><DashboardEmpresa /></PrivateRoute>} />
            <Route path="/empresa/perfil" element={
              <PrivateRoute roles={[ROLES.EMPRESA]}><PerfilEmpresa /></PrivateRoute>} />
            <Route path="/empresa/vitrina" element={
              <PrivateRoute roles={[ROLES.EMPRESA]}><VitrinaTalentos /></PrivateRoute>} />
            <Route path="/empresa/talento/:id" element={
              <PrivateRoute roles={[ROLES.EMPRESA]}><DetalleTalento /></PrivateRoute>} />
            <Route path="/empresa/seguimiento" element={
              <PrivateRoute roles={[ROLES.EMPRESA]}><SeguimientoCandidatos /></PrivateRoute>} />
            <Route path="/empresa/historial" element={
              <PrivateRoute roles={[ROLES.EMPRESA]}><HistorialSolicitudes /></PrivateRoute>} />
            <Route path="/empresa/mensajes" element={
              <PrivateRoute roles={[ROLES.EMPRESA]}><MensajesEmpresa /></PrivateRoute>} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={
              <PrivateRoute roles={[ROLES.ADMIN]}><DashboardAdmin /></PrivateRoute>} />
            <Route path="/admin/talentos" element={
              <PrivateRoute roles={[ROLES.ADMIN]}><GestionTalentos /></PrivateRoute>} />
            <Route path="/admin/talentos/:id" element={
              <PrivateRoute roles={[ROLES.ADMIN]}><DetalleTalentoAdmin /></PrivateRoute>} />
            <Route path="/admin/empresas" element={
              <PrivateRoute roles={[ROLES.ADMIN]}><GestionEmpresas /></PrivateRoute>} />
            <Route path="/admin/empresas/:id" element={
              <PrivateRoute roles={[ROLES.ADMIN]}><DetalleEmpresa /></PrivateRoute>} />
            <Route path="/admin/solicitudes" element={
              <PrivateRoute roles={[ROLES.ADMIN]}><SolicitudesAdmin /></PrivateRoute>} />
            <Route path="/admin/envio-talentos" element={
              <PrivateRoute roles={[ROLES.ADMIN]}><EnvioTalentos /></PrivateRoute>} />
            <Route path="/admin/seguimiento" element={
              <PrivateRoute roles={[ROLES.ADMIN]}><SeguimientoProcesos /></PrivateRoute>} />
            <Route path="/admin/estadisticas" element={
              <PrivateRoute roles={[ROLES.ADMIN]}><Estadisticas /></PrivateRoute>} />
            <Route path="/admin/exportacion" element={
              <PrivateRoute roles={[ROLES.ADMIN]}><Exportacion /></PrivateRoute>} />
            <Route path="/admin/mensajes" element={
              <PrivateRoute roles={[ROLES.ADMIN]}><MensajesAdmin /></PrivateRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;