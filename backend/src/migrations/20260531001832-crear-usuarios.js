'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('usuarios', {
      id_usuario: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      id_rol: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'id_rol' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      correo: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      estado_validacion: {
        type: Sequelize.STRING(50),
        defaultValue: 'Pendiente'
      },
      fecha_creacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      fecha_actualizacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      fecha_eliminacion: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('usuarios');
  }
};