'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('talento_idioma', {
      id_talento: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'talentos', key: 'id_talento' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_idioma: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'idiomas', key: 'id_idioma' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nivel_dominio: {
        type: Sequelize.STRING(50)
      }
    });

    await queryInterface.addConstraint('talento_idioma', {
      fields: ['id_talento', 'id_idioma'],
      type: 'primary key',
      name: 'pk_talento_idioma'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('talento_idioma');
  }
};