# Paradigma de Programación Funcional (FP) aplicado a la SPA

Este documento describe cómo la SPA de Promesas aplica principios de **Programación Funcional** (FP) y de **Clean Code**, paradigmáticamente al desarrollo del módulo de promesas implementado en `src/app.js`.

> Nota: no es un paradigma OOP, por lo que **no se utilizan clases** y, en consecuencia, **no aplican diagramas UML de clases**. La documentación de arquitectura se apoya en diagramas **C4** y de **flujo (Mermaid)**.

## 1. Funciones puras y sin estado compartido

La mayor parte del renderizado se basa en **funciones puras**: dado el mismo argumento producen el mismo resultado y no modifican nada externo.

`src/app.js:33`
```javascript
function sanitizeHTML(raw) {
  if (typeof raw !== 'string') return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' };
  return raw.replace(/[&<>"']/g, match => map[match]);
}
```

- Es **determinista**: misma entrada → misma salida.
- No produce **efectos secundarios** (no toca variables del exterior ni el DOM).
- Se puede componer y probar de forma aislada.

## 2. Composición de funciones

Se encadenan transformaciones en lugar de imperar con bucles y estados mutables. El caso más claro es el patrón `fetch() -> .then() -> .map()`:

`src/app.js` — `loadUsersList`
```javascript
fetch(`${API}/users`)
  .then(response => { if (!response.ok) throw new Error(`Error HTTP ${response.status}`); return response.json(); })
  .then(users => container.innerHTML = users.map(user => `<div>...</div>`).join(''))
  .catch(error => showError('users-list', error.message));
```

- `fetch()` devuelve una **Promise** (valor futuro).
- `.then()` compone el siguiente paso.
- `.map()` transforma cada elemento de un array **sin mutarlo** (devuelve un array nuevo).

## 3. Inmutabilidad

- Los arreglos de datos (p. ej. `users`, `posts`) no se modifican; se transforman con `.map()` que devuelve **copias**.
- Los IDs que definen los posts a cargar se declaran como constantes:

```javascript
const postIds = [1, 3, 5];
```

- Se evita la mutación del DOM directa salvo en el punto final de renderizado (`innerHTML`), actuando así como una "salida" de la capa funcional.

## 4. Funciones de orden superior

`.map()`, `.filter()` y el encadenamiento de Promesas son funciones de **orden superior**: reciben y/o devuelven funciones.

`src/app.js` — `loadSinglePost` (aislamiento de fallos)
```javascript
const successful = results.filter(result => result.status === 'fulfilled');
if (successful.length === 0) {
  container.innerHTML = '<p class="text-red-400">No se pudieron cargar los posts</p>';
  return;
}
```

`filter()` selecciona los resultados cumplidos de forma declarativa, sin bucles `for` ni variables de acumulación.

## 5. Declaratividad sobre imperatividad

Se describe **qué** se quiere, no **cómo** hacerlo paso a paso:

- `.map()` → "transforma cada elemento".
- `.filter()` → "quédate con los que cumplen".
- `Promise.all()` / `Promise.allSettled()` → "espera a todos" / "revisa cada uno".

## 6. Manejo funcional de errores

En vez de lanzar y propagar excepciones manualmente por todo el programa, los fallos se encadenan a la composición con `.catch()` y se aíslan con `Promise.allSettled()`:

```javascript
const requests = postIds.map(id =>
  fetch(`${API}/posts/${id}`)
    .then(response => { if (!response.ok) throw new Error(`Post ${id}: error HTTP ${response.status}`); return response.json(); })
);

Promise.allSettled(requests).then(results => {
  // results: cada elemento es { status: 'fulfilled' | 'rejected', value | reason }
});
```

## 7. Clean Code en el módulo

- **Nombres descriptivos**: `loadSinglePost`, `loadUsersList`, `loadCombinedData`, `loadSettledPosts`, `sanitizeHTML`, `showLoading`, `showError`.
- **Funciones cortas y de una sola responsabilidad**: cada cargadora se encarga de *obtener + transformar + renderizar* su sección.
- **Comentarios de documentación por bloque temático**, no línea por línea (se explica el *porqué/patrón*, no se traduce el código).
- **Guardas tempranas** (`if (!container) return;`) para evitar errores cuando el DOM no está listo.

## 8. Tabla de funciones del módulo de promesas (autor: rama `jose`)

| Función | Patrón FP / Promise | Responsabilidad |
|---------|--------------------|-----------------|
| `loadSinglePost()` | `Promise.allSettled` + `filter()` | Carga 3 posts (1, 3, 5), aísla fallos y avisa si todos fallan |
| `loadUsersList()` | `fetch` + `.map()` + `.join()` | Renderiza lista de usuarios |
| `loadCombinedData()` | `Promise.all` (paralelismo) | Combina post + autor + comentarios (todo-o-nada) |
| `loadSettledPosts()` | `Promise.allSettled` | 5 posts que nunca fallan en bloque |
| `loadContactData()` | `fetch` + `.map()` + `.join()` | Directorio de contactos (página Contacto) |

---

*Documentación técnica generada como parte del entregable del taller (Fase 3 del plan GitFlow).*
