'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios_empresa', {
      id_usuario: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: { model: 'usuarios', key: 'id_usuario' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_empresa: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'empresas', key: 'id_empresa' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nombre_completo: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      telefono_contacto: {
        type: Sequelize.STRING(20)
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('usuarios_empresa');
  }
};