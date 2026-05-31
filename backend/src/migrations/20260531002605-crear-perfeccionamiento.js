'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('antecedentes_laborales', {
      id_laboral: {
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
      empresa: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      cargo: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      fecha_inicio: {
        type: Sequelize.DATEONLY
      },
      fecha_fin: {
        type: Sequelize.DATEONLY
      },
      fecha_eliminacion: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('antecedentes_laborales');
  }
};