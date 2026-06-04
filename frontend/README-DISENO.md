# ProviEmplea — Guía de Diseño Frontend

**Documentación de diseño UI/UX de la plataforma ProviEmplea**  
Municipalidad de Providencia — OMIL Municipal  
Instituto Profesional San Sebastián, 2026

---

## Principios de diseño

El diseño de ProviEmplea sigue cuatro principios fundamentales que guiaron cada decisión visual y de experiencia de usuario:

1. **Institucional** — El sistema representa a la Municipalidad de Providencia. Cada elemento visual refleja seriedad, confianza y carácter público.
2. **Inclusivo** — Diseñado para ser accesible para todos los vecinos, independiente de edad, capacidad visual o nivel de manejo tecnológico. Cumple WCAG 2.1 AA.
3. **Claro** — La información se presenta de forma directa y sin ambigüedades. El vecino siempre sabe en qué paso está y qué debe hacer.
4. **Responsivo** — Funciona correctamente en computadores de escritorio, tablets y dispositivos móviles.

---

## Identidad visual

### Paleta de colores

La paleta fue definida a partir de la identidad visual oficial de la Municipalidad de Providencia.

| Nombre | Hex | Uso principal |
|--------|-----|---------------|
| **Azul Providencia** | `#4D9FC1` | Botones primarios, links activos, íconos de acción, badges |
| **Azul Institucional** | `#0F243E` | Navbar, sidebar, headers de secciones, textos principales |
| **Fondo claro** | `#F8FAFC` | Fondo general de la aplicación |
| **Blanco** | `#FFFFFF` | Cards, modales, formularios |
| **Texto principal** | `#0F243E` | Títulos y textos importantes |
| **Texto secundario** | `#475569` | Texto de párrafos y descripciones |
| **Texto suave** | `#94a3b8` | Placeholders, etiquetas secundarias |
| **Borde** | `#e2e8f0` | Bordes de inputs y cards |
| **Verde éxito** | `#22C55E` | Estados aprobados, validaciones exitosas |
| **Amarillo advertencia** | `#F59E0B` | Pendientes, alertas informativas |
| **Rojo error** | `#EF4444` | Estados rechazados, errores de formulario |
| **Índigo** | `#6366f1` | Elementos secundarios, procesos en curso |

### Uso del color en estados

Los estados del proceso de selección tienen colores consistentes en toda la aplicación:

| Estado | Color | Clase Tailwind |
|--------|-------|----------------|
| Solicitado | Azul | `bg-blue-100 text-blue-800` |
| Contactado | Amarillo | `bg-yellow-100 text-yellow-800` |
| Entrevista | Morado | `bg-purple-100 text-purple-800` |
| Seleccionado | Verde | `bg-green-100 text-green-800` |
| No seleccionado | Rojo | `bg-red-100 text-red-800` |
| Cerrado | Gris | `bg-slate-100 text-slate-600` |

---

## Tipografía

El sistema usa dos familias tipográficas de Google Fonts:

| Familia | Uso | Pesos |
|---------|-----|-------|
| **Inter** | Texto general, párrafos, labels, botones | 400, 500, 600 |
| **Manrope** | Títulos, headings, valores KPI | 700, 800, 900 |

### Escala tipográfica

| Clase Tailwind | Tamaño | Uso |
|----------------|--------|-----|
| `text-2xl font-black` | 24px | Títulos de página (H1) |
| `text-lg font-bold` | 18px | Subtítulos de sección (H2) |
| `text-sm font-bold` | 14px | Títulos de card |
| `text-sm` | 14px | Texto de párrafo |
| `text-xs font-semibold` | 12px | Labels y etiquetas |
| `text-[10px] font-black` | 10px | Badges, categorías, uppercase |
| `text-3xl font-black` | 30px | Valores de KPI en dashboard |

---

## Sistema de componentes

### Layout del portal autenticado

Todas las páginas autenticadas comparten el mismo layout de tres zonas:

```
┌─────────────────────────────────────────────────────────┐
│                      NAVBAR (h-16)                      │
│  Logo | Mensajes | Notificaciones | Usuario | Rol       │
├──────────────────┬──────────────────────────────────────┤
│                  │                                      │
│   SIDEBAR        │         CONTENIDO PRINCIPAL          │
│   (w-60)         │         (flex-1)                     │
│                  │                                      │
│   Portal label   │   Header de página                   │
│   Links por rol  │   Cards / Tablas / Formularios       │
│   Badges         │                                      │
│                  │                                      │
└──────────────────┴──────────────────────────────────────┘
```

### Navbar

- Fondo: `#0F243E` (azul institucional)
- Altura fija: `h-16` (64px)
- Posición: `sticky top-0 z-50`
- Contenido: logo (izquierda) + acciones (derecha)
- Las acciones incluyen: ícono mensajes con contador, ícono notificaciones con contador, separador, avatar + nombre + rol + menú desplegable

### Sidebar

- Fondo: `#0F243E` (mismo que navbar para coherencia visual)
- Ancho: `w-60` (240px)
- Posición: `sticky top-24` (se mantiene al hacer scroll)
- Solo visible en pantallas `lg` (1024px+)
- Links inactivos: texto `#94a3b8`
- Link activo: fondo `#4D9FC1`, texto blanco
- Hover: texto blanco con transición suave
- Etiqueta del módulo: texto `#4D9FC1` uppercase

### Cards

Todas las cards del sistema siguen el mismo patrón base:

```
bg-white rounded-2xl border border-slate-100 shadow-sm p-5
```

Las cards interactivas (clicables) agregan:
```
hover:shadow-md transition-all hover:-translate-y-0.5
```

### Botones

| Tipo | Estilos |
|------|---------|
| **Primario** | `bg-[#4D9FC1] text-white rounded-xl font-bold hover:opacity-90` |
| **Secundario** | `border-2 border-[#4D9FC1] text-[#4D9FC1] rounded-xl font-semibold hover:bg-slate-50` |
| **Peligro** | `bg-red-500 text-white rounded-xl font-bold hover:opacity-90` |
| **Institucional** | `bg-[#0F243E] text-white rounded-xl font-bold hover:opacity-90` |
| **Ghost** | `border-2 border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50` |

### Inputs y formularios

```css
/* Input estándar */
px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none
transition-all focus:border-[#4D9FC1] focus:ring-2 focus:ring-[#4D9FC1]/20

/* Input con error */
border-color: #EF4444
box-shadow: 0 0 0 3px rgba(239,68,68,0.1)
```

Los formularios siempre incluyen:
- Label con `text-sm font-semibold text-slate-700`
- Input con estados focus, error y disabled
- Mensaje de error en rojo con ícono `AlertCircle`

### Badges de estado

Todos los badges siguen el patrón:
```
text-xs font-bold px-2.5 py-1 rounded-full
```

Con colores de fondo y texto según el estado (ver tabla de estados arriba).

---

## Páginas por módulo

### Páginas públicas

| Página | Ruta | Descripción |
|--------|------|-------------|
| Landing | `/` | Hero con imagen costanera, métricas, carrusel ferias, alianzas, CV Ciego, beneficios, FAQ, footer |
| Login | `/login` | Panel decorativo izquierdo + formulario con validación |
| Registro Vecino | `/registro/talento` | Formulario de registro con validación de RUT |
| Registro Empresa | `/registro/empresa` | Formulario de registro empresarial |
| Recuperar Password | `/recuperar-password` | Solicitud de reset por correo |

### Portal Vecinos (id_rol = 2)

| Página | Ruta | Descripción |
|--------|------|-------------|
| Dashboard | `/talento/dashboard` | KPIs, banner validación, accesos rápidos |
| Mi Perfil | `/talento/perfil` | Barra completitud, resumen, educación, experiencia, competencias |
| Completar Perfil | `/talento/completar-perfil` | Stepper 5 pasos |
| CV Ciego | `/talento/cv-ciego` | Vista sin datos personales + nota privacidad |
| Mis Solicitudes | `/talento/solicitudes` | Empresas interesadas con estados |
| Historial | `/talento/historial` | Timeline visual de procesos |
| Mis Archivos | `/talento/archivos` | Drag & drop de documentos |
| Validación Cuenta | `/talento/validacion` | Estado del proceso de validación |
| Mensajes | `/talento/mensajes` | Bandeja institucional con OMIL |
| Ayuda | `/talento/ayuda` | FAQ por categorías + contacto OMIL |

### Portal Empresas (id_rol = 3)

| Página | Ruta | Descripción |
|--------|------|-------------|
| Dashboard | `/empresa/dashboard` | KPIs, solicitudes recientes, accesos |
| Perfil Empresa | `/empresa/perfil` | Edición de datos empresariales |
| Vitrina | `/empresa/vitrina` | CV Ciego de talentos con búsqueda y filtros |
| Detalle Talento | `/empresa/talento/:id` | CV Ciego individual + solicitar contacto |
| Seguimiento | `/empresa/seguimiento` | Estado de candidatos por etapa |
| Historial | `/empresa/historial` | Tabla historial de solicitudes |
| Mensajes | `/empresa/mensajes` | Bandeja institucional con OMIL |

### Mesa Control OMIL (id_rol = 1)

| Página | Ruta | Descripción |
|--------|------|-------------|
| Dashboard | `/admin/dashboard` | KPIs sistema, pendientes validación |
| Gestión Talentos | `/admin/talentos` | Tabla con aprobar/rechazar |
| Ficha Fiscalización | `/admin/talentos/:id` | Ficha completa con documentos y validación |
| Gestión Empresas | `/admin/empresas` | Lista de empresas registradas |
| Detalle Empresa | `/admin/empresas/:id` | Información y actividad de la empresa |
| Solicitudes | `/admin/solicitudes` | Cambio de estados del proceso |
| Envío Talentos | `/admin/envio-talentos` | Envío manual de perfiles a empresas |
| Seguimiento | `/admin/seguimiento` | Monitor de procesos activos |
| Estadísticas | `/admin/estadisticas` | KPIs + barras progreso + Ley 21.015 |
| Exportación | `/admin/exportacion` | Descarga de reportes por formato |
| Mensajes | `/admin/mensajes` | Bandeja OMIL con vecinos y empresas |

---

## Accesibilidad WCAG 2.1

El sistema cumple con los criterios de accesibilidad WCAG 2.1 nivel AA mediante:

### Widget flotante de accesibilidad

Botón flotante en esquina inferior derecha disponible en todas las páginas. Permite al usuario:

| Función | Descripción |
|---------|-------------|
| Tamaño de texto | Aumentar o disminuir el tamaño base de fuente |
| Fuente dislexia | Activa OpenDyslexic para mejorar la lectura |
| Resaltar enlaces | Subraya y resalta todos los enlaces de la página |
| Lector de voz | Síntesis de voz del texto seleccionado |
| Cursor gigante | Aumenta el tamaño del puntero del mouse |

### Buenas prácticas implementadas

- Todos los elementos interactivos tienen `aria-label` descriptivo
- Formularios con `aria-invalid` y `aria-describedby` en errores
- Navegación con `aria-current="page"` en el link activo
- Contraste de colores superior a 4.5:1 en texto sobre fondos
- Todos los íconos decorativos tienen `aria-hidden="true"`
- Estructura semántica con `<nav>`, `<main>`, `<aside>` y roles ARIA
- Elementos `role="alert"` en mensajes de error
- Compatible con navegación por teclado

---

## Diseño responsivo

El sistema usa los breakpoints de Tailwind CSS:

| Breakpoint | Ancho | Comportamiento |
|------------|-------|----------------|
| `sm` | 640px | Grids de 2 columnas, formularios adaptados |
| `md` | 768px | Navbar muestra elementos ocultos en móvil |
| `lg` | 1024px | Sidebar visible, grids de 3-4 columnas |
| `xl` | 1280px | Contenido centrado con `max-w-7xl` |

### Adaptaciones móviles

- **Sidebar:** Oculto en móvil (`hidden lg:flex`). La navegación en móvil va en el menú hamburguesa del navbar.
- **Mensajes:** Vista lista/detalle con toggle en móvil — muestra una vista a la vez.
- **Grids KPI:** 2 columnas en móvil, 4 en desktop (`grid-cols-2 lg:grid-cols-4`).
- **Tablas:** En móvil algunas columnas se ocultan para mantener legibilidad.

---

## Convenciones de código

### Nomenclatura de componentes
- Componentes: `PascalCase` → `DashboardTalento.jsx`
- Hooks: `camelCase` con prefijo `use` → `useAuth.js`
- Servicios: `camelCase` con sufijo `Service` → `talentoService`
- Constantes: `UPPER_SNAKE_CASE` → `ROLES`, `ESTADOS_SOLICITUD`

### Estructura de un componente de página

```jsx
// 1. Encabezado con descripción
// 2. Imports de React
// 3. Imports de componentes layout (Navbar, Sidebar)
// 4. Imports de servicios y contexto
// 5. Imports de íconos
// 6. Estado local con useState
// 7. Efectos con useEffect
// 8. Funciones de manejo de eventos
// 9. Return con JSX
//    └── Navbar
//    └── Container max-w-7xl
//        └── flex gap-8
//            └── Sidebar
//            └── main (contenido)
```

### Clases Tailwind reutilizables

```javascript
// Input estándar
const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none transition-all focus:border-[#4D9FC1] focus:ring-2 focus:ring-[#4D9FC1]/20";

// Label estándar
const labelClass = "text-sm font-semibold text-slate-700 block mb-1.5";

// Card base
const cardClass = "bg-white rounded-2xl border border-slate-100 shadow-sm p-6";
```

---

## Decisiones de diseño importantes

### ¿Por qué Tailwind v3 y no v4?
Se usó Tailwind CSS v3 en lugar de v4 porque la versión 4 presentó incompatibilidades con Vite 6 y React 19 al momento del desarrollo, causando que los estilos no se aplicaran correctamente. Tailwind v3 es estable y ampliamente documentado.

### ¿Por qué el sidebar tiene el mismo color que el navbar?
Para crear coherencia visual institucional. El color `#0F243E` representa la identidad oficial de la Municipalidad de Providencia. Tener navbar y sidebar del mismo color genera una barra lateral que se siente como parte del sistema institucional, no como un elemento genérico.

### ¿Por qué los colores se aplican con `style={}` y no con clases Tailwind?
Los colores institucionales (`#4D9FC1` y `#0F243E`) son valores personalizados que no están en la paleta base de Tailwind. Aunque están configurados en `tailwind.config.js`, en algunos contextos dinámicos (como colores condicionales) es más seguro aplicarlos con `style={{}}` para garantizar que se apliquen correctamente sin depender del purge de Tailwind.

### ¿Por qué lazy loading en todas las páginas?
Con `React.lazy()` y `Suspense`, las páginas se cargan solo cuando el usuario las visita. Esto reduce el bundle inicial y mejora el tiempo de carga de la aplicación, especialmente importante considerando que hay más de 30 páginas en el sistema.

---

## Licencia

Proyecto académico — Instituto Profesional San Sebastián, 2026.  
Municipalidad de Providencia — OMIL Municipal.
