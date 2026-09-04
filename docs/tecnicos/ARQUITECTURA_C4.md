# Arquitectura del Sistema — Modelo C4

Este documento describe la arquitectura de la SPA de Promesas con el **Modelo C4** (Contexto, Contenedor, Componente). Al ser una aplicación en **JavaScript Vanilla** (programación funcional, sin clases/OOP), no se documentan diagramas de clases; se usan **C4** + **diagramas de flujo (Mermaid)**.

---

## 🌐 Nivel 1 — Contexto (C1)

Muestra el sistema como una caja negra y sus actores/sistemas externos.

```mermaid
flowchart LR
    U["👤 Usuario / Estudiante"] -->|"navega por hash"| SPA["SPA de Promesas\n(Sistema)"]
    SPA -->|"fetch() HTTP"| JP["JSONPlaceholder\nAPI REST de pruebas"]
    SPA -->|"geolocalización"| NAV["API Geo del Navegador"]
    SPA -->|"href iframe"| OSM["OpenStreetMap\nmapa embebido"]
    SPA -->|"getUserMedia()"| CAM["📷 Cámara del dispositivo"]
```

| Elemento | Descripción |
|----------|-------------|
| **Usuario/Estudiante** | Persona que interactúa con la SPA para aprender Promesas |
| **SPA de Promesas (Sistema)** | Aplicación de una sola página en JS Vanilla + Tailwind |
| **JSONPlaceholder** | API REST gratuita que entrega posts, usuarios, comentarios, álbumes y todos |
| **API de Geolocalización** | API del navegador (`navigator.geolocation`) para latitud/longitud |
| **OpenStreetMap** | Mapa embebido para mostrar la ubicación del usuario |
| **Cámara** | `navigator.mediaDevices.getUserMedia()` para captura de fotos |

---

## 🧱 Nivel 2 — Contenedor (C2)

Muestra los contenedores (piezas ejecutables) que forman el sistema.

```mermaid
flowchart TB
    subgraph Cliente["Navegador Web"]
        H["📄 index.html\nContenedor: SPA (estático)"]
        CSS["🎨 styles.css\nTailwind compilado"]
        JS["⚙️ app.js\nLógica de la SPA y Promesas"]
    end
    H --> CSS
    H --> JS
    JS -->|"fetch"| API[("JSONPlaceholder\nAPI externa")]
    JS -->|"getUserMedia"| CAM[("Cámara")]
    JS -->|"geolocation"| GEO[("API Geo")]
    JS -->|"iframe"| OSM[("OpenStreetMap")]
```

| Contenedor | Tipo | Descripción |
|------------|------|-------------|
| `index.html` | Archivo estático (SPA) | Estructura, sidebar de navegación y secciones de las 11 páginas |
| `styles.css` | CSS compilado | Estilos Tailwind generados localmente con PostCSS |
| `app.js` | JavaScript (cliente) | Router por hash, gestión de Promesas y toda la lógica |

---

## 🔩 Nivel 3 — Componente (C3)

Detalla los componentes lógicos internos de `app.js`.

```mermaid
flowchart TB
    RT["🛣️ Router SPA\nhandleRoute / showPage"]
    UT["🛠️ Utilidades\nsanitizeHTML · showLoading · showError"]
    PM["⚙️ Gestor de Promesas"]
    PM --> P1["loadSinglePost"]
    PM --> P2["loadUsersList"]
    PM --> P3["loadCombinedData"]
    PM --> P4["loadSettledPosts"]
    PM --> P5["loadRaceResult"]
    PM --> P6["loadAnyResult"]
    PM --> P7["initSearchIfNeeded\nMáquina de estados"]
    SEC["Secciones"] --> VID["initVideos"]
    SEC --> REP["initReports"]
    SEC --> GEO["initGeolocation"]
    SEC --> CON["loadContactData"]
    SEC --> DASH["loadDashboardData"]
    UT --> RT
    RT --> PM
    RT --> SEC
```

| Componente | Responsabilidad |
|------------|-----------------|
| **Router SPA** | Lee el hash y muestra la sección activa (`handleRoute`, `showPage`, `updatePageTitle`) |
| **Utilidades** | Funciones puras de apoyo: saneado de HTML, estados de carga y error |
| **Gestor de Promesas** | 7 funciones demostrando cada patrón de Promise |
| **Secciones** | Cámara, reportes, geolocalización, contacto y dashboard |

---

## 🔁 Nivel 4 — Flujo de datos (C4 funcional: secuencias)

Como el paradigma es funcional y no orientado a objetos, el nivel 4 se representa con **diagramas de secuencia/flujo** en vez de clases.

### Flujo carga de un post individual

```mermaid
sequenceDiagram
    participant U as Usuario
    participant JS as app.js (loadSinglePost)
    participant API as JSONPlaceholder
    U->>JS: naviga a #promise-basica
    JS->>JS: postIds = [1,3,5]
    JS->>API: fetch('/posts/1') , '/posts/3' , '/posts/5'
    API-->>JS: Promesas (pending → fulfilled/rejected)
    JS->>JS: Promise.allSettled(results)
    alt Todos fallan
        JS-->>U: "No se pudieron cargar los posts"
    else Algunos cumplen
        JS-->>U: Renderiza posts exitosos + errores por post
    end
```

### Flujo combinación con Promise.all

```mermaid
sequenceDiagram
    participant JS as app.js (loadCombinedData)
    participant API as JSONPlaceholder
    JS->>API: fetch('/posts/1')
    JS->>API: fetch('/users/1')
    JS->>API: fetch('/posts/1/comments')
    API-->>JS: tres Promesas en paralelo
    JS->>JS: Promise.all([...])
    alt Falla una
        JS-->>JS: .catch() → "todo o nada"
    else Todas ok
        JS-->>JS: render(post + autor + comentarios)
    end
```

---

*Documentación de arquitectura C4 generada como parte del entregable (Fase 3). Diagramas en Mermaid renderizables en GitHub.*
