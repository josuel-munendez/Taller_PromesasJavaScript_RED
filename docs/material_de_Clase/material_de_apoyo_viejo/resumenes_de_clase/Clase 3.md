# Clase 3 - 15/05/2026

## Jose Manuel Muñoz Fernández

Se nos dio la bienvenida a la clase y se dijo que a las 5 iba a hacer ruleta para la revisión de las bitácoras con los resúmenes.

Luego nos habló del hackaton, y de que va a servir como una experiencia de preparación profesional, un buen proyecto profesional para el github y una presentación a futuras empresas y empresarios interesados tanto para prácticas como para un trabajo en el futuro.

Me reiniciaron el computador y actualizaron a Windows 11 entonces se me borraron casi todos los archivos y aplicaciones, así que perdí tiempo de clase instalando y configurando.

La instructora nos empezó a explicar los temas que vamos a empezar a programar hoy.

### Tipos de inyección de código
La clase se centró en los tipos más comunes de inyección en el código:
- **Inyección SQL (SQLi)**: El atacante inserta comandos SQL en las consultas de la base de datos a través de los campos de entrada. Permite leer, modificar o borrar información confidencial.
- **XSS (Cross-Site Scripting)**: Se inyectan scripts maliciosos (generalmente JavaScript) en páginas web vistas por otros usuarios.
- **Inyección de Comandos (OS Command Injection)**: El atacante ejecuta comandos arbitrarios del sistema operativo en el servidor.
- **Inyección LDAP**: Dirigida a aplicaciones que usan servicios de directorio.
- **Inyección HTML**: Inserta código HTML malicioso para alterar la apariencia de una web.
- **Inyección de Código/Scripting**: Ocurre cuando la aplicación pasa datos no validados a funciones que ejecutan código.
- **Inyección CRLF**: Utiliza caracteres de retorno de carro y salto de línea para manipular cabeceras HTTP.
- **Inyección XPath**: Similar a SQLi pero para documentos XML.

### Medidas de prevención
- Validación y saneamiento de entradas
- Consultas parametrizadas (sentencias preparadas)
- Escapado de caracteres especiales

### Implementación en Django
Vimos cómo crear formularios en Django con `forms.py`:
- `UserRegisterForm` usando `UserCreationForm`
- `RecordForm` usando `ModelForm`
- Configuración de widgets con Bootstrap classes

### Modelo Record
```python
class Record(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=100)
    phone_number = models.CharField(max_length=15)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=10)
```

### Estructura HTTP
Aprendimos los componentes de una solicitud HTTP:
- Línea de solicitud (método, URL, versión)
- Encabezados (Headers)
- Cuerpo (Body)

Y los métodos HTTP más comunes: GET, POST, PUT, PATCH, DELETE.

### Código de vistas
Implementamos las funciones `register_user` y `home` en `views.py` con la lógica completa de autenticación, registro de usuarios y manejo de sesiones.
