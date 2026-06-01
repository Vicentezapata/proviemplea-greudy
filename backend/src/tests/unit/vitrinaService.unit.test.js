jest.mock('../../config/connection');
const sequelize = require('../../config/connection');
const VitrinaService = require('../../services/VitrinaService');

describe('VitrinaService - vitrinaGET', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe retornar lista paginada de talentos', async () => {
    sequelize.query
      .mockResolvedValueOnce([[
        { id_talento: 'uuid-1', resumen: 'Profesional A' },
        { id_talento: 'uuid-2', resumen: 'Profesional B' }
      ]])
      .mockResolvedValueOnce([[{ total: '2' }]]);

    const resultado = await VitrinaService.vitrinaGET({ page: 1, limit: 10 });

    expect(resultado.success).toBe(true);
    expect(resultado.data.length).toBe(2);
    expect(resultado.meta.total).toBe(2);
    expect(resultado.meta.totalPages).toBe(1);
  });

  it('debe filtrar por discapacidad_ley21015', async () => {
    sequelize.query
      .mockResolvedValueOnce([[{ id_talento: 'uuid-1', discapacidad_ley21015: true }]])
      .mockResolvedValueOnce([[{ total: '1' }]]);

    const resultado = await VitrinaService.vitrinaGET({
      discapacidad_ley21015: 'true',
      page: 1,
      limit: 10
    });

    expect(resultado.success).toBe(true);
    expect(resultado.data.length).toBe(1);
  });

  it('debe filtrar por competencias', async () => {
    sequelize.query
      .mockResolvedValueOnce([[{ id_talento: 'uuid-1' }]])
      .mockResolvedValueOnce([[{ total: '1' }]]);

    const resultado = await VitrinaService.vitrinaGET({
      competencias: '1,3,5',
      page: 1,
      limit: 10
    });

    expect(resultado.success).toBe(true);
    expect(resultado.data.length).toBe(1);
  });

  it('debe retornar lista vacía si no hay talentos', async () => {
    sequelize.query
      .mockResolvedValueOnce([[]])
      .mockResolvedValueOnce([[{ total: '0' }]]);

    const resultado = await VitrinaService.vitrinaGET({ page: 1, limit: 10 });

    expect(resultado.success).toBe(true);
    expect(resultado.data.length).toBe(0);
    expect(resultado.meta.total).toBe(0);
  });

  it('debe calcular correctamente el total de páginas', async () => {
    sequelize.query
      .mockResolvedValueOnce([[
        { id_talento: 'uuid-1' },
        { id_talento: 'uuid-2' },
        { id_talento: 'uuid-3' }
      ]])
      .mockResolvedValueOnce([[{ total: '25' }]]);

    const resultado = await VitrinaService.vitrinaGET({ page: 1, limit: 3 });

    expect(resultado.meta.totalPages).toBe(9);
    expect(resultado.meta.limit).toBe(3);
  });
});

describe('VitrinaService - vitrinaIdTalentoGET', () => {

  it('debe retornar error si el talento no existe', async () => {
    sequelize.query.mockResolvedValue([[]]);

    const resultado = await VitrinaService.vitrinaIdTalentoGET('uuid-inexistente');

    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('Talento no encontrado');
  });

  it('debe retornar el CV ciego del talento', async () => {
    sequelize.query.mockResolvedValue([[{
      id_talento: 'uuid-123',
      resumen: 'Profesional con experiencia',
      competencias: ['Python', 'SQL'],
      idiomas: [{ idioma: 'Inglés', nivel: 'B2' }]
    }]]);

    const resultado = await VitrinaService.vitrinaIdTalentoGET('uuid-123');

    expect(resultado.success).toBe(true);
    expect(resultado.data.id_talento).toBe('uuid-123');
    expect(resultado.data).not.toHaveProperty('nombres');
    expect(resultado.data).not.toHaveProperty('apellidos');
  });
});