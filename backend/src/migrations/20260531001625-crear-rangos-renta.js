'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rangos_renta', {
      id_rango: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descripcion: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('rangos_renta');
  }
};