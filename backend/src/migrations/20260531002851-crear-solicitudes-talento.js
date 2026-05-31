'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('solicitudes_talento', {
      id_solicitud: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true
      },
      id_empresa: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'empresas', key: 'id_empresa' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_talento: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'talentos', key: 'id_talento' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_estado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'estados_seguimiento', key: 'id_estado' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      notas_internas: {
        type: Sequelize.TEXT
      },
      fecha_solicitud: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      fecha_actualizacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('solicitudes_talento');
  }
};