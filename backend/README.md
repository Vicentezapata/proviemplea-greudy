<p align="center">
  <img src="assets/logo_proviemplea.png" alt="ProviEmplea" width="100%"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-5-blue" alt="Express"/>
  <img src="https://img.shields.io/badge/PostgreSQL-14+-blue" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Tests-47%20passing-brightgreen" alt="Tests"/>
  <img src="https://img.shields.io/badge/License-ISC-yellow" alt="License"/>
</p>

<p align="center">
  🚧 <strong>Estado:</strong> En desarrollo activo — Mayo 2026
</p>

---

## 📋 Tabla de Contenidos

- [¿Qué hace este proyecto?](#qué-hace-este-proyecto)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Cómo instalar y ejecutar](#cómo-instalar-y-ejecutar)
- [Configuración](#configuración-env)
- [Módulos disponibles](#módulos-disponibles)
- [Flujo del sistema](#flujo-del-sistema)
- [Roles del sistema](#roles-del-sistema)
- [Documentación de la API](#documentación-de-la-api)
- [Seguridad](#seguridad)
- [Pruebas](#pruebas)
- [Documentación](#documentación)
- [Equipo](#equipo)
- [Cliente](#cliente)

---

## ¿Qué hace este proyecto?

ProviEmplea funciona al revés de una bolsa de empleo tradicional: **las empresas buscan a los candidatos**, no al revés. Los vecinos de Providencia crean un perfil con su experiencia, habilidades e idiomas. Las empresas pueden buscar y filtrar candidatos sin ver su nombre, edad, género ni comuna — solo sus competencias.

Este repositorio contiene el **backend** (servidor y API) que alimenta la plataforma.

---

## Tecnologías utilizadas

| Capa | Tecnología | Descripción |
|------|-----------|-------------|
| Servidor | Node.js + Express 5 | Recibe y responde las peticiones del frontend |
| Base de datos | PostgreSQL 14+ | Almacena toda la información del sistema |
| ORM | Sequelize 6 | Manejo de la base de datos sin SQL manual |
| Autenticación | JWT + bcryptjs | Tokens seguros y contraseñas cifradas |
| Documentación | Swagger / OpenAPI | Documentación interactiva de la API |
| Archivos | Multer | Gestión de CVs y comprobantes |
| Pruebas | Jest + Supertest | Pruebas automáticas del sistema |
| Seguridad | Helmet + CORS + Rate Limit | Protección contra ataques comunes |

---

## Estructura del proyecto

```
backend/
├── assets/              # Logo e imágenes del proyecto
├── docs/                # Documentación (Word, SQL)
├── src/
│   ├── config/          # Configuración de base de datos y archivos
│   ├── controllers/     # Reciben las peticiones y devuelven respuestas
│   ├── docs/            # Documentación Swagger (swagger.yaml)
│   ├── middleware/      # Seguridad, roles y manejo de errores
│   ├── migrations/      # Creación de tablas en la base de datos
│   ├── models/          # Representación de las tablas de la BD
│   ├── routes/          # Rutas disponibles de la API
│   ├── seeders/         # Datos iniciales del sistema
│   ├── services/        # Lógica principal del negocio
│   ├── tests/           # Pruebas unitarias y de integración
│   ├── uploads/         # Archivos subidos por los talentos
│   ├── utils/           # Funciones de apoyo
│   ├── validators/      # Validación de datos recibidos
│   └── app.js           # Configuración Express
├── .env                 # Variables de entorno (no commiteado)
├── .env.example         # Plantilla de configuración
├── .gitignore
├── .sequelizerc         # Configuración de Sequelize CLI
├── eslint.config.js     # Configuración de ESLint
├── package.json
├── SECURITY.md          # Política de seguridad
└── server.js            # Punto de inicio del servidor
```

---

## Cómo instalar y ejecutar

### Requisitos
- Node.js versión 18 o superior
- PostgreSQL versión 14 o superior

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/GreudyInoa/proviemplea.git
cd proviemplea/backend

# 2. Instalar dependencias
npm install

# 3. Crear el archivo de configuración
cp .env.example .env
# Abre el archivo .env y completa tus datos

# 4. Crear la base de datos
createdb proviemplea_db

# 5. Crear las tablas
npx sequelize-cli db:migrate

# 6. Cargar los datos iniciales
npx sequelize-cli db:seed:all

# 7. Iniciar el servidor
npm run dev
```

---

## Configuración (.env)

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=proviemplea_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña

JWT_SECRET=una_clave_secreta_segura
JWT_EXPIRES_IN=24h

CORS_ORIGIN=http://localhost:5173
```

---

## Módulos disponibles

| Módulo | Ruta base | Descripción |
|--------|-----------|-------------|
| Autenticación | `/api/v1/auth` | Registro e inicio de sesión |
| Talentos | `/api/v1/talentos` | Perfil laboral completo del vecino |
| Perfeccionamiento | `/api/v1/perfeccionamiento` | Cursos y certificaciones |
| Vitrina | `/api/v1/vitrina` | CV ciego para empresas |
| Empresas | `/api/v1/empresas` | Perfil y usuarios de empresa |
| Solicitudes | `/api/v1/solicitudes` | Contacto empresa → talento |
| Administración | `/api/v1/admin` | Panel del Departamento de Empleo |
| Archivos | `/api/v1/archivos` | Subida de CVs y documentos |
| Catálogos | `/api/v1/catalogos` | Datos de referencia del sistema |

---

## Flujo del sistema

### Cómo fluye una petición HTTP

```mermaid
flowchart TD
    A[👤 Usuario / Frontend] -->|HTTP Request| B[Middleware]
    B -->|Verifica JWT + Roles| C{¿Autorizado?}
    C -->|No| D[❌ 401 / 403]
    C -->|Sí| E[Controller]
    E -->|Llama| F[Service]
    F -->|Consulta| G[(PostgreSQL)]
    G -->|Resultado| F
    F -->|Procesa| E
    E -->|JSON Response| A
```

### Flujo de registro de un Talento

```mermaid
flowchart LR
    A[Vecino se registra] --> B[Sistema valida correo]
    B --> C[Cifra contraseña]
    C --> D[Guarda en BD\nEstado: Pendiente]
    D --> E[Admin valida cuenta]
    E --> F[✅ Perfil Aprobado]
    F --> G[Talento completa perfil]
    G --> H[Experiencia]
    G --> I[Educación]
    G --> J[Competencias]
    G --> K[Sube CV]
    H & I & J & K --> L[🌟 Visible en Vitrina]
```

### Flujo de búsqueda de una Empresa

```mermaid
flowchart TD
    A[🏢 Empresa inicia sesión] --> B[Aplica filtros de búsqueda]
    B --> C[Carrera / Competencias / Idiomas]
    C --> D[Vitrina muestra CV Ciego]
    D --> E{¿Sin datos personales?}
    E --> F[✅ Solo competencias y experiencia]
    F --> G[Empresa solicita contacto]
    G --> H[🏛️ Admin del Depto recibe solicitud]
    H --> I[Contacta al Talento]
    I --> J[Proceso de Selección]
    J --> K[Contactado]
    K --> L[Entrevista]
    L --> M[Seleccionado ✅]
    L --> N[No seleccionado ❌]
```

### Arquitectura del sistema

```mermaid
graph LR
    subgraph Frontend
        F1[React App]
    end

    subgraph Backend
        B1[Middleware\nJWT + Roles]
        B2[Controllers]
        B3[Services]
        B4[Models\nSequelize]
    end

    subgraph BD[Base de Datos]
        D1[(PostgreSQL)]
        D2[Vistas SQL]
        D3[Stored Procedures]
    end

    F1 -->|HTTP| B1
    B1 --> B2
    B2 --> B3
    B3 --> B4
    B4 --> D1
    D1 --> D2
    D1 --> D3
    B4 -->|JSON| F1
```

---

## Roles del sistema

```mermaid
graph TD
    A[👤 Usuario] --> B{Rol}
    B -->|talento| C[Vecino/a de Providencia]
    B -->|empresa| D[Empresa o Reclutador]
    B -->|admin| E[Departamento de Empleo]

    C --> C1[Crear perfil laboral]
    C --> C2[Subir CV]
    C --> C3[Ver solicitudes recibidas]

    D --> D1[Buscar talentos]
    D --> D2[Ver CV ciego]
    D --> D3[Solicitar contacto]

    E --> E1[Validar perfiles]
    E --> E2[Gestionar empresas]
    E --> E3[Ver estadísticas]
```

---

## Documentación de la API

Con el servidor en marcha, accede a la documentación interactiva en:

```
http://localhost:3000/api/v1/docs
```

---

## Seguridad

```mermaid
graph TD
    A[Petición entrante] --> B[CORS - Solo frontend autorizado]
    B --> C[Helmet - Headers seguros]
    C --> D[Rate Limit - Máx 5 intentos login]
    D --> E[JWT - Token válido requerido]
    E --> F[Roles - Solo acceso permitido]
    F --> G[Validación de datos]
    G --> H[✅ Procesada]
```

- Las contraseñas se guardan cifradas con **bcrypt**, nunca en texto plano
- Cada usuario recibe un **token JWT** al iniciar sesión
- El sistema limita los intentos de login para evitar ataques
- Los datos personales de los talentos **nunca son visibles** para las empresas

---

## Pruebas

```bash
# Pruebas unitarias (no requieren base de datos)
npm run test:unit

# Pruebas de integración (requieren base de datos activa)
npm run test:integration

# Todas las pruebas
npm test
```

| Tipo | Módulos | Resultado |
|------|---------|-----------|
| Unitarias | 6 módulos | ✅ 47 pruebas pasando |
| Integración | 7 archivos | ✅ Todos los módulos cubiertos |

---

## Documentación

| Documento | Descripción |
|-----------|-------------|
| [Documentación Backend](docs/ProviEmplea_Documentacion_Backend.docx) | Arquitectura, endpoints, seguridad y pruebas |
| [Documentación Base de Datos](docs/Documentacion_Base_de_Datos.docx) | Modelo de datos, vistas SQL y stored procedures |
| [Script SQL](docs/script_bd_proviemplea.sql) | Script completo de creación de la base de datos |

---

## Equipo

| Nombre | Responsabilidad |
|--------|----------------|
| Greudy Inoa | Desarrollo Backend |
| Nicol Orellana | Desarrollo Frontend |
| Camila Loreto Rojo | Base de Datos |

---

## Cliente

**Departamento de Empleo — Municipalidad de Providencia**  
Representantes: Solange Montaldo y Cecilia Ahumada