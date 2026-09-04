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

# 🟢 SOLUCIONES PARTES 3–6 (autor: rama `manrique` — ManriBOT)

> Las partes 1–2 son resueltas por la rama `jose`; aquí se responden las
> partes 3 a 6 (Promesas avanzadas, cámara/geolocalización, máquina de
> estados/reportes y el desafío final). Cada funcionalidad está implementada
> en `src/app.js` e `index.html`.

## ✅ PARTE 3: PROMESAS AVANZADAS — Solución

### Pregunta 3.1 — Tabla comparativa de métodos

| Método | Comportamiento | ¿Cuándo se usa? | Ejemplo del código |
|--------|----------------|------------------|--------------------|
| `Promise.all()` | Espera a que **todas** se cumplan; si una rechaza, todo rechaza (todo-o-nada) | Cuando se necesitan varios datos y cualquiera es imprescindible | `loadCombinedData()` (post + autor + comentarios) |
| `Promise.allSettled()` | Espera a que **todas** lleguen a un estado final (cumplidas o fallidas); **nunca rechaza** | Cuando se quiere revisar cada resultado por separado sin que un fallo detenga el resto | `loadSinglePost()`/`loadSettledPosts()` |
| `Promise.race()` | Resuelve/rechaza con la **primera** que llegue a un estado final | Timeouts o "la primera respuesta cuenta", gane o pierda | `loadRaceResult()` (API vs temporizador 2 s) |
| `Promise.any()` | Resuelve con la **primera que se cumpla**; solo rechaza si todas fallan | Cuando basta el primer éxito | `loadAnyResult()` (3 endpoints) |

### Pregunta 3.2 — `loadUserWithTodos()` (implementada ✅)

Función que obtiene un usuario y sus todos, los combina y muestra un resumen con timeout de 3 s mediante `Promise.race()`:

```javascript
const apiPromise = Promise.all([
  fetch(`${API}/users/${userId}`).then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); }),
  fetch(`${API}/users/${userId}/todos`).then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
]);
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('⏱ Tiempo agotado (3s).')), 3000)
);
const [user, todos] = await Promise.race([apiPromise, timeout]);
```

Renderiza tarjetas con **nombre, email, completadas, pendientes y total**. El widget está en la sección de Máquina de Estados (`#utd-user-id`, `#utd-load-btn`, `#utd-result`).

## ✅ PARTE 4: CÁMARA Y GEOLOCALIZACIÓN — Solución

### Pregunta 4.1 — Código de la cámara (`initVideos`)

1. **¿Qué API se usa?** `navigator.mediaDevices.getUserMedia()` que devuelve una Promise con el stream.
2. **¿Cómo se manejan los errores de permisos?** Con `try/catch`: si `getUserMedia` no existe o el permiso se deniega, se muestra un mensaje en `#photo-status`.
3. **¿Qué hace `canvas.toDataURL('image/png')`?** Convierte lo dibujado en el canvas a una cadena en formato PNG (data URL), que puede usarse como `src` de una imagen o descargarse.
4. **¿Cómo se detiene la transmisión?** Con `stream.getTracks().forEach(track => track.stop())` y luego `video.srcObject = null`.

### Pregunta 4.2 — Geolocalización (`initGeolocation`)

1. **¿Qué método se usa?** `navigator.geolocation.getCurrentPosition(success, error, options)`.
2. **URL correcta de la API de mapa:**
   ```javascript
   const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;
   ```
3. **Opciones de configuración:** `{ enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }`.
4. **Cómo se manejan los códigos de error:** en el callback de error se usa `switch (error.code)` para `PERMISSION_DENIED`, `POSITION_UNAVAILABLE` y `TIMEOUT`, mostrando un mensaje específico en `#geo-error`.

## ✅ PARTE 5: MÁQUINA DE ESTADOS Y REPORTES — Solución

### Pregunta 5.1 — Máquina de estados del buscador (`initSearchIfNeeded`)

1. **¿Por qué se usa `Object.freeze()`?** Para que el objeto de estados sea inmutable y no se pueda modificar accidentalmente en tiempo de ejecución (protege contra errores de tipeo que mutarían las constantes).
2. **Comportamiento de la UI por estado:**
   - **IDLE**: reposo, botón "Buscar" habilitado, sin mensaje de estado.
   - **PENDING**: mientras se busca, el botón se **deshabilita** y muestra "Buscando...", con spinner y mensaje amarillo.
   - **FULFILLED**: éxito; mensaje verde con la cantidad de posts y se renderizan los resultados.
   - **REJECTED**: error o ID inválido; mensaje rojo y se limpia la lista de resultados.

### Pregunta 5.2 — Sistema de reportes mejorado (implementado ✅)

Se agregó a la sección de Reportes:
1. **Boton "Exportar a CSV"** (`#export-csv`): genera un `.csv` desde las filas estructuradas del último reporte con `new Blob()` + `URL.createObjectURL()`.
2. **Selector de cantidad de registros** (`#report-limit` con 5, 10, 15, 20) usado como `?_limit` en cada petición.
3. **Contador de tiempo de generación** (`#report-time`) que mide con `performance.now()` los milisegundos que tarda cada generador.

## ✅ PARTE 6: DESAFÍO FINAL / DASHBOARD (bonus, implementado ✅)

`loadDashboardData()` + `initDashboard()`:
- **Métricas con `Promise.all()`**: total de usuarios, posts, comentarios y álbumes.
- **Visualización**: tarjetas con cada métrica, top 3 usuarios con más posts (con `reduce()` + `sort()`) y un post aleatorio destacado.
- **Interactividad**: autorefresco cada 30 s con `setInterval`, estados `PENDING/FULFILLED/REJECTED` y manejo elegante de errores.
- **Código**: sección HTML `#page-dashboard`, función `loadDashboardData()`, entrada en `PAGES` y enlace `#dashboard` (routing SPA).


