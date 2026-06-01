const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const sequelize = require('./config/connection');

const authRoutes = require('./routes/auth');
const catalogosRoutes = require('./routes/catalogos');
const talentosRoutes = require('./routes/talentos');
const empresasRoutes = require('./routes/empresas');
const vitrinaRoutes = require('./routes/vitrina');
const solicitudesRoutes = require('./routes/solicitudes');
const adminRoutes = require('./routes/admin');
const archivosRoutes = require('./routes/archivos');
const perfeccionamientoRoutes = require('./routes/perfeccionamiento');

const { limiteGeneral, limiteLogin } = require('./config/rateLimit');
const errorHandler = require('./middleware/error');

// Crear carpeta uploads automáticamente si no existe
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const swaggerDocument = YAML.load('./src/docs/swagger.yaml');

const app = express();

app.use(helmet());

// CORS restrictivo — solo el frontend autorizado
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting — limiteLogin ANTES que limiteGeneral
app.use('/api/v1/auth/login', limiteLogin);
app.use('/api/v1', limiteGeneral);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/catalogos', catalogosRoutes);
app.use('/api/v1/talentos', talentosRoutes);
app.use('/api/v1/empresas', empresasRoutes);
app.use('/api/v1/vitrina', vitrinaRoutes);
app.use('/api/v1/solicitudes', solicitudesRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/archivos', archivosRoutes);
app.use('/api/v1/perfeccionamiento', perfeccionamientoRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', project: 'ProviEmplea API', version: '1.0.0' });
});

// Error handler siempre al final
app.use(errorHandler);

sequelize.authenticate()
  // eslint-disable-next-line no-console
  .then(() => console.log('✅ Base de datos conectada'))
  // eslint-disable-next-line no-console
  .catch(err => console.error('❌ Error conectando BD:', err));

module.exports = app;