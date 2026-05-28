// Carga las variables de entorno desde el .env
require('dotenv').config();

// Importa la aplicacion Express
const app = require('./src/app');

// Define el puerto desde el /env o usa el 3000 por defecto
const PORT = process.env.PORT || 3000;

// Arranca el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});