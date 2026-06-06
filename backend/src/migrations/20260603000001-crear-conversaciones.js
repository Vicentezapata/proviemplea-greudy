'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE conversaciones (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        tipo VARCHAR(50) NOT NULL,
        asunto VARCHAR(255) NOT NULL,
        id_usuario_origen UUID REFERENCES usuarios(id_usuario),
        id_usuario_destino UUID REFERENCES usuarios(id_usuario),
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE mensajes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        id_conversacion UUID REFERENCES conversaciones(id),
        id_emisor UUID REFERENCES usuarios(id_usuario),
        texto TEXT NOT NULL,
        leido BOOLEAN DEFAULT FALSE,
        "createdAt" TIMESTAMP DEFAULT NOW()
      );
    `);
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS mensajes;
      DROP TABLE IF EXISTS conversaciones;
    `);
  }
};