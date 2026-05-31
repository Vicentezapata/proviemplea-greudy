'use strict';

module.exports = {
  up: async (queryInterface) => {
    // Roles
    await queryInterface.bulkInsert('roles', [
      { nombre: 'admin' },
      { nombre: 'talento' },
      { nombre: 'empresa' }
    ]);

    // Rubros de empresa
    await queryInterface.bulkInsert('rubros_empresa', [
      { nombre: 'Tecnología' },
      { nombre: 'Salud' },
      { nombre: 'Educación' },
      { nombre: 'Comercio' },
      { nombre: 'Construcción' },
      { nombre: 'Gastronomía' },
      { nombre: 'Finanzas' },
      { nombre: 'Legal' },
      { nombre: 'Marketing' },
      { nombre: 'Logística' }
    ]);

    // Tipos de empresa
    await queryInterface.bulkInsert('tipos_empresa', [
      { nombre: 'Contratación directa' },
      { nombre: 'EST' },
      { nombre: 'Outsourcing' }
    ]);

    // Competencias técnicas
    await queryInterface.bulkInsert('competencias_tecnicas', [
      { nombre: 'Microsoft Office' },
      { nombre: 'Excel Avanzado' },
      { nombre: 'Python' },
      { nombre: 'JavaScript' },
      { nombre: 'SQL' },
      { nombre: 'Photoshop' },
      { nombre: 'Contabilidad' },
      { nombre: 'Atención al cliente' },
      { nombre: 'Gestión de proyectos' },
      { nombre: 'Redes sociales' }
    ]);

    // Idiomas
    await queryInterface.bulkInsert('idiomas', [
      { nombre: 'Español' },
      { nombre: 'Inglés' },
      { nombre: 'Portugués' },
      { nombre: 'Francés' },
      { nombre: 'Alemán' },
      { nombre: 'Italiano' }
    ]);

    // Rangos de renta
    await queryInterface.bulkInsert('rangos_renta', [
      { descripcion: 'Menos de $500.000' },
      { descripcion: '$500.000 - $800.000' },
      { descripcion: '$800.000 - $1.200.000' },
      { descripcion: '$1.200.000 - $1.800.000' },
      { descripcion: '$1.800.000 - $2.500.000' },
      { descripcion: 'Más de $2.500.000' }
    ]);

    // Estados de seguimiento
    await queryInterface.bulkInsert('estados_seguimiento', [
      { nombre: 'Solicitado' },
      { nombre: 'Contactado' },
      { nombre: 'Entrevista' },
      { nombre: 'Seleccionado' },
      { nombre: 'No seleccionado' },
      { nombre: 'Cerrado' }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('estados_seguimiento', null, {});
    await queryInterface.bulkDelete('rangos_renta', null, {});
    await queryInterface.bulkDelete('idiomas', null, {});
    await queryInterface.bulkDelete('competencias_tecnicas', null, {});
    await queryInterface.bulkDelete('tipos_empresa', null, {});
    await queryInterface.bulkDelete('rubros_empresa', null, {});
    await queryInterface.bulkDelete('roles', null, {});
  }
};