# Resumen de Despliegue y Credenciales Demo

Este documento contiene la información de acceso al entorno de demostración de la plataforma **ProviEmplea**, desplegado en servicios gratuitos en la nube.

## 1. Enlaces del Entorno Demo

* **Frontend (Aplicación Web):** [https://proviemplea-greudy-git-main-ipssvzc.vercel.app](https://proviemplea-greudy-git-main-ipssvzc.vercel.app/)] *(Alojado en Vercel)*
* **Backend (API Rest):** [https://proviemplea-greudy.onrender.com/health](https://proviemplea-greudy.onrender.com/health) *(Alojado en Render)*
* **Base de Datos:** MySQL *(Alojada en Clever Cloud)*

> **Nota:** Debido a que el backend está alojado en el plan gratuito de Render, el servidor entra en "suspensión" (sleep) tras 15 minutos de inactividad. La primera petición (como hacer login) después de este tiempo puede tardar hasta **50 segundos** en responder mientras el servidor se reactiva. ¡Ten paciencia!

## 2. Credenciales de Demostración

La base de datos contiene perfiles precargados para explorar las tres funcionalidades principales de la plataforma. Puedes usarlas en la página de **Login**.

### 💼 Perfil: Empresa
Esta cuenta representa a una empresa ("ProviEmplea Demo SpA") buscando candidatos.
* **Correo:** `empresa@proviemplea.cl`
* **Contraseña:** `password`
* **¿Qué puedes probar?** 
  * Crear y publicar nuevas ofertas laborales.
  * Revisar los candidatos (talentos) que han postulado a tus ofertas.
  * Buscar en la vitrina de talentos de la comuna.

### 👤 Perfil: Talento (Vecino)
Esta cuenta representa a un vecino de Providencia ("Juan Pérez Demo") buscando empleo.
* **Correo:** `talento@proviemplea.cl`
* **Contraseña:** `password`
* **¿Qué puedes probar?**
  * Completar los datos del perfil (experiencia, educación).
  * Subir un currículum o documentos.
  * Buscar ofertas de empleo y postular a ellas.

### 🏢 Perfil: Administrador (OMIL)
Esta cuenta representa a un funcionario municipal administrando la plataforma.
* **Correo:** `admin@proviemplea.cl`
* **Contraseña:** `password`
* **¿Qué puedes probar?**
  * Acceder al panel de control (Dashboard estadístico).
  * Aprobar y auditar usuarios, talentos y empresas.
  * Ver el flujo de métricas y empleabilidad.

## 3. Consideraciones Técnicas del Demo

* Las contraseñas están fuertemente encriptadas usando `bcrypt`.
* El entorno demo se alimenta de una única base de datos remota. Si deseas resetear los datos o vaciarla, deberás conectarte a tu motor MySQL en Clever Cloud y truncar las tablas, para luego volver a ejecutar los comandos de migración (`db:migrate`) y seeder (`db:seed:all`).
