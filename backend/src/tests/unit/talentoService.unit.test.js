jest.mock('../../config/connection');
const sequelize = require('../../config/connection');
const TalentoService = require('../../services/TalentoService');

describe('TalentoService - talentosPerfilGET', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe retornar error si el talento no existe', async () => {
    sequelize.query.mockResolvedValue([[]]);

    const resultado = await TalentoService.talentosPerfilGET('uuid-inexistente');

    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('Perfil no encontrado');
  });

  it('debe retornar el perfil si existe', async () => {
    sequelize.query.mockResolvedValue([[{
      id_talento: 'uuid-123',
      nombres: 'Juan',
      apellidos: 'Pérez',
      resumen: 'Profesional con experiencia'
    }]]);

    const resultado = await TalentoService.talentosPerfilGET('uuid-123');

    expect(resultado.success).toBe(true);
    expect(resultado.data.id_talento).toBe('uuid-123');
  });
});

describe('TalentoService - talentosEducacionPOST', () => {

  it('debe retornar error si el talento no existe', async () => {
    sequelize.query.mockResolvedValue([[]]);

    const resultado = await TalentoService.talentosEducacionPOST('uuid-inexistente', {
      nivel_educacional: 'Universitario completo',
      carrera: 'Ingeniería',
      institucion: 'USACH'
    });

    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('Talento no encontrado');
  });

  it('debe agregar educación exitosamente', async () => {
    sequelize.query
      .mockResolvedValueOnce([[{ id_talento: 'uuid-123' }]]) // obtenerIdTalento
      .mockResolvedValueOnce([[]]);                           // INSERT

    const resultado = await TalentoService.talentosEducacionPOST('uuid-usuario', {
      nivel_educacional: 'Universitario completo',
      carrera: 'Ingeniería',
      institucion: 'USACH'
    });

    expect(resultado.success).toBe(true);
    expect(resultado.message).toBe('Educación agregada exitosamente');
  });
});

describe('TalentoService - talentosEducacionIdEducacionPUT', () => {

  it('debe retornar error si el registro no pertenece al talento', async () => {
    sequelize.query
      .mockResolvedValueOnce([[{ id_talento: 'uuid-123' }]]) // obtenerIdTalento
      .mockResolvedValueOnce([[]]);                           // verificarOwnership — no encontrado

    const resultado = await TalentoService.talentosEducacionIdEducacionPUT(
      'uuid-usuario',
      'uuid-educacion-otro',
      { nivel_educacional: 'Magíster' }
    );

    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('Registro no encontrado o no autorizado');
  });

  it('debe actualizar si el registro pertenece al talento', async () => {
    sequelize.query
      .mockResolvedValueOnce([[{ id_talento: 'uuid-123' }]])           // obtenerIdTalento
      .mockResolvedValueOnce([[{ id_educacion: 'uuid-educacion' }]])   // verificarOwnership
      .mockResolvedValueOnce([[]]);                                     // UPDATE

    const resultado = await TalentoService.talentosEducacionIdEducacionPUT(
      'uuid-usuario',
      'uuid-educacion',
      { nivel_educacional: 'Magíster', carrera: 'Derecho', institucion: 'UDP' }
    );

    expect(resultado.success).toBe(true);
    expect(resultado.message).toBe('Actualizado exitosamente');
  });
});

describe('TalentoService - talentosCompetenciasPUT', () => {

  it('debe retornar error si el talento no existe', async () => {
    sequelize.query.mockResolvedValue([[]]);

    const resultado = await TalentoService.talentosCompetenciasPUT('uuid-inexistente', {
      competencias: [1, 2, 3]
    });

    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('Talento no encontrado');
  });

  it('debe actualizar competencias con transacción', async () => {
    const mockTransaction = {
      commit: jest.fn(),
      rollback: jest.fn()
    };
    sequelize.transaction = jest.fn().mockResolvedValue(mockTransaction);
    sequelize.query
      .mockResolvedValueOnce([[{ id_talento: 'uuid-123' }]]) // obtenerIdTalento
      .mockResolvedValue([[]]);                               // DELETE + INSERTs

    const resultado = await TalentoService.talentosCompetenciasPUT('uuid-usuario', {
      competencias: [1, 2, 3]
    });

    expect(resultado.success).toBe(true);
    expect(mockTransaction.commit).toHaveBeenCalled();
    expect(resultado.message).toBe('Competencias actualizadas exitosamente');
  });

  it('debe hacer rollback si falla la transacción', async () => {
    const mockTransaction = {
      commit: jest.fn(),
      rollback: jest.fn()
    };
    sequelize.transaction = jest.fn().mockResolvedValue(mockTransaction);
    sequelize.query
      .mockResolvedValueOnce([[{ id_talento: 'uuid-123' }]])
      .mockRejectedValueOnce(new Error('Error de BD'));

    await expect(
      TalentoService.talentosCompetenciasPUT('uuid-usuario', { competencias: [1, 2] })
    ).rejects.toThrow('Error de BD');

    expect(mockTransaction.rollback).toHaveBeenCalled();
  });
});