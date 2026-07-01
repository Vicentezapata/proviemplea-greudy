'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('perfeccionamiento', {
      id_perfeccionamiento: {
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
      nombre_curso: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      institucion: {
        type: Sequelize.STRING(150)
      },
      anio_certificacion: {
        type: Sequelize.INTEGER
      },
      fecha_eliminacion: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('perfeccionamiento');
  }
};