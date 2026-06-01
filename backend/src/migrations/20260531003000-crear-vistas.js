'use strict';

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE VIEW vw_cv_ciego AS
      SELECT
        t.id_talento,
        t.resumen,
        rr.descripcion AS rango_renta,
        t.jornada_deseada,
        t.modalidad_deseada,
        t.discapacidad_ley21015,
        (
          SELECT json_agg(json_build_object('nivel', ae.nivel_educacional, 'carrera', ae.carrera))
          FROM antecedentes_educacionales ae
          WHERE ae.id_talento = t.id_talento AND ae.fecha_eliminacion IS NULL
        ) AS educacion,
        (
          SELECT json_agg(json_build_object(
            'cargo', al.cargo,
            'descripcion', al.descripcion,
            'anios', EXTRACT(YEAR FROM AGE(COALESCE(al.fecha_fin, CURRENT_DATE), al.fecha_inicio))
          ))
          FROM antecedentes_laborales al
          WHERE al.id_talento = t.id_talento AND al.fecha_eliminacion IS NULL
        ) AS experiencia_laboral,
        (
          SELECT json_agg(ct.nombre)
          FROM talento_competencia tc
          JOIN competencias_tecnicas ct ON ct.id_competencia = tc.id_competencia
          WHERE tc.id_talento = t.id_talento
        ) AS competencias,
        (
          SELECT json_agg(json_build_object('idioma', i.nombre, 'nivel', ti.nivel_dominio))
          FROM talento_idioma ti
          JOIN idiomas i ON i.id_idioma = ti.id_idioma
          WHERE ti.id_talento = t.id_talento
        ) AS idiomas
      FROM talentos t
      LEFT JOIN rangos_renta rr ON rr.id_rango = t.id_rango_renta
      WHERE t.fecha_eliminacion IS NULL
    `);

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE VIEW vw_estadisticas_plataforma AS
      SELECT
        (SELECT COUNT(*) FROM talentos WHERE fecha_eliminacion IS NULL) AS total_talentos,
        (SELECT COUNT(*) FROM talentos WHERE contratado = TRUE AND fecha_eliminacion IS NULL) AS talentos_contratados,
        (SELECT COUNT(*) FROM talentos WHERE discapacidad_ley21015 = TRUE AND fecha_eliminacion IS NULL) AS talentos_ley21015,
        (SELECT COUNT(*) FROM empresas WHERE fecha_eliminacion IS NULL) AS total_empresas,
        (SELECT COUNT(*) FROM solicitudes_talento) AS total_solicitudes,
        (SELECT COUNT(*) FROM solicitudes_talento st
          JOIN estados_seguimiento es ON es.id_estado = st.id_estado
          WHERE es.nombre = 'Seleccionado') AS solicitudes_exitosas,
        ROUND(
          (SELECT COUNT(*) FROM solicitudes_talento st
            JOIN estados_seguimiento es ON es.id_estado = st.id_estado
            WHERE es.nombre = 'Seleccionado')::NUMERIC
          / NULLIF((SELECT COUNT(*) FROM solicitudes_talento), 0) * 100, 2
        ) AS tasa_conversion_pct
    `);

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE VIEW vw_estadisticas_empresa AS
      SELECT
        e.id_empresa,
        e.nombre_empresa,
        re.nombre AS rubro,
        COUNT(DISTINCT st.id_solicitud) AS total_solicitudes,
        COUNT(DISTINCT CASE WHEN es.nombre = 'Seleccionado' THEN st.id_solicitud END) AS talentos_seleccionados,
        COUNT(DISTINCT CASE WHEN es.nombre = 'Entrevista' THEN st.id_solicitud END) AS en_entrevista,
        ROUND(
          COUNT(DISTINCT CASE WHEN es.nombre = 'Seleccionado' THEN st.id_solicitud END)::NUMERIC
          / NULLIF(COUNT(DISTINCT st.id_solicitud), 0) * 100, 2
        ) AS tasa_seleccion_pct,
        MAX(st.fecha_solicitud) AS ultima_solicitud
      FROM empresas e
      LEFT JOIN solicitudes_talento st ON st.id_empresa = e.id_empresa
      LEFT JOIN estados_seguimiento es ON es.id_estado = st.id_estado
      LEFT JOIN rubros_empresa re ON re.id_rubro = e.id_rubro
      WHERE e.fecha_eliminacion IS NULL
      GROUP BY e.id_empresa, e.nombre_empresa, re.nombre
    `);

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE VIEW vw_talentos_disponibles AS
      SELECT
        t.id_talento,
        t.nombres || ' ' || t.apellidos AS nombre_completo,
        u.correo,
        t.comuna_residencia,
        rr.descripcion AS rango_renta,
        t.jornada_deseada,
        t.modalidad_deseada,
        t.discapacidad_ley21015,
        t.fecha_creacion AS fecha_registro,
        COUNT(DISTINCT tc.id_competencia) AS num_competencias,
        COUNT(DISTINCT ti.id_idioma) AS num_idiomas,
        COUNT(DISTINCT al.id_laboral) AS num_experiencias
      FROM talentos t
      JOIN usuarios u ON u.id_usuario = t.id_usuario
      LEFT JOIN rangos_renta rr ON rr.id_rango = t.id_rango_renta
      LEFT JOIN talento_competencia tc ON tc.id_talento = t.id_talento
      LEFT JOIN talento_idioma ti ON ti.id_talento = t.id_talento
      LEFT JOIN antecedentes_laborales al ON al.id_talento = t.id_talento AND al.fecha_eliminacion IS NULL
      WHERE t.contratado = FALSE
        AND t.fecha_eliminacion IS NULL
        AND u.estado_validacion = 'Aprobado'
      GROUP BY t.id_talento, t.nombres, t.apellidos, u.correo,
               t.comuna_residencia, rr.descripcion, t.jornada_deseada,
               t.modalidad_deseada, t.discapacidad_ley21015, t.fecha_creacion
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query('DROP VIEW IF EXISTS vw_estadisticas_empresa');
    await queryInterface.sequelize.query('DROP VIEW IF EXISTS vw_estadisticas_plataforma');
    await queryInterface.sequelize.query('DROP VIEW IF EXISTS vw_talentos_disponibles');
    await queryInterface.sequelize.query('DROP VIEW IF EXISTS vw_cv_ciego');
  }
};