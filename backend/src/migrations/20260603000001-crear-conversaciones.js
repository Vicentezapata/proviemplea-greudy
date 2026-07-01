'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('conversaciones', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      tipo: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      asunto: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      id_usuario_origen: {
        type: Sequelize.UUID,
        references: {
          model: 'usuarios',
          key: 'id_usuario'
        }
      },
      id_usuario_destino: {
        type: Sequelize.UUID,
        references: {
          model: 'usuarios',
          key: 'id_usuario'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('mensajes', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      id_conversacion: {
        type: Sequelize.UUID,
        references: {
          model: 'conversaciones',
          key: 'id'
        }
      },
      id_emisor: {
        type: Sequelize.UUID,
        references: {
          model: 'usuarios',
          key: 'id_usuario'
        }
      },
      texto: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      leido: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mensajes');
    await queryInterface.dropTable('conversaciones');
  }
};