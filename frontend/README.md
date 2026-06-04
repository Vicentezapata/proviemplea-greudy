<div align="center">

<img src="public/images/logo-proviemplea.png" alt="ProviEmplea Logo" width="200"/>

# ProviEmplea — Frontend

### Plataforma oficial de empleabilidad de la Municipalidad de Providencia

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com)
[![WCAG](https://img.shields.io/badge/WCAG-2.1_AA-00A86B?style=for-the-badge&logo=w3c&logoColor=white)](https://www.w3.org/WAI/WCAG21/quickref/)

[![GitHub branch](https://img.shields.io/badge/rama-frontend%2Fnicol-4D9FC1?style=flat-square&logo=github)](https://github.com/GreudyInoa/proviemplea/tree/frontend/nicol)
[![License](https://img.shields.io/badge/license-Académico-orange?style=flat-square)](.)
[![Instituto](https://img.shields.io/badge/IP-San_Sebastián-red?style=flat-square)](.)

</div>

---

## 📋 Descripción

**ProviEmplea** es una plataforma web institucional que conecta a vecinos de la comuna de Providencia con empresas socias a través de la **Oficina Municipal de Intermediación Laboral (OMIL)**. El sistema implementa el modelo de **CV Ciego** para eliminar sesgos en los procesos de selección.

> Las empresas solo ven competencias y experiencia — nunca datos personales del postulante.

---

## ✨ Características principales

| Feature | Descripción |
|---------|-------------|
| 🎭 **CV Ciego** | Perfiles sin nombre, foto, edad, género ni dirección |
| 🔐 **Autenticación JWT** | Login seguro con token almacenado y renovación automática |
| 👥 **3 portales por rol** | Vecino, Empresa y Funcionario OMIL |
| ♿ **WCAG 2.1 AA** | Widget flotante de accesibilidad con 5 funciones |
| 📱 **Responsive** | Adaptado para mobile, tablet y desktop |
| ⚡ **Lazy Loading** | Carga diferida de páginas para máximo rendimiento |
| 🔔 **Notificaciones** | Panel de notificaciones dinámico por rol |
| 📨 **Mensajería interna** | Bandeja institucional vecino ↔ OMIL ↔ empresa |
| 📊 **Dashboard ejecutivo** | KPIs en tiempo real para funcionarios OMIL |
| 📤 **Exportación** | Reportes en Excel y PDF |

---

## 🗂️ Estructura del proyecto

```
frontend/
├── 📁 public/
│   └── 📁 images/          # Logos y assets institucionales
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 layout/       # Navbar, Sidebar, PrivateRoute
│   │   └── 📁 ui/           # Button, Input, Modal, Toast, Badge...
│   ├── 📁 pages/
│   │   ├── 📁 auth/         # Login, Registro, RecuperarPassword
│   │   ├── 📁 talento/      # 10 páginas del portal vecino
│   │   ├── 📁 empresa/      # 7 páginas del portal empresa
│   │   └── 📁 admin/        # 11 páginas Mesa Control OMIL
│   ├── 📁 context/          # AuthContext — estado global JWT
│   ├── 📁 services/         # api.js — Axios + interceptores
│   ├── 📁 hooks/            # useAuth, useFetch, useCountUp
│   ├── 📁 utils/            # formatters.js, validators.js
│   ├── 📁 constants/        # api.js — roles, estados, catálogos
│   └── 📁 styles/           # animations.css
├── 📄 App.jsx               # Enrutador con lazy loading
├── 📄 vite.config.js
└── 📄 tailwind.config.js
```

---

## 🚀 Instalación y uso

### Prerrequisitos

- Node.js `v18+`
- npm `v9+`
- Backend corriendo en `http://localhost:3000`

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/GreudyInoa/proviemplea.git
cd proviemplea
git checkout frontend/nicol

# 2. Instalar dependencias
cd frontend
npm install

# 3. Correr en desarrollo
npm run dev
```

> 🌐 La app estará disponible en **http://localhost:5173**

### Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo con HMR
npm run build    # Build optimizado para producción
npm run preview  # Preview del build
npm run lint     # Análisis estático del código
```

---

## 🎨 Identidad visual

<div align="center">

| Color | Hex | Uso |
|-------|-----|-----|
| 🔵 Azul Providencia | `#4D9FC1` | Botones, activos, badges |
| 🌑 Azul Institucional | `#0F243E` | Navbar, sidebar, headers |
| ⬜ Fondo | `#F8FAFC` | Background general |
| 🟢 Éxito | `#22C55E` | Aprobados, validaciones |
| 🟡 Advertencia | `#F59E0B` | Pendientes, alertas |
| 🔴 Error | `#EF4444` | Rechazados, errores |

</div>

**Tipografía:** `Inter` (texto) + `Manrope` (títulos) — Google Fonts

---

## 👥 Portales por rol

### 🏠 Portal Vecinos `id_rol = 2`

| Página | Ruta |
|--------|------|
| Dashboard | `/talento/dashboard` |
| Mi Perfil | `/talento/perfil` |
| Completar Perfil | `/talento/completar-perfil` |
| CV Ciego | `/talento/cv-ciego` |
| Mis Solicitudes | `/talento/solicitudes` |
| Historial | `/talento/historial` |
| Mis Archivos | `/talento/archivos` |
| Mensajes | `/talento/mensajes` |
| Ayuda | `/talento/ayuda` |

### 🏢 Portal Empresas `id_rol = 3`

| Página | Ruta |
|--------|------|
| Dashboard | `/empresa/dashboard` |
| Vitrina de Talentos | `/empresa/vitrina` |
| Seguimiento | `/empresa/seguimiento` |
| Historial | `/empresa/historial` |
| Mensajes | `/empresa/mensajes` |

### 🏛️ Mesa Control OMIL `id_rol = 1`

| Página | Ruta |
|--------|------|
| Dashboard Ejecutivo | `/admin/dashboard` |
| Gestión Talentos | `/admin/talentos` |
| Gestión Empresas | `/admin/empresas` |
| Solicitudes | `/admin/solicitudes` |
| Estadísticas | `/admin/estadisticas` |
| Exportación | `/admin/exportacion` |
| Mensajes OMIL | `/admin/mensajes` |

---

## 🔌 Conexión con el Backend

URL base configurada en `src/constants/api.js`:

```javascript
export const API_BASE_URL = 'http://localhost:3000/api/v1';
```

### Servicios implementados

```javascript
authService       // POST /auth/login | /auth/register/*
talentoService    // GET|PUT /talentos/perfil | educacion | laboral
vitrinaService    // GET /vitrina | /vitrina/:id
empresaService    // GET|PUT /empresas/perfil | solicitudes
solicitudService  // POST /solicitudes | PATCH /solicitudes/:id/estado
adminService      // GET /admin/usuarios | estadisticas | empresas
archivoService    // POST /talentos/archivos (multipart/form-data)
catalogoService   // GET /catalogos/rubros | competencias
```

### Manejo de errores HTTP

```javascript
// Interceptor global en Axios
401 → Cierra sesión y redirige al login
403 → Redirige a /acceso-denegado
404 → Muestra estado vacío sin romper la UI
500 → Redirige a /500
```

---

## ♿ Accesibilidad WCAG 2.1

Widget flotante disponible en todas las páginas:

```
✅ Aumentar / disminuir tamaño de texto
✅ Fuente para dislexia (OpenDyslexic)
✅ Resaltar todos los enlaces
✅ Lector de pantalla (síntesis de voz)
✅ Cursor gigante
```

Implementaciones en el código:
- `aria-label` en todos los elementos interactivos
- `aria-current="page"` en navegación activa
- `aria-invalid` + `aria-describedby` en formularios
- `role="alert"` en mensajes de error
- Contraste mínimo `4.5:1` en texto sobre fondos
- Navegación completa por teclado
- Estructura semántica `<nav>` `<main>` `<aside>`

---

## 🔒 Seguridad Frontend

```javascript
// JWT
✅ Token almacenado en localStorage
✅ Interceptor Axios agrega Bearer token automáticamente
✅ Expiración detectada → logout automático

// Validaciones
✅ Validación RUT chileno con dígito verificador
✅ Validación de correo con regex
✅ Sanitización de inputs (previene XSS)
✅ Validación de archivos (tipo + tamaño)
✅ PrivateRoute protege rutas por id_rol
```

---

## ⚡ Optimización de rendimiento

```javascript
// Code splitting con lazy loading
const DashboardTalento = lazy(() => import('./pages/talento/DashboardTalento'));

// Todas las páginas usan lazy loading
// Bundle inicial mínimo — solo carga lo necesario
// Imágenes optimizadas en /public/images/
// Tailwind purga clases no usadas en build
```

---

## 🌿 Git y control de versiones

```bash
# Rama del frontend
git checkout frontend/nicol

# Convención de commits
feat:      nueva funcionalidad
fix:       corrección de bug
docs:      documentación
style:     cambios de estilo
refactor:  refactorización
```

---

## ⚠️ Notas importantes

> **Bug React 19 + extensiones Chrome**  
> Las extensiones del navegador pueden causar el error `removeChild on Node`.  
> **Solución:** usar Chrome en modo incógnito `Ctrl+Shift+N` durante el desarrollo.

> **Fix backend requerido**  
> En `backend/src/config/connection.js` eliminar la línea `require('dotenv').config()`.

> **Crear usuario admin**
> ```sql
> UPDATE usuarios SET id_rol = 1 WHERE correo = 'correo@ejemplo.cl';
> ```

---

## 🚢 Despliegue en Vercel

```bash
# Configuración
Root directory:  frontend/
Build command:   npm run build
Output dir:      dist/

# Variable de entorno
VITE_API_URL=https://tu-backend.railway.app/api/v1
```

---

<div align="center">

**Desarrollado con ❤️ para la Municipalidad de Providencia**

[![Providencia](https://img.shields.io/badge/Municipalidad-Providencia-4D9FC1?style=for-the-badge)](https://www.providencia.cl)
[![OMIL](https://img.shields.io/badge/OMIL-Municipal-0F243E?style=for-the-badge)](https://www.providencia.cl)

*Instituto Profesional San Sebastián — 2026*

</div>
