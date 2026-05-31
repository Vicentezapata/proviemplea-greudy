const request = require('supertest');
const app = require('../app');

describe('Empresas endpoints', () => {
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

  it('GET /empresas/perfil - debe retornar perfil de empresa', async () => {
    const res = await request(app)
      .get('/api/v1/empresas/perfil')
      .set('Authorization', `Bearer ${tokenEmpresa}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('GET /empresas/perfil - debe retornar 401 sin token', async () => {
    const res = await request(app)
      .get('/api/v1/empresas/perfil');

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('PUT /empresas/perfil - debe actualizar perfil de empresa', async () => {
    const res = await request(app)
      .put('/api/v1/empresas/perfil')
      .set('Authorization', `Bearer ${tokenEmpresa}`)
      .send({
        nombre_empresa: 'Tech Solutions SpA',
        presentacion: 'Empresa líder en tecnología',
        beneficios: 'Seguro médico, trabajo remoto',
        id_rubro: 1,
        id_tipo_empresa: 1
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /empresas/usuarios - debe retornar usuarios de la empresa', async () => {
    const res = await request(app)
      .get('/api/v1/empresas/usuarios')
      .set('Authorization', `Bearer ${tokenEmpresa}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('GET /empresas/solicitudes - debe retornar solicitudes de la empresa', async () => {
    const res = await request(app)
      .get('/api/v1/empresas/solicitudes')
      .set('Authorization', `Bearer ${tokenEmpresa}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  afterAll(async () => {
    const sequelize = require('../config/connection');
    await sequelize.close();
  });

});