<div align="center">

<img src="public/images/logo-proviemplea.png" alt="ProviEmplea Logo" width="180"/>

# ProviEmplea — Guía de Diseño UI/UX

### Sistema de Diseño Institucional · Municipalidad de Providencia

[![Figma](https://img.shields.io/badge/Design-Institucional-4D9FC1?style=for-the-badge&logo=figma&logoColor=white)](.)
[![WCAG](https://img.shields.io/badge/WCAG-2.1_AA-00A86B?style=for-the-badge&logo=w3c&logoColor=white)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Tailwind](https://img.shields.io/badge/Tailwind-v3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile_First-0F243E?style=for-the-badge&logo=google-chrome&logoColor=white)](.)

</div>

---

## 🎯 Principios de diseño

El diseño de ProviEmplea se rige por cuatro pilares que guiaron cada decisión visual y de experiencia de usuario:

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  🏛️ INSTITUCIONAL │  │  ♿ INCLUSIVO    │  │  💡 CLARO        │  │  📱 RESPONSIVO   │
│                 │  │                 │  │                 │  │                 │
│ Representa a la │  │ Accesible para  │  │ El vecino sabe  │  │ Funciona en     │
│ Municipalidad   │  │ todos los       │  │ siempre qué     │  │ móvil, tablet   │
│ de Providencia  │  │ vecinos         │  │ debe hacer      │  │ y desktop       │
└─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 🎨 Paleta de colores

### Colores principales

| Muestra | Nombre | Hex | Uso |
|---------|--------|-----|-----|
| 🔵 | **Azul Providencia** | `#4D9FC1` | Botones primarios, links activos, badges, íconos de acción |
| 🌑 | **Azul Institucional** | `#0F243E` | Navbar, sidebar, headers, textos principales |
| ⬜ | **Fondo claro** | `#F8FAFC` | Background general de la aplicación |
| 🟦 | **Blanco** | `#FFFFFF` | Cards, modales, formularios |

### Colores de estado

| Muestra | Nombre | Hex | Clase Tailwind | Uso |
|---------|--------|-----|----------------|-----|
| 🟢 | **Éxito** | `#22C55E` | `text-green-600` | Aprobados, validaciones exitosas |
| 🟡 | **Advertencia** | `#F59E0B` | `text-yellow-600` | Pendientes, alertas informativas |
| 🔴 | **Error** | `#EF4444` | `text-red-600` | Rechazados, errores de formulario |
| 🟣 | **Proceso** | `#8B5CF6` | `text-purple-600` | Entrevistas, procesos en curso |
| 🔷 | **Info** | `#3B82F6` | `text-blue-600` | Información general, solicitado |
| ⚫ | **Cerrado** | `#94a3b8` | `text-slate-400` | Procesos cerrados, inactivos |

### Estados de solicitud

```javascript
// src/constants/api.js
ESTADOS_SOLICITUD = {
  1: { label: 'Solicitado',      color: 'bg-blue-100 text-blue-800'   },
  2: { label: 'Contactado',      color: 'bg-yellow-100 text-yellow-800'},
  3: { label: 'Entrevista',      color: 'bg-purple-100 text-purple-800'},
  4: { label: 'Seleccionado',    color: 'bg-green-100 text-green-800'  },
  5: { label: 'No seleccionado', color: 'bg-red-100 text-red-800'      },
  6: { label: 'Cerrado',         color: 'bg-slate-100 text-slate-600'  },
}
```

---

## 🔤 Tipografía

El sistema usa dos familias de Google Fonts:

| Familia | Uso | Pesos |
|---------|-----|-------|
| **Inter** | Texto general, párrafos, labels, botones | 400, 500, 600 |
| **Manrope** | Títulos, headings, valores KPI | 700, 800, 900 |

### Escala tipográfica

| Clase Tailwind | Tamaño | Uso |
|----------------|--------|-----|
| `text-2xl font-black` | 24px | Títulos de página H1 |
| `text-lg font-bold` | 18px | Subtítulos de sección H2 |
| `text-sm font-bold` | 14px | Títulos de card |
| `text-sm` | 14px | Texto de párrafo |
| `text-xs font-semibold` | 12px | Labels y etiquetas |
| `text-[10px] font-black uppercase` | 10px | Badges, categorías |
| `text-3xl font-black` | 30px | Valores KPI en dashboards |

---

## 📐 Layout del sistema

### Estructura de páginas autenticadas

```
┌──────────────────────────────────────────────────────────────────┐
│                    NAVBAR  h-16  sticky top-0                    │
│  🏛️ Logo ProviEmplea    💬 Mensajes  🔔 Notificaciones  👤 Usuario│
├───────────────────┬──────────────────────────────────────────────┤
│                   │                                              │
│   SIDEBAR  w-60   │           CONTENIDO PRINCIPAL               │
│   sticky top-24   │           flex-1  space-y-6                 │
│                   │                                              │
│  PORTAL VECINOS   │   ┌──────────────────────────────────────┐  │
│  ─────────────    │   │  Header de página                    │  │
│  🏠 Dashboard     │   │  h1 text-2xl font-black              │  │
│  👤 Mi Perfil     │   └──────────────────────────────────────┘  │
│  👁️ CV Ciego      │                                              │
│  📥 Solicitudes   │   ┌────────┐ ┌────────┐ ┌────────┐ ┌──────┐ │
│  🕐 Historial     │   │  KPI  │ │  KPI  │ │  KPI  │ │ KPI  │ │
│  📁 Archivos      │   └────────┘ └────────┘ └────────┘ └──────┘ │
│  💬 Mensajes  2   │                                              │
│  ⚙️ Completar     │   ┌──────────────────────────────────────┐  │
│  ❓ Ayuda         │   │  Cards / Tablas / Formularios        │  │
│                   │   └──────────────────────────────────────┘  │
└───────────────────┴──────────────────────────────────────────────┘
```

### Contenedor máximo

```css
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8
```

---

## 🧩 Sistema de componentes

### Navbar

```
Fondo:     #0F243E  (azul institucional)
Altura:    h-16 (64px)  
Posición:  sticky top-0 z-50
```

**Contenido:**
- **Izquierda:** Logo ProviEmplea → lleva al landing
- **Derecha:** Ícono mensajes (con contador) + Ícono notificaciones (con contador) + separador + Avatar + nombre + rol + menú desplegable

### Sidebar

```
Fondo:     #0F243E  (mismo que navbar — coherencia institucional)
Ancho:     w-60 (240px)
Posición:  sticky top-24
Visibilidad: hidden lg:flex (oculto en móvil)
```

**Estados de links:**

| Estado | Fondo | Color texto |
|--------|-------|-------------|
| Inactivo | `transparent` | `#94a3b8` |
| Hover | `transparent` | `white` |
| Activo | `#4D9FC1` | `white` |

### Cards

```css
/* Card base */
bg-white rounded-2xl border border-slate-100 shadow-sm p-5

/* Card interactiva */
hover:shadow-md transition-all hover:-translate-y-0.5
```

### Botones

| Tipo | Estilos |
|------|---------|
| **Primario** | `bg-[#4D9FC1] text-white rounded-xl font-bold hover:opacity-90` |
| **Secundario** | `border-2 border-[#4D9FC1] text-[#4D9FC1] rounded-xl hover:bg-slate-50` |
| **Peligro** | `bg-red-500 text-white rounded-xl font-bold hover:opacity-90` |
| **Institucional** | `bg-[#0F243E] text-white rounded-xl font-bold hover:opacity-90` |
| **Ghost** | `border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50` |

### Inputs y formularios

```css
/* Input estándar */
px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none
transition-all focus:border-[#4D9FC1] focus:ring-2 focus:ring-[#4D9FC1]/20

/* Input con error */
border-color: #EF4444
box-shadow: 0 0 0 3px rgba(239,68,68,0.1)
```

### Badges de estado

```css
/* Patrón general */
text-xs font-bold px-2.5 py-1 rounded-full

/* Ejemplo aprobado */
bg-green-100 text-green-800

/* Ejemplo pendiente */
bg-yellow-100 text-yellow-800
```

---

## 📱 Diseño responsivo

| Breakpoint | Ancho | Adaptaciones |
|------------|-------|--------------|
| `sm` | 640px | Grids 2 columnas, formularios adaptados |
| `md` | 768px | Navbar elementos visibles |
| `lg` | 1024px | Sidebar visible, grids 3-4 columnas |
| `xl` | 1280px | Contenido centrado `max-w-7xl` |

### Adaptaciones móviles específicas

```
📱 Sidebar      → hidden lg:flex — menú hamburguesa en navbar
📱 Mensajes     → lista/detalle con toggle — una vista a la vez
📱 KPIs grid    → grid-cols-2 lg:grid-cols-4
📱 Tablas       → columnas se ocultan para mantener legibilidad
```

---

## 🖥️ Páginas por módulo

### Páginas públicas

| Página | Ruta | Descripción |
|--------|------|-------------|
| 🏠 Landing | `/` | Hero costanera, métricas, carrusel ferias, CV Ciego, FAQ, footer |
| 🔑 Login | `/login` | Panel decorativo izq + formulario con validación |
| 📝 Registro Vecino | `/registro/talento` | Formulario con validación RUT |
| 🏢 Registro Empresa | `/registro/empresa` | Formulario registro empresarial |
| 🔒 Recuperar Password | `/recuperar-password` | Reset por correo |

### 🏠 Portal Vecinos `id_rol = 2`

| Página | Ruta | Highlights de diseño |
|--------|------|---------------------|
| Dashboard | `/talento/dashboard` | KPIs, banner validación amarillo, accesos rápidos |
| Mi Perfil | `/talento/perfil` | Barra de completitud animada |
| Completar Perfil | `/talento/completar-perfil` | Stepper 5 pasos con íconos |
| CV Ciego | `/talento/cv-ciego` | Header gradiente, datos protegidos en rojo |
| Mis Solicitudes | `/talento/solicitudes` | Filtros por estado, badges coloridos |
| Historial | `/talento/historial` | Timeline visual con línea vertical |
| Mis Archivos | `/talento/archivos` | Drag & drop con zona animada |
| Mensajes | `/talento/mensajes` | Lista izq + detalle der, estilo institucional |
| Ayuda | `/talento/ayuda` | FAQ por categorías + contacto OMIL |

### 🏢 Portal Empresas `id_rol = 3`

| Página | Ruta | Highlights de diseño |
|--------|------|---------------------|
| Dashboard | `/empresa/dashboard` | KPIs, solicitudes recientes |
| Vitrina | `/empresa/vitrina` | Búsqueda + filtros + grid CV Ciego |
| Detalle Talento | `/empresa/talento/:id` | CV Ciego con header gradiente |
| Seguimiento | `/empresa/seguimiento` | Contadores por estado + lista |
| Mensajes | `/empresa/mensajes` | Bandeja institucional empresa-OMIL |

### 🏛️ Mesa Control OMIL `id_rol = 1`

| Página | Ruta | Highlights de diseño |
|--------|------|---------------------|
| Dashboard | `/admin/dashboard` | 6 KPIs, pendientes de validación |
| Ficha Fiscalización | `/admin/talentos/:id` | Header institucional oscuro, documentos |
| Solicitudes | `/admin/solicitudes` | Select inline para cambio de estado |
| Estadísticas | `/admin/estadisticas` | Barras de progreso + Ley 21.015 |
| Exportación | `/admin/exportacion` | Cards con botones por formato |
| Mensajes OMIL | `/admin/mensajes` | Bandeja con filtros por tipo |

---

## ♿ Accesibilidad WCAG 2.1 AA

### Widget flotante de accesibilidad

Botón flotante en esquina inferior derecha con animación `pulse` en azul institucional:

```
┌─────────────────────────────────────┐
│  ♿ Opciones de accesibilidad        │
│                                     │
│  Aa  Tamaño de texto    [- A A +]   │
│  𝔻   Fuente dislexia    [ON/OFF]    │
│  🔗  Resaltar enlaces   [ON/OFF]    │
│  🔊  Lector de voz      [ON/OFF]    │
│  🖱️  Cursor gigante     [ON/OFF]    │
└─────────────────────────────────────┘
```

### Implementaciones en código

```jsx
// Navegación
aria-label="Navegación principal"
aria-current="page"           // Link activo

// Formularios
aria-invalid={!!errores.campo}
aria-describedby="campo-error"
role="alert"                  // Mensajes de error

// Íconos decorativos
aria-hidden="true"

// Botones
aria-expanded={menuAbierto}
aria-label="Cerrar menú"
```

---

## 🎭 Patrón CV Ciego

El corazón del diseño de ProviEmplea:

```
┌─────────────────────────────────────────────────────┐
│  CV Ciego  ✓ Verificado OMIL                        │  ← Header gradiente #0F243E → #4D9FC1
│                                                     │
│  Código oficial                                     │
│  TALENTO PVD-2026-XXX                               │
├─────────────────────────────────────────────────────┤
│  🔴 Datos protegidos                                │  ← Badges rojos con candado
│  [Nombre] [Edad] [Género] [Dirección] [Foto] [RUT]  │
├─────────────────────────────────────────────────────┤
│  Disponibilidad                                     │
│  [Jornada completa] [Presencial] [🟢 Disponible]    │
├─────────────────────────────────────────────────────┤
│  Competencias técnicas                              │
│  [React] [Node.js] [PostgreSQL] ...                 │
├─────────────────────────────────────────────────────┤
│  🔒 Privacidad garantizada — datos solo con         │
│     autorización explícita del vecino/a             │
└─────────────────────────────────────────────────────┘
```

---

## 💬 Sistema de mensajería

Diseño institucional — NO es un chat informal:

```
┌──────────────────────┬──────────────────────────────────────────┐
│  🔍 Buscar mensajes  │                                          │
├──────────────────────┤   📋 Asunto del mensaje                  │
│  [Todos] [Validación]│   OMIL Providencia                       │
│  [Solicitudes]...    │                                          │
├──────────────────────┤   ┌────────────────────────────────┐     │
│  📋 OMIL Providencia │   │ OMIL Providencia  09:15        │     │
│  Validación...  Hoy  │   │ Mensaje institucional...       │     │
│  ● Sin leer          │   └────────────────────────────────┘     │
│                      │                      ┌──────────────┐    │
│  📋 Sistema          │                      │ Tú  09:30    │    │
│  Perfil incompleto   │                      │ Respuesta... │    │
└──────────────────────┴──────────────────────┴──────────────┴────┘
```

---

## 🔔 Panel de notificaciones

Dropdown dinámico por rol con hasta 5 notificaciones recientes:

```
┌────────────────────────────────────────┐
│  Notificaciones          3 sin leer    │
│  [Marcar todas como leídas]            │
├────────────────────────────────────────┤
│  ⚠️  Cuenta pendiente de validación    │  ← warning (amarillo)
│      La OMIL está revisando...         │
│      Hace 2 horas    [Ver estado →]    │
├────────────────────────────────────────┤
│  ℹ️  Perfil incompleto                 │  ← info (azul)
│      Completa tu experiencia...        │
│      Hace 5 horas    [Completar →]     │
├────────────────────────────────────────┤
│  ✅  Nueva empresa interesada          │  ← success (verde)
│      Una empresa solicitó...           │
│      Ayer             [Ver solicitud →]│
└────────────────────────────────────────┘
```

---

## ⚙️ Decisiones de diseño

### ¿Por qué diseño claro y no oscuro?

Los estándares **Government Digital Services** (Gov.uk, Canada Digital) recomiendan fondos claros para plataformas gubernamentales ya que:
- Mayor legibilidad para adultos mayores
- Mejor contraste en condiciones de luz variada
- Percepción de confianza e institucionalidad
- Cumplimiento WCAG 2.1 AA más sencillo

### ¿Por qué sidebar y navbar del mismo color?

El color `#0F243E` en ambos elementos crea una **barra lateral que se siente como parte del sistema institucional**, no como un elemento genérico. Genera unidad visual y refuerza la identidad de la Municipalidad de Providencia.

### ¿Por qué `style={{}}` en lugar de clases Tailwind para colores?

Los colores `#4D9FC1` y `#0F243E` son personalizados. En contextos de colores **condicionales y dinámicos** (activo/inactivo, por ejemplo), usar `style={{}}` garantiza que el color se aplique correctamente sin depender del purge de Tailwind, que podría eliminar clases dinámicas no detectadas en build.

### ¿Por qué Tailwind v3 y no v4?

Tailwind CSS v4 presentó incompatibilidades con Vite 6 y React 19 al momento del desarrollo. Tailwind v3 es estable, ampliamente documentado y compatible con todo el stack.

### ¿Por qué lazy loading en todas las páginas?

Con más de 30 páginas en el sistema, `React.lazy()` + `Suspense` reduce el bundle inicial significativamente. El usuario solo descarga el código de la página que está visitando.

---

## 📏 Convenciones de código

### Nomenclatura

```
Componentes:   PascalCase    → DashboardTalento.jsx
Hooks:         camelCase     → useAuth.js
Servicios:     camelCase     → talentoService
Constantes:    UPPER_SNAKE   → ROLES, ESTADOS_SOLICITUD
Archivos CSS:  kebab-case    → animations.css
```

### Estructura de una página

```jsx
// 1. Encabezado descriptivo del archivo
// 2. Imports React (useState, useEffect)
// 3. Imports layout (Navbar, Sidebar)
// 4. Imports servicios y contexto
// 5. Imports íconos (lucide-react)
// 6. Estado local
// 7. useEffect para carga de datos
// 8. Funciones de manejo de eventos
// 9. Return JSX:
//    └─ <div className="min-h-screen bg-[#F8FAFC]">
//       └─ <Navbar />
//       └─ <div className="max-w-7xl mx-auto...">
//          └─ <div className="flex gap-8">
//             └─ <Sidebar />
//             └─ <main className="flex-1 space-y-6">
```

### Clases reutilizables

```javascript
// Usadas consistentemente en todos los formularios
const inputClass = `w-full px-4 py-3 rounded-xl border border-slate-200 
  text-sm outline-none transition-all focus:border-[#4D9FC1] 
  focus:ring-2 focus:ring-[#4D9FC1]/20`;

const labelClass = "text-sm font-semibold text-slate-700 block mb-1.5";
```

---

<div align="center">

**Sistema de diseño desarrollado para la Municipalidad de Providencia**

[![Providencia](https://img.shields.io/badge/Municipalidad-Providencia-4D9FC1?style=for-the-badge)](https://www.providencia.cl)
[![WCAG](https://img.shields.io/badge/Accesible-WCAG_2.1_AA-00A86B?style=for-the-badge)](https://www.w3.org/WAI/WCAG21/quickref/)

*Instituto Profesional San Sebastián — 2026*

</div>
