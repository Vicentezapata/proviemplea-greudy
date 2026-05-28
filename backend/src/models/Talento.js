const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Modelo que representa la tabla talentos en la BD
const Talento = sequelize.define('talentos', {
  id_talento: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  id_usuario: {
    type: DataTypes.UUID,
    allowNull: false
  },
  nombres: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  comuna_residencia: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  resumen: {
    type: DataTypes.TEXT
  },
  id_rango_renta: {
    type: DataTypes.INTEGER
  },
  jornada_deseada: {
    type: DataTypes.STRING(50)
  },
  modalidad_deseada: {
    type: DataTypes.STRING(50)
  },
  discapacidad_ley21015: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  contratado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  fecha_eliminacion: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'talentos',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion'
});

module.exports = Talento;