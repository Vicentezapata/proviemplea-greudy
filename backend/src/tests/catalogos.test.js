const request = require('supertest');
const app = require('../app');

describe('Catálogos endpoints', () => {

  it('GET /catalogos/rubros - debe retornar lista de rubros', async () => {
    const res = await request(app)
      .get('/api/v1/catalogos/rubros');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('GET /catalogos/competencias - debe retornar lista de competencias', async () => {
    const res = await request(app)
      .get('/api/v1/catalogos/competencias');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('GET /catalogos/idiomas - debe retornar lista de idiomas', async () => {
    const res = await request(app)
      .get('/api/v1/catalogos/idiomas');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('GET /catalogos/rangos-renta - debe retornar lista de rangos', async () => {
    const res = await request(app)
      .get('/api/v1/catalogos/rangos-renta');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('GET /catalogos/estados-seguimiento - debe retornar lista de estados', async () => {
    const res = await request(app)
      .get('/api/v1/catalogos/estados-seguimiento');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  afterAll(async () => {
    const sequelize = require('../config/connection');
    await sequelize.close();
  });

});