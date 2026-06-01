-- ==========================================
-- 0. LIMPIEZA Y PREPARACIÓN DEL ENTORNO
-- ==========================================
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION actualizar_fecha()
RETURNS TRIGGER AS $$
BEGIN
  NEW.fecha_actualizacion = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ==========================================
-- 1. TABLAS DE CATÁLOGO
-- ==========================================
CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE rubros_empresa (
    id_rubro SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE tipos_empresa (
    id_tipo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE competencias_tecnicas (
    id_competencia SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE idiomas (
    id_idioma SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE rangos_renta (
    id_rango SERIAL PRIMARY KEY,
    descripcion VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE estados_seguimiento (
    id_estado SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);


-- ==========================================
-- 2. ENTIDADES PRINCIPALES
-- ==========================================
CREATE TABLE usuarios (
    id_usuario UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_rol INT NOT NULL REFERENCES roles(id_rol),
    correo VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    estado_validacion VARCHAR(50) DEFAULT 'Pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_eliminacion TIMESTAMP NULL,
    CONSTRAINT chk_estado_validacion
        CHECK (estado_validacion IN ('Pendiente', 'Aprobado', 'Rechazado', 'Suspendido'))
);

CREATE TABLE empresas (
    id_empresa UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rut_empresa VARCHAR(20) UNIQUE NOT NULL,
    nombre_empresa VARCHAR(255) NOT NULL,
    id_rubro INT NOT NULL REFERENCES rubros_empresa(id_rubro),
    id_tipo_empresa INT NOT NULL REFERENCES tipos_empresa(id_tipo),
    presentacion TEXT,
    beneficios TEXT,
    logo_url VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_eliminacion TIMESTAMP NULL,
    CONSTRAINT chk_rut_formato
        CHECK (rut_empresa ~ '^\d{7,8}-[\dkK]$')
);

CREATE TABLE usuarios_empresa (
    id_usuario UUID PRIMARY KEY REFERENCES usuarios(id_usuario),
    id_empresa UUID NOT NULL REFERENCES empresas(id_empresa),
    nombre_completo VARCHAR(255) NOT NULL,
    telefono_contacto VARCHAR(20),
    CONSTRAINT chk_telefono
        CHECK (telefono_contacto IS NULL OR telefono_contacto ~ '^\+?[0-9\s\-]{7,20}$')
);

CREATE TABLE talentos (
    id_talento UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_usuario UUID UNIQUE NOT NULL REFERENCES usuarios(id_usuario),
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    comuna_residencia VARCHAR(100) NOT NULL,
    resumen TEXT,
    id_rango_renta INT REFERENCES rangos_renta(id_rango),
    jornada_deseada VARCHAR(50),
    modalidad_deseada VARCHAR(50),
    discapacidad_ley21015 BOOLEAN DEFAULT FALSE,
    contratado BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_eliminacion TIMESTAMP NULL,
    CONSTRAINT chk_jornada
        CHECK (jornada_deseada IN ('completa', 'parcial', 'por_turnos') OR jornada_deseada IS NULL),
    CONSTRAINT chk_modalidad
        CHECK (modalidad_deseada IN ('presencial', 'remoto', 'hibrido') OR modalidad_deseada IS NULL),
    CONSTRAINT chk_nombres_novacios
        CHECK (TRIM(nombres) <> '' AND TRIM(apellidos) <> '')
);


-- ==========================================
-- 3. TABLAS SECUNDARIAS E INTERMEDIAS
-- ==========================================
CREATE TABLE archivos_talento (
    id_archivo UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_talento UUID NOT NULL REFERENCES talentos(id_talento),
    tipo_documento VARCHAR(50) NOT NULL,
    formato VARCHAR(10) NOT NULL,
    ruta_archivo VARCHAR(255) NOT NULL,
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_eliminacion TIMESTAMP NULL,
    CONSTRAINT chk_tipo_documento
        CHECK (tipo_documento IN ('cv', 'comprobante_residencia', 'certificado')),
    CONSTRAINT chk_formato_archivo
        CHECK (formato IN ('pdf', 'docx', 'jpg', 'png'))
);

CREATE TABLE antecedentes_educacionales (
    id_educacion UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_talento UUID NOT NULL REFERENCES talentos(id_talento),
    nivel_educacional VARCHAR(100) NOT NULL,
    carrera VARCHAR(150),
    institucion VARCHAR(150),
    fecha_eliminacion TIMESTAMP NULL,
    CONSTRAINT chk_nivel_educacional
        CHECK (nivel_educacional IN (
            'Sin estudios', 'Básica completa', 'Media incompleta',
            'Media completa', 'Técnico nivel medio', 'Técnico nivel superior',
            'Universitario incompleto', 'Universitario completo',
            'Postgrado', 'Magíster', 'Doctorado'
        ))
);

CREATE TABLE antecedentes_laborales (
    id_laboral UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_talento UUID NOT NULL REFERENCES talentos(id_talento),
    empresa VARCHAR(150) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    fecha_eliminacion TIMESTAMP NULL,
    CONSTRAINT chk_fechas_laborales
        CHECK (fecha_fin IS NULL OR fecha_fin >= fecha_inicio)
);

CREATE TABLE perfeccionamiento (
    id_perfeccionamiento UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_talento UUID NOT NULL REFERENCES talentos(id_talento),
    nombre_curso VARCHAR(150) NOT NULL,
    institucion VARCHAR(150),
    anio_certificacion INT,
    fecha_eliminacion TIMESTAMP NULL,
    CONSTRAINT chk_anio_certificacion
        CHECK (anio_certificacion IS NULL OR
               (anio_certificacion >= 1950 AND anio_certificacion <= EXTRACT(YEAR FROM CURRENT_DATE)))
);

CREATE TABLE talento_competencia (
    id_talento UUID NOT NULL REFERENCES talentos(id_talento),
    id_competencia INT NOT NULL REFERENCES competencias_tecnicas(id_competencia),
    PRIMARY KEY (id_talento, id_competencia)
);

CREATE TABLE talento_idioma (
    id_talento UUID NOT NULL REFERENCES talentos(id_talento),
    id_idioma INT NOT NULL REFERENCES idiomas(id_idioma),
    nivel_dominio VARCHAR(50),
    PRIMARY KEY (id_talento, id_idioma),
    CONSTRAINT chk_nivel_dominio
        CHECK (nivel_dominio IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Nativo') OR nivel_dominio IS NULL)
);

CREATE TABLE solicitudes_talento (
    id_solicitud UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_empresa UUID NOT NULL REFERENCES empresas(id_empresa),
    id_talento UUID NOT NULL REFERENCES talentos(id_talento),
    id_estado INT NOT NULL REFERENCES estados_seguimiento(id_estado),
    notas_internas TEXT,
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_solicitud_activa UNIQUE (id_empresa, id_talento)
);


-- ==========================================
-- 4. TRIGGERS DE AUDITORÍA AUTOMÁTICA
-- ==========================================
CREATE TRIGGER trg_usuarios_actualizacion
BEFORE UPDATE ON usuarios
FOR EACH ROW EXECUTE FUNCTION actualizar_fecha();

CREATE TRIGGER trg_empresas_actualizacion
BEFORE UPDATE ON empresas
FOR EACH ROW EXECUTE FUNCTION actualizar_fecha();

CREATE TRIGGER trg_talentos_actualizacion
BEFORE UPDATE ON talentos
FOR EACH ROW EXECUTE FUNCTION actualizar_fecha();

CREATE TRIGGER trg_solicitudes_actualizacion
BEFORE UPDATE ON solicitudes_talento
FOR EACH ROW EXECUTE FUNCTION actualizar_fecha();


-- ==========================================
-- 5. ÍNDICES DE RENDIMIENTO
-- ==========================================
CREATE INDEX idx_talento_discapacidad  ON talentos(discapacidad_ley21015);
CREATE INDEX idx_educacion_carrera     ON antecedentes_educacionales(carrera);
CREATE INDEX idx_laboral_cargo         ON antecedentes_laborales(cargo);
CREATE INDEX idx_solicitudes_empresa   ON solicitudes_talento(id_empresa);
CREATE INDEX idx_solicitudes_talento   ON solicitudes_talento(id_talento);
CREATE INDEX idx_usuarios_correo       ON usuarios(correo);
CREATE INDEX idx_empresas_nombre       ON empresas(nombre_empresa);
CREATE INDEX idx_empresas_rubro        ON empresas(id_rubro);
CREATE INDEX idx_usuarios_estado_val   ON usuarios(estado_validacion);
CREATE INDEX idx_talentos_jornada      ON talentos(jornada_deseada);
CREATE INDEX idx_talentos_modalidad    ON talentos(modalidad_deseada);
CREATE INDEX idx_talentos_contratado   ON talentos(contratado);
CREATE INDEX idx_talentos_rango_renta  ON talentos(id_rango_renta);
CREATE INDEX idx_solicitudes_estado    ON solicitudes_talento(id_estado);
CREATE INDEX idx_solicitudes_fecha     ON solicitudes_talento(fecha_solicitud DESC);
CREATE INDEX idx_laboral_empresa       ON antecedentes_laborales(empresa);
CREATE INDEX idx_talento_disponible
    ON talentos(contratado, discapacidad_ley21015)
    WHERE fecha_eliminacion IS NULL;
CREATE INDEX idx_solicitudes_empresa_estado
    ON solicitudes_talento(id_empresa, id_estado);


-- ==========================================
-- 6. VISTAS SQL
-- ==========================================

-- VISTA: CV Ciego — oculta datos personales identificables
CREATE OR REPLACE VIEW vw_cv_ciego AS
SELECT
    t.id_talento,
    t.resumen,
    rr.descripcion                              AS rango_renta,
    t.jornada_deseada,
    t.modalidad_deseada,
    t.discapacidad_ley21015,
    (
        SELECT json_agg(json_build_object(
            'nivel', ae.nivel_educacional,
            'carrera', ae.carrera
        ))
        FROM antecedentes_educacionales ae
        WHERE ae.id_talento = t.id_talento
          AND ae.fecha_eliminacion IS NULL
    )                                           AS educacion,
    (
        SELECT json_agg(json_build_object(
            'cargo',       al.cargo,
            'descripcion', al.descripcion,
            'anios',       EXTRACT(YEAR FROM AGE(
                               COALESCE(al.fecha_fin, CURRENT_DATE),
                               al.fecha_inicio
                           ))
        ))
        FROM antecedentes_laborales al
        WHERE al.id_talento = t.id_talento
          AND al.fecha_eliminacion IS NULL
    )                                           AS experiencia_laboral,
    (
        SELECT json_agg(ct.nombre)
        FROM talento_competencia tc
        JOIN competencias_tecnicas ct ON ct.id_competencia = tc.id_competencia
        WHERE tc.id_talento = t.id_talento
    )                                           AS competencias,
    (
        SELECT json_agg(json_build_object(
            'idioma', i.nombre,
            'nivel',  ti.nivel_dominio
        ))
        FROM talento_idioma ti
        JOIN idiomas i ON i.id_idioma = ti.id_idioma
        WHERE ti.id_talento = t.id_talento
    )                                           AS idiomas
FROM talentos t
LEFT JOIN rangos_renta rr ON rr.id_rango = t.id_rango_renta
WHERE t.fecha_eliminacion IS NULL;

COMMENT ON VIEW vw_cv_ciego IS
'Vista de CV sin datos identificables: omite nombre, apellido, correo, comuna y empresa anterior.';


-- VISTA: Estadísticas generales de la plataforma
CREATE OR REPLACE VIEW vw_estadisticas_plataforma AS
SELECT
    (SELECT COUNT(*) FROM talentos WHERE fecha_eliminacion IS NULL)             AS total_talentos,
    (SELECT COUNT(*) FROM talentos WHERE contratado = TRUE
        AND fecha_eliminacion IS NULL)                                          AS talentos_contratados,
    (SELECT COUNT(*) FROM talentos WHERE discapacidad_ley21015 = TRUE
        AND fecha_eliminacion IS NULL)                                          AS talentos_ley21015,
    (SELECT COUNT(*) FROM empresas WHERE fecha_eliminacion IS NULL)             AS total_empresas,
    (SELECT COUNT(*) FROM solicitudes_talento)                                  AS total_solicitudes,
    (SELECT COUNT(*) FROM solicitudes_talento st
        JOIN estados_seguimiento es ON es.id_estado = st.id_estado
        WHERE es.nombre = 'Seleccionado')                                       AS solicitudes_exitosas,
    ROUND(
        (SELECT COUNT(*) FROM solicitudes_talento st
            JOIN estados_seguimiento es ON es.id_estado = st.id_estado
            WHERE es.nombre = 'Seleccionado')::NUMERIC
        / NULLIF((SELECT COUNT(*) FROM solicitudes_talento), 0) * 100, 2
    )                                                                           AS tasa_conversion_pct;

COMMENT ON VIEW vw_estadisticas_plataforma IS
'KPIs generales: total de talentos, contratados, empresas, solicitudes y tasa de conversión.';


-- VISTA: Estadísticas por empresa
CREATE OR REPLACE VIEW vw_estadisticas_empresa AS
SELECT
    e.id_empresa,
    e.nombre_empresa,
    re.nombre                                               AS rubro,
    COUNT(DISTINCT st.id_solicitud)                         AS total_solicitudes,
    COUNT(DISTINCT CASE
        WHEN es.nombre = 'Seleccionado' THEN st.id_solicitud
    END)                                                    AS talentos_seleccionados,
    COUNT(DISTINCT CASE
        WHEN es.nombre = 'Entrevista'   THEN st.id_solicitud
    END)                                                    AS en_entrevista,
    ROUND(
        COUNT(DISTINCT CASE WHEN es.nombre = 'Seleccionado' THEN st.id_solicitud END)::NUMERIC
        / NULLIF(COUNT(DISTINCT st.id_solicitud), 0) * 100, 2
    )                                                       AS tasa_seleccion_pct,
    MAX(st.fecha_solicitud)                                 AS ultima_solicitud
FROM empresas e
LEFT JOIN solicitudes_talento st  ON st.id_empresa = e.id_empresa
LEFT JOIN estados_seguimiento es  ON es.id_estado  = st.id_estado
LEFT JOIN rubros_empresa re        ON re.id_rubro   = e.id_rubro
WHERE e.fecha_eliminacion IS NULL
GROUP BY e.id_empresa, e.nombre_empresa, re.nombre;

COMMENT ON VIEW vw_estadisticas_empresa IS
'Resumen de actividad por empresa: solicitudes, seleccionados, en entrevista y tasa de selección.';


-- VISTA: Talentos disponibles con perfil completo (uso interno/admin)
CREATE OR REPLACE VIEW vw_talentos_disponibles AS
SELECT
    t.id_talento,
    t.nombres || ' ' || t.apellidos                         AS nombre_completo,
    u.correo,
    t.comuna_residencia,
    rr.descripcion                                          AS rango_renta,
    t.jornada_deseada,
    t.modalidad_deseada,
    t.discapacidad_ley21015,
    t.fecha_creacion                                        AS fecha_registro,
    COUNT(DISTINCT tc.id_competencia)                       AS num_competencias,
    COUNT(DISTINCT ti.id_idioma)                            AS num_idiomas,
    COUNT(DISTINCT al.id_laboral)                           AS num_experiencias
FROM talentos t
JOIN usuarios u                    ON u.id_usuario    = t.id_usuario
LEFT JOIN rangos_renta rr          ON rr.id_rango     = t.id_rango_renta
LEFT JOIN talento_competencia tc   ON tc.id_talento   = t.id_talento
LEFT JOIN talento_idioma ti        ON ti.id_talento   = t.id_talento
LEFT JOIN antecedentes_laborales al ON al.id_talento  = t.id_talento
    AND al.fecha_eliminacion IS NULL
WHERE t.contratado = FALSE
  AND t.fecha_eliminacion IS NULL
  AND u.estado_validacion = 'Aprobado'
GROUP BY t.id_talento, t.nombres, t.apellidos,
         u.correo, t.comuna_residencia, rr.descripcion,
         t.jornada_deseada, t.modalidad_deseada,
         t.discapacidad_ley21015, t.fecha_creacion;

COMMENT ON VIEW vw_talentos_disponibles IS
'Talentos aprobados, no contratados y activos. Incluye datos personales: uso restringido a admins.';


-- ==========================================
-- 7. STORED PROCEDURES
-- ==========================================

CREATE OR REPLACE PROCEDURE sp_crear_solicitud(
    p_id_empresa UUID,
    p_id_talento UUID,
    OUT p_resultado TEXT,
    OUT p_id_solicitud UUID
)
LANGUAGE plpgsql AS $$
DECLARE
    v_estado_inicial INT;
    v_talento_activo BOOLEAN;
    v_empresa_activa BOOLEAN;
BEGIN
    SELECT (fecha_eliminacion IS NULL)
        INTO v_empresa_activa
        FROM empresas WHERE id_empresa = p_id_empresa;

    IF NOT FOUND OR NOT v_empresa_activa THEN
        p_resultado := 'ERROR: Empresa no encontrada o eliminada.';
        RETURN;
    END IF;

    SELECT (fecha_eliminacion IS NULL AND contratado = FALSE)
        INTO v_talento_activo
        FROM talentos WHERE id_talento = p_id_talento;

    IF NOT FOUND OR NOT v_talento_activo THEN
        p_resultado := 'ERROR: Talento no disponible o ya contratado.';
        RETURN;
    END IF;

    IF EXISTS (
        SELECT 1 FROM solicitudes_talento
        WHERE id_empresa = p_id_empresa AND id_talento = p_id_talento
    ) THEN
        p_resultado := 'ERROR: Ya existe una solicitud activa para este talento.';
        RETURN;
    END IF;

    SELECT id_estado INTO v_estado_inicial
        FROM estados_seguimiento WHERE nombre = 'Solicitado';

    INSERT INTO solicitudes_talento (id_empresa, id_talento, id_estado)
    VALUES (p_id_empresa, p_id_talento, v_estado_inicial)
    RETURNING id_solicitud INTO p_id_solicitud;

    p_resultado := 'OK: Solicitud creada exitosamente.';

EXCEPTION WHEN OTHERS THEN
    p_resultado := 'ERROR inesperado: ' || SQLERRM;
END;
$$;

COMMENT ON PROCEDURE sp_crear_solicitud IS
'Crea una solicitud empresa-talento con validaciones: empresa activa, talento disponible, sin duplicados.';


CREATE OR REPLACE PROCEDURE sp_avanzar_estado_solicitud(
    p_id_solicitud UUID,
    p_nuevo_estado  VARCHAR(50),
    OUT p_resultado TEXT,
    p_notas         TEXT DEFAULT NULL
)
LANGUAGE plpgsql AS $$
DECLARE
    v_id_nuevo_estado INT;
    v_estado_actual   VARCHAR(50);
    v_id_talento      UUID;
BEGIN
    SELECT es.nombre, st.id_talento
        INTO v_estado_actual, v_id_talento
        FROM solicitudes_talento st
        JOIN estados_seguimiento es ON es.id_estado = st.id_estado
        WHERE st.id_solicitud = p_id_solicitud;

    IF NOT FOUND THEN
        p_resultado := 'ERROR: Solicitud no encontrada.';
        RETURN;
    END IF;

    IF v_estado_actual IN ('Seleccionado', 'No seleccionado', 'Cerrado') THEN
        p_resultado := 'ERROR: La solicitud ya está en estado final: ' || v_estado_actual;
        RETURN;
    END IF;

    SELECT id_estado INTO v_id_nuevo_estado
        FROM estados_seguimiento WHERE nombre = p_nuevo_estado;

    IF NOT FOUND THEN
        p_resultado := 'ERROR: Estado "' || p_nuevo_estado || '" no existe.';
        RETURN;
    END IF;

    UPDATE solicitudes_talento
       SET id_estado       = v_id_nuevo_estado,
           notas_internas  = COALESCE(p_notas, notas_internas)
    WHERE id_solicitud = p_id_solicitud;

    IF p_nuevo_estado = 'Seleccionado' THEN
        UPDATE talentos SET contratado = TRUE WHERE id_talento = v_id_talento;
    END IF;

    p_resultado := 'OK: Estado actualizado a "' || p_nuevo_estado || '".';

EXCEPTION WHEN OTHERS THEN
    p_resultado := 'ERROR inesperado: ' || SQLERRM;
END;
$$;

COMMENT ON PROCEDURE sp_avanzar_estado_solicitud IS
'Avanza el estado de una solicitud en el pipeline. Si llega a Seleccionado, marca al talento como contratado.';


CREATE OR REPLACE FUNCTION fn_estadisticas_talento(p_id_talento UUID)
RETURNS TABLE (
    metrica    TEXT,
    valor      TEXT
)
LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT 'Solicitudes recibidas'::TEXT, COUNT(*)::TEXT
    FROM solicitudes_talento
    WHERE id_talento = p_id_talento

    UNION ALL

    SELECT 'Solicitudes en entrevista', COUNT(*)::TEXT
    FROM solicitudes_talento st
    JOIN estados_seguimiento es ON es.id_estado = st.id_estado
    WHERE st.id_talento = p_id_talento AND es.nombre = 'Entrevista'

    UNION ALL

    SELECT 'Competencias registradas', COUNT(*)::TEXT
    FROM talento_competencia
    WHERE id_talento = p_id_talento

    UNION ALL

    SELECT 'Años de experiencia total',
           COALESCE(SUM(EXTRACT(YEAR FROM AGE(
               COALESCE(fecha_fin, CURRENT_DATE), fecha_inicio
           )))::TEXT, '0')
    FROM antecedentes_laborales
    WHERE id_talento = p_id_talento AND fecha_eliminacion IS NULL;
END;
$$;

COMMENT ON FUNCTION fn_estadisticas_talento IS
'Devuelve métricas clave de un talento: solicitudes, entrevistas, competencias y experiencia total.';


CREATE OR REPLACE FUNCTION fn_pipeline_empresa(p_id_empresa UUID)
RETURNS TABLE (
    id_solicitud    UUID,
    nombre_talento  TEXT,
    estado          TEXT,
    fecha_solicitud TIMESTAMP,
    notas_internas  TEXT
)
LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT
        st.id_solicitud,
        t.nombres || ' ' || t.apellidos,
        es.nombre,
        st.fecha_solicitud,
        st.notas_internas
    FROM solicitudes_talento st
    JOIN talentos t             ON t.id_talento = st.id_talento
    JOIN estados_seguimiento es ON es.id_estado = st.id_estado
    WHERE st.id_empresa = p_id_empresa
    ORDER BY st.fecha_solicitud DESC;
END;
$$;

COMMENT ON FUNCTION fn_pipeline_empresa IS
'Devuelve el pipeline de contratación completo para una empresa, ordenado por fecha descendente.';


-- ==========================================
-- 8. SEEDERS
-- ==========================================
INSERT INTO roles (nombre) VALUES ('admin'), ('talento'), ('empresa');

INSERT INTO rubros_empresa (nombre) VALUES
('Tecnología'), ('Salud'), ('Educación'), ('Comercio'), ('Construcción'),
('Gastronomía'), ('Finanzas'), ('Legal'), ('Marketing'), ('Logística');

INSERT INTO tipos_empresa (nombre) VALUES
('Contratación directa'), ('EST'), ('Outsourcing');

INSERT INTO competencias_tecnicas (nombre) VALUES
('Microsoft Office'), ('Excel Avanzado'), ('Python'), ('JavaScript'),
('SQL'), ('Photoshop'), ('Contabilidad'), ('Atención al cliente'),
('Gestión de proyectos'), ('Redes sociales');

INSERT INTO idiomas (nombre) VALUES
('Español'), ('Inglés'), ('Portugués'), ('Francés'), ('Alemán'), ('Italiano');

INSERT INTO rangos_renta (descripcion) VALUES
('Menos de $500.000'), ('$500.000 - $800.000'), ('$800.000 - $1.200.000'),
('$1.200.000 - $1.800.000'), ('$1.800.000 - $2.500.000'), ('Más de $2.500.000');

INSERT INTO estados_seguimiento (nombre) VALUES
('Solicitado'), ('Contactado'), ('Entrevista'),
('Seleccionado'), ('No seleccionado'), ('Cerrado');