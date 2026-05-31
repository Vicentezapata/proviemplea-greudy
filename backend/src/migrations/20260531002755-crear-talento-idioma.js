'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('talento_competencia', {
      id_talento: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'talentos', key: 'id_talento' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_competencia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'competencias_tecnicas', key: 'id_competencia' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // Llave primaria compuesta
    await queryInterface.addConstraint('talento_competencia', {
      fields: ['id_talento', 'id_competencia'],
      type: 'primary key',
      name: 'pk_talento_competencia'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('talento_competencia');
  }
};