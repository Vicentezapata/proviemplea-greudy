const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Modelo que representa la tabla empresas en la BD
const Empresa = sequelize.define('empresas', {
  id_empresa: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  rut_empresa: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  nombre_empresa: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  id_rubro: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_tipo_empresa: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  presentacion: {
    type: DataTypes.TEXT
  },
  beneficios: {
    type: DataTypes.TEXT
  },
  logo_url: {
    type: DataTypes.STRING(255)
  },
  fecha_eliminacion: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'empresas',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion'
});

module.exports = Empresa;