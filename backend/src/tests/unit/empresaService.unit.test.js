jest.mock('../../config/connection');
jest.mock('../../models/Empresa', () => ({
  update: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn()
}));
jest.mock('../../models/Usuario', () => ({
  findOne: jest.fn(),
  create: jest.fn()
}));
jest.mock('bcryptjs');

const sequelize = require('../../config/connection');
const Empresa = require('../../models/Empresa');
const Usuario = require('../../models/Usuario');
const bcrypt = require('bcryptjs');
const EmpresaService = require('../../services/EmpresaService');

describe('EmpresaService - empresasPerfilGET', () => {
  beforeEach(() => { jest.clearAllMocks(); });

  it('debe retornar error si la empresa no existe', async () => {
    sequelize.query.mockResolvedValue([[]]);
    const resultado = await EmpresaService.empresasPerfilGET('uuid-usuario');
    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('Empresa no encontrada');
  });

  it('debe retornar el perfil de la empresa', async () => {
    sequelize.query.mockResolvedValue([[{
      id_empresa: 'uuid-empresa', nombre_empresa: 'Tech Solutions',
      rubro: 'Tecnología', tipo_empresa: 'Contratación directa'
    }]]);
    const resultado = await EmpresaService.empresasPerfilGET('uuid-usuario');
    expect(resultado.success).toBe(true);
    expect(resultado.data.nombre_empresa).toBe('Tech Solutions');
  });
});

describe('EmpresaService - empresasPerfilPUT', () => {
  beforeEach(() => { jest.clearAllMocks(); });

  it('debe retornar error si la empresa no existe', async () => {
    sequelize.query.mockResolvedValue([[]]);
    const resultado = await EmpresaService.empresasPerfilPUT('uuid-usuario', { nombre_empresa: 'Nueva' });
    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('Empresa no encontrada');
  });

  it('debe actualizar el perfil exitosamente', async () => {
    sequelize.query.mockResolvedValue([[{ id_empresa: 'uuid-empresa' }]]);
    Empresa.update.mockResolvedValue([1]);
    const resultado = await EmpresaService.empresasPerfilPUT('uuid-usuario', {
      nombre_empresa: 'Tech Solutions SpA', presentacion: 'Empresa líder',
      beneficios: 'Seguro médico', id_rubro: 1, id_tipo_empresa: 1
    });
    expect(resultado.success).toBe(true);
    expect(resultado.message).toBe('Perfil actualizado exitosamente');
  });
});

describe('EmpresaService - empresasUsuariosPOST', () => {
  beforeEach(() => { jest.clearAllMocks(); });

  it('debe retornar error si el correo ya está registrado', async () => {
    Usuario.findOne.mockResolvedValue({ correo: 'existe@mail.com' });
    const resultado = await EmpresaService.empresasUsuariosPOST('uuid-usuario', {
      correo: 'existe@mail.com', password: 'Password123!', nombre_completo: 'Juan Pérez'
    });
    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('El correo ya está registrado');
  });

  it('debe retornar error si la empresa no existe', async () => {
    Usuario.findOne.mockResolvedValue(null);
    sequelize.query.mockResolvedValue([[]]);
    const resultado = await EmpresaService.empresasUsuariosPOST('uuid-usuario', {
      correo: 'nuevo@mail.com', password: 'Password123!', nombre_completo: 'Juan Pérez'
    });
    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('Empresa no encontrada');
  });

  it('debe crear el usuario exitosamente', async () => {
    Usuario.findOne.mockResolvedValue(null);
    sequelize.query
      .mockResolvedValueOnce([[{ id_empresa: 'uuid-empresa' }]])
      .mockResolvedValueOnce([[]]);
    bcrypt.hash.mockResolvedValue('hash_generado');
    Usuario.create.mockResolvedValue({ id_usuario: 'uuid-nuevo', correo: 'nuevo@mail.com' });
    const resultado = await EmpresaService.empresasUsuariosPOST('uuid-usuario', {
      correo: 'nuevo@mail.com', password: 'Password123!', nombre_completo: 'Juan Pérez'
    });
    expect(resultado.success).toBe(true);
    expect(resultado.message).toBe('Usuario creado exitosamente');
  });
});

describe('EmpresaService - empresasSolicitudesGET', () => {
  beforeEach(() => { jest.clearAllMocks(); });

  it('debe retornar lista de solicitudes', async () => {
    sequelize.query.mockResolvedValue([[
      { id_solicitud: 'uuid-1', estado: 'Solicitado' },
      { id_solicitud: 'uuid-2', estado: 'Entrevista' }
    ]]);
    const resultado = await EmpresaService.empresasSolicitudesGET('uuid-usuario');
    expect(resultado.success).toBe(true);
    expect(resultado.data.length).toBe(2);
  });

  it('debe retornar lista vacía si no hay solicitudes', async () => {
    sequelize.query.mockResolvedValue([[]]);
    const resultado = await EmpresaService.empresasSolicitudesGET('uuid-usuario');
    expect(resultado.success).toBe(true);
    expect(resultado.data.length).toBe(0);
  });
});