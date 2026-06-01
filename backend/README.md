# ProviEmplea — Backend

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-5-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue)
![Jest](https://img.shields.io/badge/Tests-47%20passing-brightgreen)
![License](https://img.shields.io/badge/License-ISC-yellow)

> 🚧 **Estado:** En desarrollo activo — Mayo 2026

Backend de la plataforma digital **ProviEmplea**, desarrollada para el Departamento de Empleo de la Municipalidad de Providencia. La plataforma conecta a vecinos que buscan trabajo con empresas que buscan talento local, de forma anónima y sin discriminación.

---

## ¿Qué hace este proyecto?

ProviEmplea funciona al revés de una bolsa de empleo tradicional: **las empresas buscan a los candidatos**, no al revés. Los vecinos de Providencia crean un perfil con su experiencia, habilidades e idiomas. Las empresas pueden buscar y filtrar candidatos sin ver su nombre, edad, género ni comuna — solo sus competencias.

Este repositorio contiene el **backend** (servidor y API) que alimenta la plataforma.

---

## Tecnologías utilizadas

- **Node.js + Express** — servidor web
- **PostgreSQL** — base de datos
- **Sequelize** — conexión y manejo de la base de datos
- **JWT** — sistema de autenticación segura
- **Swagger** — documentación de la API
- **Jest + Supertest** — pruebas automáticas

---

## Estructura del proyecto

```
backend/
├── docs/                    # Documentación del proyecto (Word, SQL)
├── src/
│   ├── config/              # Configuración de base de datos y archivos
│   ├── controllers/         # Reciben las peticiones y devuelven respuestas
│   ├── docs/                # Documentación Swagger (swagger.yaml)
│   ├── middleware/          # Seguridad, roles y manejo de errores
│   ├── migrations/          # Creación de tablas en la base de datos
│   ├── models/              # Representación de las tablas de la BD
│   ├── routes/              # Rutas disponibles de la API
│   ├── seeders/             # Datos iniciales del sistema
│   ├── services/            # Lógica principal del negocio
│   ├── tests/               # Pruebas unitarias y de integración
│   ├── uploads/             # Archivos subidos por los talentos
│   ├── utils/               # Funciones de apoyo
│   ├── validators/          # Validación de datos recibidos
│   └── app.js               # Configuración Express
├── .env                     # Variables de entorno (no commiteado)
├── .env.example             # Plantilla de configuración
├── .gitignore
├── .sequelizerc             # Configuración de Sequelize CLI
├── eslint.config.js         # Configuración de ESLint
├── package.json
├── package-lock.json
├── SECURITY.md              # Política de seguridad
└── server.js                # Punto de inicio del servidor
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

### Autenticación
Registro e inicio de sesión para talentos y empresas, con verificación de identidad.

### Talentos
Los vecinos pueden crear y actualizar su perfil laboral: experiencia, educación, cursos, competencias e idiomas.

### Empresas
Las empresas pueden administrar su perfil, agregar reclutadores y revisar el historial de candidatos contactados.

### Vitrina de Talentos
Las empresas pueden buscar candidatos usando filtros como carrera, competencias técnicas e idiomas. Los perfiles no muestran datos personales (CV ciego).

### Solicitudes
Las empresas solicitan contacto con un candidato. El Departamento de Empleo actúa como intermediario y gestiona el proceso.

### Administración
Los funcionarios del Departamento de Empleo validan perfiles, gestionan empresas y revisan estadísticas de la plataforma.

### Archivos
Los talentos pueden subir su CV y comprobante de residencia en formato PDF, Word o imagen.

### Catálogos
Listas precargadas de competencias técnicas, idiomas, rubros y rangos de renta.

---

## Documentación de la API

Con el servidor en marcha, puedes ver todos los endpoints disponibles en:

```
http://localhost:3000/api/v1/docs
```

---

## Roles del sistema

| Rol | Quién es |
|-----|----------|
| `talento` | Vecino/a de Providencia que busca empleo |
| `empresa` | Empresa o reclutador que busca candidatos |
| `admin` | Funcionario del Departamento de Empleo |

---

## Seguridad

- Las contraseñas se guardan cifradas, nunca en texto plano
- Cada usuario recibe un token de acceso al iniciar sesión
- El sistema limita los intentos de login para evitar ataques
- Los datos personales de los talentos nunca son visibles para las empresas

---

## Pruebas

El proyecto incluye pruebas automáticas para verificar que todo funcione correctamente.

```bash
# Pruebas unitarias (no requieren base de datos)
npm run test:unit

# Pruebas de integración (requieren base de datos activa)
npm run test:integration
```

Resultados actuales: **47 pruebas unitarias pasando** en 6 módulos.

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