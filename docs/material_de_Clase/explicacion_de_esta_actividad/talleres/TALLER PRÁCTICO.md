**TALLER PRÁCTICO: SPA con Promesas y API**

**📋 OBJETIVOS DEL TALLER**

Al finalizar este taller, los estudiantes serán capaces de:

1. **Comprender y aplicar los diferentes métodos de Promesas** en JavaScript (.then(), .catch(), Promise.all(), Promise.allSettled(), Promise.race(), Promise.any())  
2. **Desarrollar una SPA (Single Page Application)** con navegación por hash  
3. **Consumir APIs REST** utilizando fetch()  
4. **Implementar funcionalidades web modernas** como cámara (getUserMedia) y geolocalización  
5. **Aplicar principios de UI/UX** con Tailwind CSS

---

**🏗️ ESTRUCTURA DEL PROYECTO**

**Archivos necesarios:**

* index.html - Estructura HTML de la SPA  
* app.js - Lógica JavaScript (el código proporcionado)  
* styles.css - Estilos adicionales (opcional)

**Configuración inicial:**

* **API Principal**: https://jsonplaceholder.typicode.com  
* **API de Geolocalización**: [https://www.openstreetmap.org/export/embed.html](https://www.openstreetmap.org/export/embed.html)  
* const mapUrl \= \`https://www.openstreetmap.org/export/embed.html?bbox=...\&marker=lat,{lng}\`;

---

**📝 PARTE 1: CONFIGURACIÓN Y NAVEGACIÓN (20 puntos)**

**Pregunta 1.1 (5 puntos)**

**Identifica las variables que conectan la navegación SPA.**

javascript  
*// Completa las siguientes variables con sus valores correctos:*  
const API \= '\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_';  
const PAGES \= {  
  *// Completa con todas las páginas del sistema*  
  'home': 'Inicio',  
  *// ... completa las demás*  
};

function getPageFromHash() {  
  *// Explica qué hace esta función*  
}

**Pregunta 1.2 (5 puntos)**

**Explica el funcionamiento de la navegación SPA:**

1. ¿Qué es el hash en una URL y por qué se usa en SPA?  
2. ¿Cómo se actualiza el título de la página dinámicamente?

**Pregunta 1.3 (10 puntos)**

**Implementa una nueva página llamada "Contacto" en la SPA:**

**Pasos a seguir:**

1. Agrega la entrada en el objeto PAGES  
2. Crea la sección HTML correspondiente  
3. Agrega un enlace en el menú de navegación  
4. Define la función loadContactData() que muestre un mensaje de contacto

---

**🎯 PARTE 2: PROMESAS BÁSICAS (25 puntos)**

**Pregunta 2.1 (10 puntos)**

**Analiza el código de **loadSinglePost()** y responde:**

javascript  
function loadSinglePost() {  
  *// 1\. ¿Qué método de Promise se está utilizando?*  
  *// 2\. ¿Cómo se maneja el error en esta función?*  
  *// 3\. ¿Qué hace el método .finally()?*  
  *// 4\. Explica el flujo de datos desde la API hasta la visualización*  
}

**Pregunta 2.2 (15 puntos)**

**Modifica la función **loadSinglePost()** para:**

1. Cargar **3 posts** (IDs 1, 3 y 5\) en lugar de solo el ID 1  
2. Mostrarlos en una lista vertical  
3. Si un post falla, mostrar un mensaje de error específico para ese post  
4. **Requerimiento especial**: Si todos los posts fallan, mostrar "No se pudieron cargar los posts"

**Pista**: Usa los métodos de Promise que creas convenientes.

---

**🔄 PARTE 3: PROMESAS AVANZADAS (25 puntos)**

**Pregunta 3.1 (15 puntos)**

**Completa la tabla comparativa de métodos de Promise:**

| Método | Comportamiento | ¿Cuándo se usa? | Ejemplo del código |
| :---- | :---- | :---- | :---- |
| Promise.all() |  |  |  |
| Promise.allSettled() |  |  |  |
| Promise.race() |  |  |  |
| Promise.any() |  |  |  |

**Pregunta 3.2 (10 puntos)**

**Crea una nueva función **loadUserWithTodos()** que:**

1. Obtenga un usuario específico (ID del input)  
2. Obtenga todos los todos de ese usuario  
3. Combine ambas respuestas en un solo objeto  
4. Muestre un resumen con: nombre del usuario, email, cantidad de todos completados y pendientes  
5. Implementa un timeout de 3 segundos usando Promise.race()

javascript  
*// Estructura sugerida:*  
function loadUserWithTodos() {  
  *// Tu código aquí*  
}

---

**🎥 PARTE 4: CÁMARA Y GEOLOCALIZACIÓN (15 puntos)**

**Pregunta 4.1 (7 puntos)**

**Responde sobre el código de la cámara:**

1. ¿Qué API se usa para acceder a la cámara?  
2. ¿Cómo se manejan los errores de permisos?  
3. ¿Qué hace exactamente el método canvas.toDataURL('image/png')?  
4. ¿Cómo se detiene la transmisión de video?

**Pregunta 4.2 (8 puntos)**

**Completa la función de geolocalización:**

javascript  
function initGeolocation() {  
  *// 1\. ¿Qué método se usa para obtener la ubicación?*  
  *// 2\. Escribe la URL correcta de la API de geolocalización:*  
  const mapUrl \= '\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_';  
    
  *// 3\. ¿Qué opciones de configuración se pasan al método de geolocalización?*  
  *// 4\. Explica cómo se manejan los códigos de error*  
}

---

**📊 PARTE 5: MÁQUINA DE ESTADOS Y REPORTES (15 puntos)**

**Pregunta 5.1 (7 puntos)**

**Analiza la máquina de estados del buscador:**

javascript  
const UI\_STATE \= Object.freeze({  
  IDLE: 'IDLE',  
  PENDING: 'PENDING',  
  FULFILLED: 'FULFILLED',  
  REJECTED: 'REJECTED'  
});

1. ¿Por qué se usa Object.freeze()?  
2. Describe el comportamiento de la UI en cada estado:

   * **IDLE**:  
   * **PENDING**:  
   * **FULFILLED**:  
   * **REJECTED**:

**Pregunta 5.2 (8 puntos)**

**Mejora el sistema de reportes agregando:**

1. Un nuevo botón "Exportar a CSV" que genere un archivo .csv  
2. Un selector de cantidad de registros (5, 10, 15, 20\)  
3. Un contador de tiempo de generación del reporte

**Pista**: Investiga new Blob() y URL.createObjectURL()

---

**🎨 PARTE 6: DESAFÍO FINAL (BONUS \- 10 puntos extra)**

**Desafío: Dashboard de Usuarios**

Crea una nueva página "Dashboard" que combine:

1. **Métricas** usando Promise.all() para obtener:

   * Total de usuarios  
   * Total de posts  
   * Total de comentarios  
   * Total de álbumes  
2. **Visualización** mostrando:

   * Tarjetas con cada métrica  
   * Top 3 usuarios con más posts  
   * Un post aleatorio destacado  
3. **Interactividad**:

   * Actualizar datos cada 30 segundos  
   * Animación de carga con la máquina de estados  
   * Manejo de errores elegante  
4. **Código**:

   * Crea la sección HTML para el dashboard  
   * Implementa la función loadDashboardData()  
   * Agrega la página al sistema de navegación

---

**📝 CRITERIOS DE EVALUACIÓN**

| Criterio | Puntaje |
| :---- | :---- |
| Configuración correcta de variables | 5 pts |
| Manejo de promesas básicas | 10 pts |
| Manejo de promesas avanzadas | 15 pts |
| Implementación de cámara y geolocalización | 10 pts |
| Máquina de estados | 7 pts |
| Sistema de reportes | 8 pts |
| Calidad del código y comentarios | 5 pts |
| Funcionalidad del desafío final (bonus) | 10 pts |
| **Total** | **60 pts \+ 10 bonus** |

---

**🔧 RECURSOS ADICIONALES**

**Documentación útil:**

* [MDN \- Promise](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise)  
* [JSONPlaceholder \- API Docs](https://jsonplaceholder.typicode.com/guide/)  
* [Tailwind CSS Docs](https://tailwindcss.com/docs)  
* [OpenStreetMap \- Embed](https://wiki.openstreetmap.org/wiki/Export)

**Variables clave del sistema:**

javascript  
*// API Principal*  
const API \= 'https://jsonplaceholder.typicode.com';

*// API de Geolocalización*  
const MAP\_URL \= 'https://www.openstreetmap.org/export/embed.html';

*// Estados de la UI*  
const UI\_STATE \= {  
  IDLE: 'IDLE',  
  PENDING: 'PENDING',  
  FULFILLED: 'FULFILLED',  
  REJECTED: 'REJECTED'  
};

---

**💡 CONSEJOS PARA LOS ESTUDIANTES**

1. **Lee todo el código** antes de empezar a escribir  
2. **Usa **console.log() para depurar y entender el flujo  
3. **Revisa la documentación** de cada método de Promise  
4. **Prueba cada función** individualmente antes de integrarla  
5. **Mantén el código limpio** con comentarios explicativos  
6. **Usa el inspector del navegador** para ver errores y respuestas

---

**✅ ENTREGA**

1. Archivo app.js completado con todas las modificaciones  
2. Archivo index.html actualizado con las nuevas secciones  
3. Documento con las respuestas a las preguntas teóricas  
4. **Opcional**: Captura de pantalla del dashboard funcionando

---

# 🟢 SOLUCIONES DEL TALLER

> Las respuestas teóricas y las referencias a las implementaciones en `app.js`/`index.html`.
> Cada parte se resuelve a medida que se implementa en el SPA. Se indica autor (rama) de cada bloque.

## ✅ PARTE 1: CONFIGURACIÓN Y NAVEGACIÓN — Solución

### Pregunta 1.1 — Variables de navegación SPA

```javascript
// API principal usada por todas las peticiones fetch()
const API = 'https://jsonplaceholder.typicode.com';

const PAGES = {
  home: 'Inicio',
  'promise-basica': 'Promise básica',
  'promise-array': 'Promise + array',
  'promise-all': 'Promise.all',
  'promise-allsettled': 'Promise.allSettled',
  'promise-race': 'Promise.race',
  'promise-any': 'Promise.any',
  'maquina-estados': 'Máquina de Estados',
  videos: 'Videos',
  reportes: 'Reportes',
  geolocalizacion: 'Geolocalización',
  contacto: 'Contacto',
  dashboard: 'Dashboard'
};

// Devuelve la página actual leyendo el hash de la URL; si no hay hash
// asume 'home'. Es la "fuente de verdad" de la navegación por hash.
function getPageFromHash() {
  const hash = window.location.hash.replace('#', '') || 'home';
  return hash;
}
```

**Explicación de `getPageFromHash()`:** lee `window.location.hash`, le quita el carácter `#` inicial y, si la URL no trae hash (por ejemplo al entrar por primera vez), devuelve `'home'` como valor por defecto. Toda la navegación de la SPA depende de este valor.

### Pregunta 1.2 — Funcionamiento de la navegación SPA

**1. ¿Qué es el hash en una URL y por qué se usa en SPA?**

El **hash** es la parte de la URL que va después del símbolo `#` (p. ej. `#promise-all`). No se envía al servidor y **no recarga la página** al cambiar. Por eso es ideal para SPAs: permite tener "rutas" (indicadores de estado) manipulables con el botón *atrás/adelante* del navegador, sin volver a pedir el documento al servidor. Al cambiar el hash se dispara el evento `hashchange`, que la SPA escucha para mostrar la sección correspondiente.

**2. ¿Cómo se actualiza el título de la página dinámicamente?**

`updatePageTitle()` busca el elemento `<h2 id="page-title">`, consulta la página activa con `getPageFromHash()`, busca su nombre en el objeto `PAGES` y asigna ese texto con `titleEl.textContent = title;`. Cuando cambia el hash, `handleRoute()` llama a `updatePageTitle()` para refrescar el encabezado.

### Pregunta 1.3 — Página "Contacto" (implementada ✅)

Se implementó completa en `index.html` y `src/app.js`:

1. **Entrada en `PAGES`**: `contacto: 'Contacto'`.
2. **Sección HTML**: `<section id="page-contacto">` con un grid y el contenedor `#contact-list`.
3. **Enlace en el menú**: `<a href="#contacto" data-page="contacto">📇 Contacto</a>`.
4. **Función `loadContactData()`**: consume `GET /users` con `fetch()` y renderiza fichas de contacto mediante `.map()`, mostrando además un contador `#contact-count`.

## ✅ PARTE 2: PROMESAS BÁSICAS — Solución

### Pregunta 2.1 — Análisis de `loadSinglePost()`

1. **¿Qué método de Promise se está utilizando?** En la implementación final se usa el patrón de cadena de una Promise: `fetch()` devuelve una Promise y se encadenan `.then()`, `.catch()` y `.finally()`. Además, para cargar varios posts de forma independiente se combina con `Promise.allSettled()` (ver 2.2).
2. **¿Cómo se maneja el error?** Con el bloque `.catch()`. Dentro del `.then()` también se lanza un `Error` manual si `!response.ok`, para que el `catch` central capture fallos HTTP (no solo de red).
3. **¿Qué hace el método `.finally()`?** Se ejecuta siempre, haya éxito o error. Aquí se usa para registrar en consola el fin del proceso. Es ideal para limpiar indicadores de carga.
4. **Flujo de datos:** `fetch(URL)` → la API responde → `.then()` comprueba `response.ok` → `response.json()` convierte el cuerpo a objeto JS → se procesa el objeto y se inyecta en el DOM (innerHTML). Si algo falla en cualquier paso, salta al `.catch()`.

### Pregunta 2.2 — Modificación a 3 posts (implementada ✅)

Se modificó `loadSinglePost()` para:

1. **Cargar 3 posts (IDs 1, 3 y 5)** con `const postIds = [1, 3, 5]`.
2. **Lista vertical** (cada post es un bloque apilado con `mb-3`).
3. **Error específico por post**: se usa `Promise.allSettled()` sobre el arreglo de peticiones. Cada resultado con `status === 'rejected'` se muestra como "Post ID X: no se pudo cargar." sin detener el renderizado de los que sí cargaron.
4. **Requerimiento especial**: si `successful.length === 0` (ninguno se cumplió) se muestra **"No se pudieron cargar los posts"**.

```javascript
// Núcleo de la solución
const requests = postIds.map(id =>
  fetch(`${API}/posts/${id}`).then(response => {
    if (!response.ok) throw new Error(`Post ${id}: error HTTP ${response.status}`);
    return response.json();
  })
);
Promise.allSettled(requests).then(results => {
  const successful = results.filter(r => r.status === 'fulfilled');
  if (successful.length === 0) {
    container.innerHTML = '<p class="text-red-400">No se pudieron cargar los posts</p>';
    return;
  }
  // ... render de cada resultado (fulfilled o rejected)
});
```

> **Autor:** rama `jose` (josuel-munendez). Arrastrado a `develop` y `main` en la integración GitFlow.


