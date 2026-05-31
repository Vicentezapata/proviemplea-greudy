const request = require('supertest');
const app = require('../app');

describe('Solicitudes endpoints', () => {
  let tokenEmpresa;
  let tokenAdmin;
  let idSolicitud;

  beforeAll(async () => {
    const resEmpresa = await request(app)
      .post('/api/v1/auth/login')
      .send({
        correo: 'empresa2@tech.cl',
        password: 'Password123!'
      });
    tokenEmpresa = resEmpresa.body.data.token;

    const resAdmin = await request(app)
      .post('/api/v1/auth/login')
      .send({
        correo: 'admin@proviemplea.cl',
        password: 'password'
      });
    tokenAdmin = resAdmin.body.data.token;
  });

  it('POST /solicitudes - debe crear una solicitud', async () => {
    const res = await request(app)
      .post('/api/v1/solicitudes')
      .set('Authorization', `Bearer ${tokenEmpresa}`)
      .send({
        id_talento: 'e22d5d79-e760-42df-aada-1cc194d2de65'
      });

    expect([201, 409]).toContain(res.statusCode);
    if (res.statusCode === 201) {
      expect(res.body.success).toBe(true);
      idSolicitud = res.body.data.id_solicitud;
    }
  });

  it('GET /solicitudes/:id - debe retornar detalle de solicitud', async () => {
    const solicitudRes = await request(app)
      .get('/api/v1/admin/solicitudes')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    if (solicitudRes.body.data.length > 0) {
      idSolicitud = solicitudRes.body.data[0].id_solicitud;

      const res = await request(app)
        .get(`/api/v1/solicitudes/${idSolicitud}`)
        .set('Authorization', `Bearer ${tokenAdmin}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
    }
  });

  it('PATCH /solicitudes/:id/estado - debe actualizar estado', async () => {
    const solicitudRes = await request(app)
      .get('/api/v1/admin/solicitudes')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    if (solicitudRes.body.data.length > 0) {
      idSolicitud = solicitudRes.body.data[0].id_solicitud;

      const res = await request(app)
        .patch(`/api/v1/solicitudes/${idSolicitud}/estado`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({ id_estado: 3 });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    }
  });

  it('PUT /solicitudes/:id/notas - debe actualizar notas', async () => {
    const solicitudRes = await request(app)
      .get('/api/v1/admin/solicitudes')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    if (solicitudRes.body.data.length > 0) {
      idSolicitud = solicitudRes.body.data[0].id_solicitud;

      const res = await request(app)
        .put(`/api/v1/solicitudes/${idSolicitud}/notas`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({ notas_internas: 'Nota de prueba automatizada' });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    }
  });

  afterAll(async () => {
    const sequelize = require('../config/connection');
    await sequelize.close();
  });

});