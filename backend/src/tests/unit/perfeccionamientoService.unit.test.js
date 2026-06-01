jest.mock('../../config/connection');
const sequelize = require('../../config/connection');
const PerfeccionamientoService = require('../../services/PerfeccionamientoService');

describe('PerfeccionamientoService - perfeccionamientoGET', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe retornar error si el talento no existe', async () => {
    sequelize.query.mockResolvedValue([[]]);

    const resultado = await PerfeccionamientoService.perfeccionamientoGET('uuid-inexistente');

    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('Talento no encontrado');
  });

  it('debe retornar lista de cursos del talento', async () => {
    sequelize.query
      .mockResolvedValueOnce([[{ id_talento: 'uuid-123' }]])
      .mockResolvedValueOnce([[
        { id_perfeccionamiento: 'uuid-curso-1', nombre_curso: 'Python Avanzado', anio_certificacion: 2023 },
        { id_perfeccionamiento: 'uuid-curso-2', nombre_curso: 'SQL para Análisis', anio_certificacion: 2022 }
      ]]);

    const resultado = await PerfeccionamientoService.perfeccionamientoGET('uuid-usuario');

    expect(resultado.success).toBe(true);
    expect(resultado.data.length).toBe(2);
    expect(resultado.data[0].nombre_curso).toBe('Python Avanzado');
  });

  it('debe retornar lista vacía si no tiene cursos', async () => {
    sequelize.query
      .mockResolvedValueOnce([[{ id_talento: 'uuid-123' }]])
      .mockResolvedValueOnce([[]])

    const resultado = await PerfeccionamientoService.perfeccionamientoGET('uuid-usuario');

    expect(resultado.success).toBe(true);
    expect(resultado.data.length).toBe(0);
  });
});

describe('PerfeccionamientoService - perfeccionamientoPOST', () => {

  it('debe retornar error si el talento no existe', async () => {
    sequelize.query.mockResolvedValue([[]]);

    const resultado = await PerfeccionamientoService.perfeccionamientoPOST('uuid-inexistente', {
      nombre_curso: 'Diplomado Marketing',
      institucion: 'UDP',
      anio_certificacion: 2023
    });

    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('Talento no encontrado');
  });

  it('debe agregar curso exitosamente', async () => {
    sequelize.query
      .mockResolvedValueOnce([[{ id_talento: 'uuid-123' }]])
      .mockResolvedValueOnce([[]]);

    const resultado = await PerfeccionamientoService.perfeccionamientoPOST('uuid-usuario', {
      nombre_curso: 'Diplomado Marketing',
      institucion: 'UDP',
      anio_certificacion: 2023
    });

    expect(resultado.success).toBe(true);
    expect(resultado.message).toBe('Curso agregado exitosamente');
  });
});

describe('PerfeccionamientoService - perfeccionamientoIdPUT', () => {

  it('debe retornar error si el registro no pertenece al talento', async () => {
    sequelize.query
      .mockResolvedValueOnce([[{ id_talento: 'uuid-123' }]])
      .mockResolvedValueOnce([[]]);

    const resultado = await PerfeccionamientoService.perfeccionamientoIdPUT(
      'uuid-usuario',
      'uuid-curso-otro',
      { nombre_curso: 'Nuevo nombre' }
    );

    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('Registro no encontrado o no autorizado');
  });

  it('debe actualizar el curso si pertenece al talento', async () => {
    sequelize.query
      .mockResolvedValueOnce([[{ id_talento: 'uuid-123' }]])
      .mockResolvedValueOnce([[{ id_perfeccionamiento: 'uuid-curso' }]])
      .mockResolvedValueOnce([[]]);

    const resultado = await PerfeccionamientoService.perfeccionamientoIdPUT(
      'uuid-usuario',
      'uuid-curso',
      { nombre_curso: 'Python Avanzado', institucion: 'Udemy', anio_certificacion: 2024 }
    );

    expect(resultado.success).toBe(true);
    expect(resultado.message).toBe('Curso actualizado exitosamente');
  });
});

describe('PerfeccionamientoService - perfeccionamientoIdDELETE', () => {

  it('debe retornar error si el registro no pertenece al talento', async () => {
    sequelize.query
      .mockResolvedValueOnce([[{ id_talento: 'uuid-123' }]])
      .mockResolvedValueOnce([[]]);

    const resultado = await PerfeccionamientoService.perfeccionamientoIdDELETE(
      'uuid-usuario',
      'uuid-curso-otro'
    );

    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('Registro no encontrado o no autorizado');
  });

  it('debe eliminar el curso exitosamente', async () => {
    sequelize.query
      .mockResolvedValueOnce([[{ id_talento: 'uuid-123' }]])
      .mockResolvedValueOnce([[{ id_perfeccionamiento: 'uuid-curso' }]])
      .mockResolvedValueOnce([[]]);

    const resultado = await PerfeccionamientoService.perfeccionamientoIdDELETE(
      'uuid-usuario',
      'uuid-curso'
    );

    expect(resultado.success).toBe(true);
    expect(resultado.message).toBe('Curso eliminado exitosamente');
  });
});