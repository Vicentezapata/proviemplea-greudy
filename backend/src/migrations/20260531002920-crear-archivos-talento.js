'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('archivos_talento', {
      id_archivo: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true
      },
      id_talento: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'talentos', key: 'id_talento' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tipo_documento: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      formato: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      ruta_archivo: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      fecha_subida: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      fecha_eliminacion: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE archivos_talento
      ADD CONSTRAINT chk_tipo_documento
      CHECK (tipo_documento IN ('cv', 'comprobante_residencia', 'certificado'))
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('archivos_talento');
  }
};