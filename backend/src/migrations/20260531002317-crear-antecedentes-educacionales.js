'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('antecedentes_educacionales', {
      id_educacion: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      id_talento: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'talentos', key: 'id_talento' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nivel_educacional: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      carrera: {
        type: Sequelize.STRING(150)
      },
      institucion: {
        type: Sequelize.STRING(150)
      },
      fecha_eliminacion: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('antecedentes_educacionales');
  }
};