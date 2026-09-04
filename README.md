# 🎓 Tutorial Promesas API Gratuita

Aprende **Promesas JavaScript** consumiendo una API real con **Tailwind CSS** compilado localmente, en formato **SPA con navegación**.

## 📖 ¿Qué es?

Proyecto educativo en formato Single Page Application (SPA) que demuestra los 7 patrones fundamentales de Promesas en JavaScript, además de secciones avanzadas de consumo de video, generación de reportes y geolocalización.

## 🚀 Características

| Sección | Descripción |
|---------|-------------|
| **Promise básica** | `fetch()` + `.then()` + `.catch()` + `.finally()` |
| **Promise + array** | Renderizar lista de datos con `.map()` |
| **Promise.all** | Peticiones en paralelo — todo o nada |
| **Promise.allSettled** | Aísla fallos — nunca rechaza |
| **Promise.race** | El primero en terminar gana |
| **Promise.any** | El primer éxito importa |
| **Máquina de Estados** | UI reactiva con PENDING / FULFILLED / REJECTED |
| **🎬 Videos** | Acceso a cámara con `getUserMedia()` + captura de fotos |
| **📊 Reportes** | Genera y descarga reportes desde datos de API (incluye exportar CSV) |
| **📍 Geolocalización** | Ubicación del usuario en mapa OpenStreetMap |
| **📇 Contacto** | Directorio de contactos consumiendo `GET /users` con `fetch` + `map` |
| **📈 Dashboard** | Métricas en vivo con `Promise.all` y autorefresco cada 30 s |

## 🚀 Quick Start

```bash
# 1. Instalar dependencias
npm install

# 2. Compilar CSS (una vez)
npm run build:css

# 3. Servir y abrir en el navegador
npm start
```

Abre **http://localhost:3000** en tu navegador.

## ✨ Requisitos

- **Node.js** v18 o superior
- **Navegador** moderno (Chrome, Firefox, Edge)
- **Editor de código** (VS Code recomendado)

## 🗂️ Estructura del proyecto

```
tutorial_promesas_api_gratis/
├── index.html              ← SPA principal (sidebar + navegación)
├── src/
│   ├── app.js              ← Lógica SPA, router y todos los ejemplos
│   ├── input.css           ← Fuente de Tailwind CSS
│   └── styles.css          ← CSS compilado (generado por build)
├── package.json            ← Dependencias y scripts
├── tailwind.config.js      ← Configuración de Tailwind
├── postcss.config.js       ← Pipeline de procesamiento CSS
├── TUTORIAL.md             ← Guía paso a paso completa
└── README.md               ← Este archivo
```

## 📦 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run build:css` | Compila Tailwind CSS una vez (producción) |
| `npm run watch:css` | Compila CSS en modo watch (desarrollo) |
| `npm run dev` | Alias de `watch:css` |
| `npm start` | Sirve el proyecto en localhost |
| `npm run clean` | Elimina el CSS compilado |

## 🔧 Tecnologías

- **JavaScript Vanilla** — Sin frameworks, sin transpiladores
- **Tailwind CSS 3** — Compilado localmente (sin CDN)
- **PostCSS + Autoprefixer** — Pipeline de procesamiento CSS
- **JSONPlaceholder API** — API gratuita de pruebas
- **OpenStreetMap** — Mapa gratuito para geolocalización

## 📝 Tutorial completo

Consulta **[TUTORIAL.md](./TUTORIAL.md)** para la guía paso a paso con explicaciones, analogías y código comentado.

## 🧑‍🤝‍🧑 Colaboradores y GitFlow

Proyecto desarrollado en pareja siguiendo el flujo de trabajo **GitFlow**:

| Rama | Autor | Alcance |
|------|-------|---------|
| `jose` | **josuel-munendez** | Promesas 1-4, página Contacto, teoría partes 1-2 y talleres 1-4 |
| `manrique` | **ManriBOT** | Promesas 5-7, cámara, geolocalización, reportes CSV, Dashboard, teoría partes 3-6 |

Flujo: `main` → `develop` → ramas `jose`/`manrique` → integración en `develop` y entrega en `main` con etiqueta semántica (`v1.0.0`).

## 📄 Licencia

ISC
