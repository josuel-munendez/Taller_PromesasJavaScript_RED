# Clase 8 - 19/06/2026

## Type Hints, 4 Capas de Seguridad y Entrega Final

### Type Hints en Django
Aprendimos a usar type hints en las vistas de Django para mejorar la legibilidad y el mantenimiento del código:
```python
from typing import Any
from django.db.models import QuerySet
from django.http import HttpRequest, HttpResponse
from django.core.paginator import Page, Paginator
```
Se tiparon todas las vistas con anotaciones de tipo, incluyendo retornos `-> HttpResponse`, variables como `QuerySet[Any]`, `Page`, `str | None`, etc.

### 4 Capas de Seguridad

#### 1. Seguridad en la Red
- `SESSION_COOKIE_SECURE = True` - Cookies de sesión solo por HTTPS
- `CSRF_COOKIE_SECURE = True` - Cookies CSRF solo por HTTPS
- `SECURE_HSTS_SECONDS = 31536000` - HSTS por 1 año
- `SECURE_HSTS_INCLUDE_SUBDOMAINS = True`
- `SECURE_HSTS_PRELOAD = True`

#### 2. Seguridad en la Aplicación
- `SECURE_CONTENT_TYPE_NOSNIFF = True` - Evitar que el navegador adivine el tipo de contenido
- `SECURE_BROWSER_XSS_FILTER = True` - Filtro XSS del navegador
- `SecurityMiddleware` en MIDDLEWARE

#### 3. Seguridad en el Servidor
- `ALLOWED_HOSTS` para evitar ataques de host header
- `DEBUG = False` en producción

#### 4. Seguridad en la Base de Datos
- Contraseña segura
- Acceso solo desde IPs confiables
- Cifrado de datos en reposo y en tránsito

### Configuración de Sesiones
- `SESSION_COOKIE_AGE = 3000` - Duración de sesión (50 minutos)
- `SESSION_EXPIRE_AT_BROWSER_CLOSE = True`
- `SESSION_SAVE_EVERY_REQUEST = True`

### Migración a MySQL
Configuramos la base de datos MySQL en `settings.py` con motor `django.db.backends.mysql`, nombre `clientes`, usuario `root`, host `localhost`, puerto `3306`.

### Preparación de la Entrega Final
Se avizo de la entrega de la **lista de chequeo** del entregable final para dentro de 8 dias, completando todos los requisitos del proyecto: login con roles, CRUD completo, menú SPA, alertas, Bootstrap local, validación con expresiones regulares, 4 capas de seguridad, 20+ commits, README estructurado, diagramas PlantUML, patrones de diseño documentados y 8 bitácoras (resúmenes de clase).