jest.mock('../../config/connection');
const sequelize = require('../../config/connection');
const SolicitudService = require('../../services/SolicitudService');

describe('SolicitudService - solicitudesPOST', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe retornar error si la empresa no existe', async () => {
    sequelize.query.mockResolvedValueOnce([[]]);

    const resultado = await SolicitudService.solicitudesPOST('uuid-usuario', {
      id_talento: 'uuid-talento'
    });

    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('Empresa no encontrada');
  });

  it('debe retornar error si el talento no está disponible', async () => {
    sequelize.query
      .mockResolvedValueOnce([[{ id_empresa: 'uuid-empresa' }]]) // empresa encontrada
      .mockResolvedValueOnce([[]]);                               // talento no disponible

    const resultado = await SolicitudService.solicitudesPOST('uuid-usuario', {
      id_talento: 'uuid-talento'
    });

    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('Talento no disponible o ya contratado');
  });

  it('debe retornar error si ya existe una solicitud', async () => {
    sequelize.query
      .mockResolvedValueOnce([[{ id_empresa: 'uuid-empresa' }]])  // empresa
      .mockResolvedValueOnce([[{ id_talento: 'uuid-talento' }]])  // talento disponible
      .mockResolvedValueOnce([[{ id_solicitud: 'uuid-sol' }]]);   // solicitud existente

    const resultado = await SolicitudService.solicitudesPOST('uuid-usuario', {
      id_talento: 'uuid-talento'
    });

    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('Ya existe una solicitud activa para este talento');
  });

  it('debe crear la solicitud exitosamente', async () => {
    sequelize.query
      .mockResolvedValueOnce([[{ id_empresa: 'uuid-empresa' }]])   // empresa
      .mockResolvedValueOnce([[{ id_talento: 'uuid-talento' }]])   // talento disponible
      .mockResolvedValueOnce([[]])                                  // sin duplicado
      .mockResolvedValueOnce([[{ id_solicitud: 'uuid-nueva' }]]); // INSERT

    const resultado = await SolicitudService.solicitudesPOST('uuid-usuario', {
      id_talento: 'uuid-talento'
    });

    expect(resultado.success).toBe(true);
    expect(resultado.data.id_solicitud).toBe('uuid-nueva');
    expect(resultado.data.estado).toBe('Solicitado');
  });
});

describe('SolicitudService - solicitudesIdSolicitudGET', () => {

  it('debe retornar error si la solicitud no existe', async () => {
    sequelize.query.mockResolvedValue([[]]);

    const resultado = await SolicitudService.solicitudesIdSolicitudGET('uuid-inexistente');

    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('Solicitud no encontrada');
  });

  it('debe retornar la solicitud si existe', async () => {
    sequelize.query.mockResolvedValue([[{
      id_solicitud: 'uuid-123',
      id_empresa: 'uuid-empresa',
      id_talento: 'uuid-talento',
      estado: 'Solicitado'
    }]]);

    const resultado = await SolicitudService.solicitudesIdSolicitudGET('uuid-123');

    expect(resultado.success).toBe(true);
    expect(resultado.data.id_solicitud).toBe('uuid-123');
    expect(resultado.data.estado).toBe('Solicitado');
  });
});

describe('SolicitudService - solicitudesIdSolicitudEstadoPATCH', () => {

  it('debe actualizar el estado exitosamente', async () => {
    sequelize.query.mockResolvedValue([[]]);

    const resultado = await SolicitudService.solicitudesIdSolicitudEstadoPATCH(
      'uuid-solicitud',
      { id_estado: 3 }
    );

    expect(resultado.success).toBe(true);
    expect(resultado.message).toBe('Estado actualizado exitosamente');
  });
});

describe('SolicitudService - solicitudesIdSolicitudNotasPUT', () => {

  it('debe actualizar las notas exitosamente', async () => {
    sequelize.query.mockResolvedValue([[]]);

    const resultado = await SolicitudService.solicitudesIdSolicitudNotasPUT(
      'uuid-solicitud',
      { notas_internas: 'Candidato contactado' }
    );

    expect(resultado.success).toBe(true);
    expect(resultado.message).toBe('Notas actualizadas exitosamente');
  });
});