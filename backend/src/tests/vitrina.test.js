const request = require('supertest');
const app = require('../app');

describe('Vitrina endpoints', () => {
  let tokenEmpresa;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        correo: 'empresa2@tech.cl',
        password: 'Password123!'
      });
    tokenEmpresa = res.body.data.token;
  });

  it('GET /vitrina - debe retornar lista de talentos con CV Ciego', async () => {
    const res = await request(app)
      .get('/api/v1/vitrina')
      .set('Authorization', `Bearer ${tokenEmpresa}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.meta).toBeDefined();
  });

  it('GET /vitrina - debe retornar 401 sin token', async () => {
    const res = await request(app)
      .get('/api/v1/vitrina');

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('GET /vitrina - debe retornar 403 con token de talento', async () => {
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        correo: 'vecino2@gmail.com',
        password: 'Password123!'
      });

    const res = await request(app)
      .get('/api/v1/vitrina')
      .set('Authorization', `Bearer ${loginRes.body.data.token}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.success).toBe(false);
  });

  it('GET /vitrina - no debe exponer datos personales', async () => {
    const res = await request(app)
      .get('/api/v1/vitrina')
      .set('Authorization', `Bearer ${tokenEmpresa}`);

    expect(res.statusCode).toBe(200);
    if (res.body.data.length > 0) {
      const talento = res.body.data[0];
      expect(talento.nombres).toBeUndefined();
      expect(talento.apellidos).toBeUndefined();
      expect(talento.nombres).toBeUndefined();
      expect(talento.apellidos).toBeUndefined();
    }
  });

  afterAll(async () => {
    const sequelize = require('../config/connection');
    await sequelize.close();
  });

});