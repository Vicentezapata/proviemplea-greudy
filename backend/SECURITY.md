# Seguridad

## Vulnerabilidades conocidas

### uuid < 11.1.1 (Moderada)
- **Severidad**: Moderada
- **Identificador**: GHSA-w5hq-g745-h8pq
- **Descripción**: La librería uuid tiene un error en cómo maneja ciertos datos internos
- **Librería afectada**: sequelize usa uuid internamente
- **Estado**: No tiene solución disponible sin romper el proyecto
- **Por qué no se corrige**: El fix disponible requiere bajar Sequelize de v6 a v3, lo que rompería toda la API
- **Impacto real en este proyecto**: Ninguno, porque el proyecto no usa la función afectada
- **Solución futura**: Actualizar cuando Sequelize publique una versión compatible

## Registro de auditorías

| Fecha | Herramienta | Vulnerabilidades críticas | Vulnerabilidades moderadas |
|-------|-------------|--------------------------|---------------------------|
| 31/05/2026 | npm audit | 0 | 2 |