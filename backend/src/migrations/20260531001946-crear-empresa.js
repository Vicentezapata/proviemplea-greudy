'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('empresas', {
      id_empresa: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      rut_empresa: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false
      },
      nombre_empresa: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      id_rubro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'rubros_empresa', key: 'id_rubro' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      id_tipo_empresa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'tipos_empresa', key: 'id_tipo' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      presentacion: {
        type: Sequelize.TEXT
      },
      beneficios: {
        type: Sequelize.TEXT
      },
      logo_url: {
        type: Sequelize.STRING(255)
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
    await queryInterface.dropTable('empresas');
  }
};