const request = require('supertest');
const app = require('../app');

describe('Auth endpoints', () => {

  it('POST /auth/login - debe retornar token con credenciales válidas', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        correo: 'admin@proviemplea.cl',
        password: 'password'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
  });

  it('POST /auth/login - debe retornar 401 con credenciales incorrectas', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        correo: 'admin@proviemplea.cl',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('POST /auth/login - debe retornar 400 con correo inválido', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        correo: 'correo-invalido',
        password: '123'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
  });

  it('POST /auth/register/talento - debe registrar un nuevo talento', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register/talento')
      .send({
        correo: `test${Date.now()}@gmail.com`,
        password: 'Password123!'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('POST /auth/register/talento - debe retornar 409 con correo duplicado', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register/talento')
      .send({
        correo: 'admin@proviemplea.cl',
        password: 'Password123!'
      });

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
  });

  afterAll(async () => {
    const sequelize = require('../config/connection');
    await sequelize.close();
  });

});