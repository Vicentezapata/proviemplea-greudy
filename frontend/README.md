# ProviEmplea — Frontend

**Plataforma oficial de empleabilidad de la Municipalidad de Providencia**  
Proyecto de evaluación — Instituto Profesional San Sebastián  
Módulo: Desarrollo de Aplicaciones Frontend  

---

|--------|-----|--------|
 Desarrollo Frontend | React + Vite + Tailwind |
 Desarrollo Backend | Node.js + Express + PostgreSQL |

---

## Descripción del proyecto

ProviEmplea es una plataforma web institucional que conecta a vecinos de la comuna de Providencia con empresas socias a través de la Oficina Municipal de Intermediación Laboral (OMIL). El sistema implementa el modelo de **CV Ciego** para eliminar sesgos en los procesos de selección: las empresas solo ven competencias y experiencia, sin datos personales del postulante.

El proyecto está dividido en dos repositorios integrados:
- **Frontend** (este repositorio) — interfaz React desarrollada por Nicol Orellana
- **Backend** — API REST desarrollada por Greudy Inoa

---

## Stack tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19 | Librería principal de UI |
| Vite | 6 | Bundler y servidor de desarrollo |
| Tailwind CSS | 3 | Framework de estilos utilitarios |
| React Router DOM | 7 | Enrutamiento del lado del cliente |
| Axios | 1.x | Cliente HTTP para consumir la API |
| Lucide React | 0.x | Librería de íconos SVG |
| React Icons | 5.x | Íconos de redes sociales (fa6) |

---

## Requisitos previos

- Node.js v18 o superior
- npm v9 o superior
- Backend de Greudy corriendo en `http://localhost:3000`
- PostgreSQL con base de datos `proviemplea` configurada

---

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/GreudyInoa/proviemplea.git
cd proviemplea
git checkout frontend/nicol
```

### 2. Instalar dependencias del frontend

```bash
cd frontend
npm install
```

### 3. Verificar variables de entorno del backend

El backend requiere un archivo `.env` en `backend/` con el siguiente contenido:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=proviemplea
DB_USER=postgres
DB_PASS=1234
JWT_SECRET=proviemplea2026secreto
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:5174
```

> **Importante:** En `backend/src/config/connection.js` eliminar la línea `require('dotenv').config()` para evitar conflicto con dotenvx.

### 4. Correr el backend

```bash
cd backend
node server.js
```

Verificar que aparezca: `✅ Base de datos conectada`

### 5. Correr el frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en: `http://localhost:5174`

---

## Estructura del proyecto

```
frontend/
├── public/
│   └── images/
│       ├── logo-proviemplea.png
│       ├── logo-providencia.png
│       └── hero-costanera.jpg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Barra superior con notificaciones por rol
│   │   │   ├── Sidebar.jsx         # Navegación lateral por rol
│   │   │   └── PrivateRoute.jsx    # Protección de rutas por rol
│   │   └── ui/
│   │       ├── AccesibilidadWidget.jsx  # Widget WCAG 2.1 flotante
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Badge.jsx
│   │       ├── Card.jsx
│   │       ├── Modal.jsx
│   │       ├── Toast.jsx
│   │       ├── Alert.jsx
│   │       ├── Skeleton.jsx
│   │       ├── EmptyState.jsx
│   │       └── FileUpload.jsx
│   ├── pages/
│   │   ├── Landing.jsx             # Página pública principal
│   │   ├── NotFound.jsx            # Error 404
│   │   ├── ServerError.jsx         # Error 500
│   │   ├── AccesoDenegado.jsx      # Sin permisos
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── RegistroTalento.jsx
│   │   │   ├── RegistroEmpresa.jsx
│   │   │   └── RecuperarPassword.jsx
│   │   ├── talento/
│   │   │   ├── DashboardTalento.jsx
│   │   │   ├── PerfilTalento.jsx
│   │   │   ├── CompletarPerfil.jsx  # Formulario multi-paso (5 pasos)
│   │   │   ├── CVCiego.jsx
│   │   │   ├── MisSolicitudes.jsx
│   │   │   ├── HistorialProcesos.jsx
│   │   │   ├── CargaArchivos.jsx   # Drag & drop documentos
│   │   │   ├── ValidacionCuenta.jsx
│   │   │   ├── Mensajes.jsx
│   │   │   └── Ayuda.jsx
│   │   ├── empresa/
│   │   │   ├── DashboardEmpresa.jsx
│   │   │   ├── PerfilEmpresa.jsx
│   │   │   ├── VitrinaTalentos.jsx
│   │   │   ├── DetalleTalento.jsx
│   │   │   ├── SeguimientoCandidatos.jsx
│   │   │   ├── HistorialSolicitudes.jsx
│   │   │   └── MensajesEmpresa.jsx
│   │   └── admin/
│   │       ├── DashboardAdmin.jsx
│   │       ├── GestionTalentos.jsx
│   │       ├── DetalleTalentoAdmin.jsx  # Ficha de fiscalización municipal
│   │       ├── GestionEmpresas.jsx
│   │       ├── DetalleEmpresa.jsx
│   │       ├── SolicitudesAdmin.jsx
│   │       ├── EnvioTalentos.jsx
│   │       ├── SeguimientoProcesos.jsx
│   │       ├── Estadisticas.jsx
│   │       ├── Exportacion.jsx
│   │       └── MensajesAdmin.jsx
│   ├── context/
│   │   └── AuthContext.jsx         # Estado global de sesión JWT
│   ├── services/
│   │   └── api.js                  # Axios + interceptores + servicios por módulo
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   ├── utils/
│   │   ├── formatters.js           # Formateo de fechas, montos, RUT
│   │   └── validators.js           # Validaciones de formularios
│   ├── constants/
│   │   └── api.js                  # URL base, roles, estados, catálogos
│   ├── styles/
│   │   └── animations.css
│   ├── App.jsx                     # Enrutador principal con lazy loading
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Roles y flujo de usuario

El sistema maneja tres roles definidos en la base de datos (`id_rol`):

| id_rol | Rol | Portal | Dashboard |
|--------|-----|--------|-----------|
| 1 | Admin / OMIL | Mesa de Control | `/admin/dashboard` |
| 2 | Talento / Vecino | Portal Vecinos | `/talento/dashboard` |
| 3 | Empresa | Portal Empresas | `/empresa/dashboard` |

### Flujo del vecino (talento)
1. Registro en `/registro/talento`
2. Login → redirige a `/talento/dashboard`
3. Subir documentos en `/talento/archivos`
4. Esperar validación OMIL (24-48 hrs hábiles)
5. Completar perfil en `/talento/completar-perfil`
6. Aparecer en la vitrina de empresas

### Flujo de la empresa
1. Registro en `/registro/empresa`
2. Login → redirige a `/empresa/dashboard`
3. Explorar vitrina en `/empresa/vitrina`
4. Solicitar contacto con talento
5. OMIL gestiona el proceso de intermediación

### Flujo del funcionario OMIL
1. Login con cuenta admin → redirige a `/admin/dashboard`
2. Validar vecinos en `/admin/talentos`
3. Gestionar solicitudes en `/admin/solicitudes`
4. Enviar talentos a empresas en `/admin/envio-talentos`
5. Monitorear procesos en `/admin/seguimiento`

---

## Identidad visual

| Variable | Color | Uso |
|----------|-------|-----|
| Primary | `#4D9FC1` | Azul turquesa Providencia — botones, activos |
| Secondary | `#0F243E` | Azul oscuro — navbar, sidebar, headers |
| Background | `#F8FAFC` | Fondo claro de la aplicación |
| Success | `#22C55E` | Estados aprobados, éxito |
| Warning | `#F59E0B` | Pendientes, advertencias |
| Error | `#EF4444` | Rechazados, errores |

**Tipografía:** Inter (texto) + Manrope (títulos) — Google Fonts

---

## Funcionalidades implementadas

### Autenticación y seguridad
- Login con JWT almacenado en `localStorage`
- Interceptor Axios agrega token en cada request automáticamente
- Si el token expira (401), cierra sesión y redirige al login
- `PrivateRoute` protege rutas según `id_rol` del usuario

### Accesibilidad WCAG 2.1
El widget flotante de accesibilidad permite:
- Aumentar/disminuir tamaño de texto
- Activar fuente para dislexia (OpenDyslexic)
- Resaltar todos los enlaces
- Lector de pantalla (síntesis de voz)
- Cursor gigante

### CV Ciego
Los perfiles de vecinos se muestran a empresas sin nombre, foto, edad, género ni dirección. Solo se revelan datos personales si el vecino autoriza explícitamente a través de la OMIL.

### Notificaciones dinámicas por rol
El panel de notificaciones en el navbar muestra notificaciones específicas según el rol del usuario logueado — diferentes para vecinos, empresas y funcionarios OMIL.

### Formulario multi-paso (CompletarPerfil)
5 pasos con stepper visual: Datos básicos → Educación → Experiencia laboral → Competencias → Preferencias laborales.

### Drag & Drop documentos
La página de carga de archivos implementa drag & drop con validación de tipo (PDF, JPG, PNG) y tamaño (máximo 5MB).

---

## Conexión con el backend

La URL base de la API está definida en `src/constants/api.js`:

```javascript
export const API_BASE_URL = 'http://localhost:3000/api/v1';
```

### Servicios implementados

| Servicio | Archivo | Endpoints |
|----------|---------|-----------|
| `authService` | `api.js` | POST /auth/login, POST /auth/register/* |
| `talentoService` | `api.js` | GET/PUT /talentos/perfil, POST /talentos/educacion, etc. |
| `vitrinaService` | `api.js` | GET /vitrina, GET /vitrina/:id |
| `empresaService` | `api.js` | GET/PUT /empresas/perfil, GET /empresas/solicitudes |
| `solicitudService` | `api.js` | POST /solicitudes, PATCH /solicitudes/:id/estado |
| `adminService` | `api.js` | GET /admin/usuarios, PATCH /admin/usuarios/:id/validar |
| `archivoService` | `api.js` | POST /talentos/archivos (multipart/form-data) |
| `catalogoService` | `api.js` | GET /catalogos/rubros, GET /catalogos/competencias |

### Endpoints pendientes de implementar (Greudy)
Los siguientes endpoints están consumidos en el frontend pero aún no existen en el backend:
- `GET /talentos/perfil`
- `GET /talentos/solicitudes`
- `GET /talentos/estadisticas`
- `GET /talentos/historial`

El frontend maneja estos 404 con `try/catch` y muestra estados vacíos sin romper la aplicación.

---

## Comandos disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Lint
npm run lint
```

---

## Notas de desarrollo

### Bug conocido en React 19
Las extensiones del navegador Chrome pueden causar el error `removeChild on Node`. **Solución:** usar Chrome en modo incógnito (`Ctrl+Shift+N`) durante el desarrollo, ya que las extensiones no se cargan en modo incógnito.

### Rate limiting del backend
El backend de Greudy implementa rate limiting en el endpoint de login. Si se exceden los intentos, el sistema bloquea por 15 minutos.

### Crear usuario administrador
Para crear un usuario con rol admin (OMIL), ejecutar directamente en PostgreSQL:

```sql
UPDATE usuarios SET id_rol = 1 WHERE correo = 'correo@ejemplo.cl';
```

---

## Despliegue

El frontend está configurado para desplegarse en **Vercel**:

1. Conectar el repositorio de GitHub a Vercel
2. Configurar el directorio raíz como `frontend/`
3. Comando de build: `npm run build`
4. Directorio de salida: `dist/`
5. Agregar variable de entorno: `VITE_API_URL=https://tu-backend.railway.app/api/v1`

---

## Licencia

Proyecto académico — Instituto Profesional San Sebastián, 2026.  
Municipalidad de Providencia — OMIL Municipal.
