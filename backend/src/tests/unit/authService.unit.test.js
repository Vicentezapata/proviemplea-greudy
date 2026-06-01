jest.mock('../../config/connection');
jest.mock('../../models/Usuario', () => ({
  findOne: jest.fn(),
  create: jest.fn()
}));
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const Usuario = require('../../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthService = require('../../services/AuthService');

describe('AuthService - authLoginPOST', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test_secret';
    process.env.JWT_EXPIRES_IN = '24h';
  });

  it('debe retornar error si el usuario no existe', async () => {
    Usuario.findOne.mockResolvedValue(null);
    const resultado = await AuthService.authLoginPOST({
      authLoginPostRequest: { correo: 'noexiste@mail.com', password: '123456' }
    });
    expect(resultado.success).toBe(false);
  });

  it('debe retornar error si la contraseña es incorrecta', async () => {
    Usuario.findOne.mockResolvedValue({
      id_usuario: 'uuid-123', correo: 'test@mail.com',
      password_hash: 'hash_falso', id_rol: 2
    });
    bcrypt.compare.mockResolvedValue(false);
    const resultado = await AuthService.authLoginPOST({
      authLoginPostRequest: { correo: 'test@mail.com', password: 'wrongpass' }
    });
    expect(resultado.success).toBe(false);
  });

  it('debe retornar token si las credenciales son correctas', async () => {
    Usuario.findOne.mockResolvedValue({
      id_usuario: 'uuid-123', correo: 'test@mail.com',
      password_hash: 'hash_correcto', id_rol: 2
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token_generado');
    const resultado = await AuthService.authLoginPOST({
      authLoginPostRequest: { correo: 'test@mail.com', password: 'Password123!' }
    });
    expect(resultado.success).toBe(true);
    expect(resultado.data.token).toBe('token_generado');
  });
});

describe('AuthService - authRegisterTalentoPOST', () => {
  beforeEach(() => { jest.clearAllMocks(); });

  it('debe retornar error si el correo ya existe', async () => {
    Usuario.findOne.mockResolvedValue({ correo: 'existe@mail.com' });
    const resultado = await AuthService.authRegisterTalentoPOST({
      authRegisterTalentoPostRequest: { correo: 'existe@mail.com', password: 'Password123!' }
    });
    expect(resultado.success).toBe(false);
  });

  it('debe registrar exitosamente un nuevo talento', async () => {
    Usuario.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hash_generado');
    Usuario.create.mockResolvedValue({
      id_usuario: 'uuid-nuevo', correo: 'nuevo@mail.com', estado_validacion: 'Pendiente'
    });
    const resultado = await AuthService.authRegisterTalentoPOST({
      authRegisterTalentoPostRequest: { correo: 'nuevo@mail.com', password: 'Password123!' }
    });
    expect(resultado.success).toBe(true);
    expect(resultado.data.correo).toBe('nuevo@mail.com');
  });
});