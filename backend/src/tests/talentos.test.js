const request = require('supertest');
const app = require('../app');

describe('Talentos endpoints', () => {
  let tokenTalento;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        correo: 'vecino2@gmail.com',
        password: 'Password123!'
      });
    tokenTalento = res.body.data.token;
  });

  it('GET /talentos/perfil - debe retornar perfil del talento', async () => {
    const res = await request(app)
      .get('/api/v1/talentos/perfil')
      .set('Authorization', `Bearer ${tokenTalento}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('GET /talentos/perfil - debe retornar 401 sin token', async () => {
    const res = await request(app)
      .get('/api/v1/talentos/perfil');

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('PUT /talentos/perfil - debe actualizar perfil', async () => {
    const res = await request(app)
      .put('/api/v1/talentos/perfil')
      .set('Authorization', `Bearer ${tokenTalento}`)
      .send({
        resumen: 'Profesional con experiencia en retail y ventas',
        jornada_deseada: 'completa',
        modalidad_deseada: 'hibrido',
        id_rango_renta: 3,
        discapacidad_ley21015: false
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('POST /talentos/educacion - debe agregar educación', async () => {
    const res = await request(app)
      .post('/api/v1/talentos/educacion')
      .set('Authorization', `Bearer ${tokenTalento}`)
      .send({
        nivel_educacional: 'Universitario',
        carrera: 'Ingeniería Comercial',
        institucion: 'Universidad de Chile'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('POST /talentos/laboral - debe agregar experiencia laboral', async () => {
    const res = await request(app)
      .post('/api/v1/talentos/laboral')
      .set('Authorization', `Bearer ${tokenTalento}`)
      .send({
        empresa: 'Empresa Test SA',
        cargo: 'Analista',
        descripcion: 'Análisis de datos',
        fecha_inicio: '2022-01-01',
        fecha_fin: '2024-01-01'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('PUT /talentos/competencias - debe actualizar competencias', async () => {
    const res = await request(app)
      .put('/api/v1/talentos/competencias')
      .set('Authorization', `Bearer ${tokenTalento}`)
      .send({
        competencias: [1, 2, 3]
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('PUT /talentos/idiomas - debe actualizar idiomas', async () => {
    const res = await request(app)
      .put('/api/v1/talentos/idiomas')
      .set('Authorization', `Bearer ${tokenTalento}`)
      .send({
        idiomas: [
          { id_idioma: 1, nivel_dominio: 'nativo' },
          { id_idioma: 2, nivel_dominio: 'avanzado' }
        ]
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  afterAll(async () => {
    const sequelize = require('../config/connection');
    await sequelize.close();
  });

});