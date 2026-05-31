const request = require('supertest');
const app = require('../app');

describe('Admin endpoints', () => {
  let tokenAdmin;

  // Antes de todos los tests obtenemos el token admin
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        correo: 'admin@proviemplea.cl',
        password: 'password'
      });
    tokenAdmin = res.body.data.token;
  });

  it('GET /admin/usuarios - debe retornar lista de usuarios', async () => {
    const res = await request(app)
      .get('/api/v1/admin/usuarios')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.meta).toBeDefined();
  });

  it('GET /admin/usuarios - debe retornar 401 sin token', async () => {
    const res = await request(app)
      .get('/api/v1/admin/usuarios');

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('GET /admin/talentos - debe retornar lista de talentos', async () => {
    const res = await request(app)
      .get('/api/v1/admin/talentos')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('GET /admin/empresas - debe retornar lista de empresas', async () => {
    const res = await request(app)
      .get('/api/v1/admin/empresas')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('GET /admin/estadisticas - debe retornar estadísticas', async () => {
    const res = await request(app)
      .get('/api/v1/admin/estadisticas')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.total_talentos).toBeDefined();
    expect(res.body.data.total_empresas).toBeDefined();
  });

  it('GET /admin/usuarios - debe retornar 403 con token de talento', async () => {
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        correo: 'vecino2@gmail.com',
        password: 'Password123!'
      });

    const res = await request(app)
      .get('/api/v1/admin/usuarios')
      .set('Authorization', `Bearer ${loginRes.body.data.token}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.success).toBe(false);
  });

  afterAll(async () => {
  const sequelize = require('../config/connection');
  await sequelize.close();
  });
  

});