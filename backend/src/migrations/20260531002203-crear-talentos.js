'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('talentos', {
      id_talento: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      id_usuario: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
        references: { model: 'usuarios', key: 'id_usuario' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nombres: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      apellidos: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      comuna_residencia: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      resumen: {
        type: Sequelize.TEXT
      },
      id_rango_renta: {
        type: Sequelize.INTEGER,
        references: { model: 'rangos_renta', key: 'id_rango' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      jornada_deseada: {
        type: Sequelize.STRING(50)
      },
      modalidad_deseada: {
        type: Sequelize.STRING(50)
      },
      discapacidad_ley21015: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      contratado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('talentos');
  }
};