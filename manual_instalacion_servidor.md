# Manual de Instalación y Configuración (Servidor)

Este documento detalla los pasos necesarios para instalar y configurar la plataforma **ProviEmplea** en un entorno de servidor (VPS, máquina local o servicios cloud como Render/Vercel).

## 1. Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes en tu servidor:
* **Node.js** (v18.0.0 o superior)
* **npm** (gestor de paquetes de Node)
* **MySQL** (v8.0 o superior)
* **Git**

## 2. Clonar el Repositorio

Abre una terminal y clona el repositorio del proyecto:
```bash
git clone https://github.com/tu-usuario/proviemplea-greudy.git
cd proviemplea-greudy
```

## 3. Configuración de la Base de Datos

ProviEmplea utiliza MySQL como base de datos.
1. Accede a tu motor de MySQL y crea una base de datos vacía:
```sql
CREATE DATABASE proviemplea_db;
```

## 4. Configuración del Backend

El backend está construido en **Node.js** con **Express** y **Sequelize**.

1. Navega al directorio del backend e instala las dependencias:
```bash
cd backend
npm install
```

2. Crea el archivo de variables de entorno copiando el archivo de ejemplo:
```bash
cp .env.example .env
```
*(Si no existe `.env.example`, crea un archivo `.env` manualmente en la carpeta `/backend`).*

3. Edita el archivo `.env` con los datos de tu conexión MySQL y una clave secreta para JWT:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=proviemplea_db
DB_PORT=3306
JWT_SECRET=tu_clave_secreta_super_segura
```

4. **Ejecutar las Migraciones:** Esto creará automáticamente todas las tablas necesarias en la base de datos.
```bash
npx sequelize-cli db:migrate
```

5. **Ejecutar los Seeders:** Esto poblará la base de datos con los catálogos base (Roles, Rubros, Tipos de empresa, etc.).
```bash
npx sequelize-cli db:seed:all
```

6. **Iniciar el Servidor Backend:**
```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```
El servidor backend debería estar ejecutándose en `http://localhost:3000`.

## 5. Configuración del Frontend

El frontend está construido con **React** y **Vite**.

1. Abre una nueva terminal y navega al directorio del frontend:
```bash
cd frontend
npm install
```

2. Crea el archivo `.env` en la raíz de la carpeta frontend:
```env
VITE_API_URL=http://localhost:3000/api/v1
```
*(Cambia la URL si tu backend está alojado en otro dominio).*

3. **Ejecutar el Frontend:**
```bash
# Modo desarrollo (para probar localmente)
npm run dev

# Compilar para producción
npm run build
```

## 6. Despliegue en la Nube (Vercel y Render)

Si deseas desplegar la aplicación en servicios gratuitos como Vercel y Render, los pasos son similares:

1. **Base de Datos:** Crea una instancia de MySQL en servicios como Clever Cloud o Aiven.
2. **Backend (Render):** Conecta tu repositorio de GitHub a Render. Configura el **Root Directory** en `backend`, el Build Command como `npm install`, y el Start Command como `npm start`. Asegúrate de cargar todas las variables de entorno (`DB_HOST`, `DB_USER`, etc.) en el panel de Render.
3. **Frontend (Vercel):** Conecta el repositorio a Vercel. Configura el **Root Directory** en `frontend`. Vercel detectará que es un proyecto Vite y configurará los comandos automáticamente. Añade la variable `VITE_API_URL` apuntando a la URL entregada por Render.

## 7. Mantenimiento y Logs

* Si usas Render, revisa la pestaña de *Logs* para ver cualquier error del backend en tiempo real.
* Si agregas nuevas tablas en el futuro, recuerda correr `npx sequelize-cli db:migrate` en el entorno de producción.
