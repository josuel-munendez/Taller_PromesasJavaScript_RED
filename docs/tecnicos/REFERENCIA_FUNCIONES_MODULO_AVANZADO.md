# Referencia de funciones del módulo avanzado (rama `manrique`)

Documento técnico complementario a `MODULO_AVANZADO_Y_DASHBOARD.md`. Lista y
clasifica las funciones del módulo avanzado que implementa la rama `manrique`
(bajo un enfoque de **Programación Funcional** y **Clean Code**), en el mismo
estilo de `PARADIGMA_FUNCIONAL.md` (rama `jose`).

> Como el proyecto no es OOP, no aplican diagramas de clases; esta referencia
> se apoya en el patrón `fetch -> then -> map/filter/reduce` y en Promesas de
> selección y agregación.

## 1. Promesas de selección

| Función | Patrón Promise | Responsabilidad |
|---------|----------------|-----------------|
| `loadRaceResult()` | `Promise.race` + fábrica de timeout | Compite la API contra un temporizador de 2 s y muestra al ganador |
| `loadAnyResult()` | `Promise.any` + `AggregateError` | Primer éxito de 3 endpoints; aviso si todas fallan |

## 2. UI reactiva y máquina de estados

| Función | Patrón | Responsabilidad |
|---------|--------|-----------------|
| `initSearchIfNeeded()` | `Object.freeze` + HOF `setUI` | Máquina de estados IDLE/PENDING/FULFILLED/REJECTED del buscador |
| `setUI(state, msg)` | función pura declarativa | Aplica clases CSS y texto según el estado |

## 3. Multimedia y datos combinados

| Función | Patrón Promise | Responsabilidad |
|---------|----------------|-----------------|
| `initVideos()` | `getUserMedia()` (Promise) | Iniciar/detener cámara y capturar foto a `canvas` |
| `loadUserWithTodos()` | `Promise.all` + `Promise.race` (timeout 3 s) | Usuario + sus tareas con resumen de completadas/pendientes |

## 4. Reportes y exportación CSV

| Función | Patrón FP | Responsabilidad |
|---------|-----------|-----------------|
| `initReports()` | pipeline de datos | Selector ¿limit?, cronómetro y exportación |
| `csvCell(value)` | función pura | Escapa un campo para CSV |
| `rowsToCsv(rows, headers)` | `map` + `join` | Convierte filas en texto CSV |

## 5. Dashboard en vivo

| Función | Patrón Promise | Responsabilidad |
|---------|----------------|-----------------|
| `loadDashboardData()` | `Promise.all` (4 peticiones) + `reduce`/`sort`/`slice` | Métricas agregadas, top 3 usuarios y post destacado |
| `initDashboard()` | `setInterval` guardado | Autorefresco de 30 s sin duplicar intervalos |

## 6. Ubicación

| Función | Patrón Promise | Responsabilidad |
|---------|----------------|-----------------|
| `initGeolocation()` | `navigator.geolocation` (callback/Promise) | Geolocaliza al usuario y muestra coordenadas |

---

*Documentación técnica del módulo avanzado. Entregable del taller (Fase 3 del plan GitFlow).*
