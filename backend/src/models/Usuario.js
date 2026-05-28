const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Modelo que representa la tabla usuarios en la BD
const Usuario = sequelize.define('usuarios', {
  id_usuario: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  estado_validacion: {
    type: DataTypes.STRING(50),
    defaultValue: 'Pendiente'
  },
  fecha_eliminacion: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'usuarios',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion'
});

module.exports = Usuario;