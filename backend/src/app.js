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
const empresasRoutes = require('./routes/empresas');
const vitrinaRoutes = require('./routes/vitrina');
const solicitudesRoutes = require('./routes/solicitudes');
const adminRoutes = require('./routes/admin');

// Importo rate limiting
const { limiteGeneral, limiteLogin } = require('./config/rateLimit');

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

// Rate limiting — protección contra ataques
app.use('/api/v1', limiteGeneral);
app.use('/api/v1/auth/login', limiteLogin);

// Ruta de documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Registro las rutas con el prefijo /api/v1
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/catalogos', catalogosRoutes);
app.use('/api/v1/talentos', talentosRoutes);
app.use('/api/v1/empresas', empresasRoutes);
app.use('/api/v1/vitrina', vitrinaRoutes);
app.use('/api/v1/solicitudes', solicitudesRoutes);
app.use('/api/v1/admin', adminRoutes);

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