// Importo Express y middlewares
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Importo la conexión a la base de datos
const sequelize = require('./config/connection');

// Importo las rutas
const authRoutes = require('./routes/auth');
const catalogosRoutes = require('./routes/catalogos');
const talentosRoutes = require('./routes/talentos');

// Cargo el archivo swagger.yaml
const swaggerDocument = YAML.load('./src/docs/swagger.yaml');

// Creo la aplicación Express
const app = express();

// Registro middlewares de seguridad y logs
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Registro las rutas con el prefijo /api/v1
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/catalogos', catalogosRoutes);
app.use('/api/v1/talentos', talentosRoutes);

// Verifico conexión a la base de datos
sequelize.authenticate()
  .then(() => console.log('✅ Base de datos conectada'))
  .catch(err => console.error('❌ Error conectando BD:', err));

// Ruta de prueba para verificar que el servidor está activo
app.get('/health', (req, res) => {
  res.json({ status: 'OK', project: 'ProviEmplea API' });
});

// Exporto app para usarlo en server.js
module.exports = app;