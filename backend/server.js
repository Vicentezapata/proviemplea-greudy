require('dotenv').config();

// Validación de variables críticas antes de arrancar
const variablesRequeridas = ['JWT_SECRET', 'DB_NAME', 'DB_USER', 'DB_PASS', 'DB_HOST', 'DB_PORT'];
const faltantes = variablesRequeridas.filter(v => !process.env[v]);

if (faltantes.length > 0) {
  console.error(`❌ Variables de entorno faltantes: ${faltantes.join(', ')}`);
  console.error('Crea un archivo .env basándote en .env.example');
  process.exit(1);
}

const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`📚 Documentación Swagger: http://localhost:${PORT}/api-docs`);
});