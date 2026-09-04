# Clase 6 - 05/06/2026

## Capas de Seguridad y Formularios en Django

En esta clase profundizamos en las **capas de seguridad** de la aplicación Django y continuamos con la implementación de formularios y vistas.

### Capas de Seguridad

Vimos que es una mala práctica de diseño poner información sensible directamente en el código, ya que facilita al atacante vulnerar el sistema.

### Formularios de Django

Implementamos formularios en `forms.py`:
- **UserRegisterForm**: Hereda de `UserCreationForm` para registro de usuarios con campos personalizados.
- **RecordForm**: Hereda de `ModelForm` para el modelo Record.

Ambos formularios se configuraron con widgets de Bootstrap usando `attrs={"class": "form-control"}` y placeholders.

### Vistas Implementadas

En `views.py` desarrollamos:
- **home()**: Vista principal que lista registros y maneja login.
- **login_user()**: Vista dedicada para inicio de sesión.
- **logout_user()**: Vista para cerrar sesión.
- **register_user()**: Vista para registro de nuevos usuarios.
- **customer_record()**: Vista para mostrar detalle de un registro.
- **delete_record()**: Vista para eliminar registros.
- **update_record()**: Vista para actualizar registros.

### Estilo del Login

Implementamos un diseño de login dividido (split layout) con:
- Sección izquierda: Degradado azul con animación flotante.
- Sección derecha: Formulario de inicio de sesión.
- Diseño responsive que se apila en vertical en dispositivos móviles.
- Botón para mostrar/ocultar contraseña.

### Tabla de Registros

La tabla de registros en `home.html` incluye columnas para: Nombre, Apellido, Email, Teléfono, Dirección, Ciudad, Estado, Código Postal y Fecha de Creación, con diseño responsive para móviles que transforma las filas en tarjetas.
