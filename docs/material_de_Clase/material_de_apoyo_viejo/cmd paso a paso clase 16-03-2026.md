## 🛠 **TUTORIAL DE INSTALACIÓN: DJANGO + MYSQL + BOOTSTRAP (Windows)** 

## 📦 **1. Instalar Python** 

1.  Descarga e instala Python desde https://www.python.org/downloads/. 

2.  Durante la instalación, asegúrate de marcar **"Add Python  to PATH"** . 

## 🧰 **2. Instalar Virtualenv (opcional, recomendado)** 

```
 pip install virtualenv
```

## 🏗 **3. Crear y activar un entorno virtual** 

```
 # Crear una carpeta para tu proyecto
 mkdir inventario_django
 cd inventario_django
```

```
 # Crear entorno virtual
 python -m venv env
```

```
 # Activar entorno virtual (Windows)
 env\Scripts\activate
```

## 🌐 **4. Instalar Django** 

```
 pip install django
```

## 🗄 **5. Instalar MySQL y conector** 

## **A) Descargar e instalar MySQL Community Server:** 

Desde:  https://dev.mysql.com/downloads/mysql/ 

## **B) Instalar conector de MySQL para Python:** 

```
 pip install mysqlclient
```

Si tienes problemas con `mysqlclient` , usa este alternativo  más fácil: 

`pip install pymysql` 

Y luego en tu archivo `__init__.py` dentro de la carpeta  del proyecto Django: 

`import pymysql pymysql.install_as_MySQLdb()` 

## ⚙ **6. Crear proyecto y app Django** 

`django-admin startproject dcrm cd dcrm` 

`Se ejecuta con :` 

`python manage.py startapp website` 

`eejecutes python manage.py runserver` 

`configuración de settings.py` 

`DATABASES  =  { 'default' : { 'ENGINE' :  'django.db.backends.mysql' , 'NAME' :  'cliente' , 'USER' :  'root' , 'PASSWORD' :  'password123' , 'HOST' :  'localhost' , 'PORT' :  '3306' ,` 

`}` 

Creaamos el archivo 

Es una instalación rápida allí tenemos los demás elementos necesarios para la base de datos 

`# Install Mysql on your computer # https://dev.mysql.com/downloads/installer/ # pip install mysql # pip install mysql-connector # pip install mysql-connector-python # crear mas facil la base de datos` 

`import mysql . connector` 

`dataBase  = mysql . connector .connect (` 

_`host`_ `=  'localhost' ,` _`user`_ `=  'root' ,` _`passwd`_ `=  ''` 

`)` 

`# prepare a cursor object cursorObject  =  dataBase. cursor () # Create a database` 

`cursorObject. execute ( "CREATE DATABASE cliente" ) print ( "All Done!" )` 

ya con esto esta listo ahora haremos las migraciones 

## Python manage.py migrate Lo 

## (env) 

C:\Users\LILLYU\Documents\GitHub\CrudDjangoActualizado\Crud\dcrm>python manage.py migrate 

Ya listo debemos crear el usuario con el comando 

python manage.py createsuperuser 

## La clave es 123456 

Ejecutamos el proyecto 

(env) 

C:\Users\LILLYU\Documents\GitHub\CrudDjangoActualizado\Crud\dcrm>python manage.py runserver 

Ahora vamos a codificar  en la carpeta /dcrm/urls.py 

`from  django.contrib  import admin from  django.urls  import  path ,  include` 

`urlpatterns  =  [ path ( 'admin/' ,  admin.site.urls), path ( '' ,  include ( 'website.urls' )), ]` 

## Ahora vamos a la carpeta website/urls.py 

Ahora estaremos codificando las vistas 

Ruta de carpeta website/views 

`from  django.urls  import  path from  .  import views urlpatterns  =  [ path ( '' , views .home ,` _`name`_ `= 'home' ), ] si no funciono es asi` 

Luego crear la ruta de website/templates/home.html 

Crear una prueba 

Para ha `< h1 > hola este es un ensayo</ h1 >` 

Puedes mas adelante hacer pruebas: 

`{% extends 'base.html' %}` 

`{% block content %}` 

`< h1  class = "text-center" >Welcome to Django CRM parce</ h1 >` 

`{% endblock %}` 

Se ejecuta de la siguiente manera 

PS C:\Users\LILLYU\Documents\GitHub\CrudDjangoActualizado\Crud\dcrm> python manage.py runserver 

## Creamos el archivo de base.html 

`<! doctype  html >` 

`< html  lang = "en" >` 

`< head >` 

`< meta  charset = "utf-8" >` 

`< meta  name = "viewport"  content = "width=device-width,  initial-scale=1" >` 

`< title >Django CRM</ title >` 

`< link` 

`href = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.cs s"  rel = "stylesheet"` 

`integrity = "sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F 9CUG65"  crossorigin = "anonymous" >` 

`</ head >` 

`< body >` 

`{% include 'navbar.html' %}` 

`< div  class = "container" >` 

`< br />` 

`{% block content %}` 

`{% endblock %}` 

`</ div >` 

`< script` 

`src = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.m in.js"` 

`integrity = "sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuo Jl+0I4"  crossorigin = "anonymous" ></ script >` 

`</ body >` 

`</ html >` 

Se busca un estilo en bootstrapp 

Creamos el website/templates/navbar.html 

`< nav  class = "navbar navbar-expand-lg navbar-dark bg-dark" >` 

`< div  class = "container-fluid" >` 

`< a  class = "navbar-brand"  href = "{% url 'home' %}" >Django  CMR</ a >` 

`< button  class = "navbar-toggler"  type = "button"  data-bs-toggle = "collapse" data-bs-target = "#navbarSupportedContent"` 

`aria-controls = "navbarSupportedContent"  aria-expanded = "false"` 

`aria-label = "Toggle navigation" >` 

`< span  class = "navbar-toggler-icon" ></ span >` 

`</ button >` 

`< div  class = "collapse navbar-collapse"  id = "navbarSupportedContent" >` 

`< ul  class = "navbar-nav me-auto mb-2 mb-lg-0" >` 

`< li  class = "nav-item" >` 

`< a  class = "nav-link"  href = "#" >Link</ a >` 

`</ li >` 

`</ ul >` 

`</ div > </ div > </ nav >` 

## Resultado: 

## Creación de login: 

## Regresarnos a website/views.py 

`# Importa la función render, que permite combinar una plantilla HTML con datos y devolver una respuesta HTTP.` 

`from  django.shortcuts import  render` 

`# Importa funciones para autenticación de usuarios:` 

`# - authenticate: verifica credenciales. # - login: inicia sesión.` 

`# - logout: cierra sesión.` 

`from  django.contrib . auth import  authenticate ,  login ,  logout` 

`# Importa el sistema de mensajes de Django para mostrar notificaciones al usuario.` 

`from  django.contrib  import messages` 

`# Aquí se deben crear las vistas de la aplicación. # Esta función define la vista principal (home) del sitio.` _`def`_ `home (` _`request`_ `): # Renderiza la plantilla 'home.html' y la retorna  como respuesta HTTP. # No se pasan datos adicionales al contexto (diccionario  vacío). return  render (` _`request`_ `,  'home.html' , {})` 

con esta configuración usted debe iniciar el servidor 

luego en el navegador escribir 

http://127.0.0.1:8000/admin/ 

debe aparecer: 

http://127.0.0.1:8000/admin/login/?next=/admin/ 

No tengo usuario y  clave así que la creo con 

python manage.py createsuperuser 

## Le da Y el usuario es lilliana 

## Clave 123456 en mi caso 

## Agregamos en la ruta Regresarnos a website/views.py 

## _`def`_ `home (` _`request`_ `):` 

`# Renderiza la plantilla 'home.html' y la retorna  como respuesta HTTP. # No se pasan datos adicionales al contexto (diccionario  vacío).` 

`return  render (` _`request`_ `,  'home.html' , {})` 

_`def`_ `login_user (` _`request`_ `):` 

`pass` _`def`_ `logout_user (` _`request`_ `): pass` 

luego vamos a website/urls.py 

`from  django.urls  import  path from  .  import views urlpatterns  =  [ path ( '' , views .home ,` _`name`_ `= 'home' ), #path('login/', views.login_user, name='login'), path ( 'logout/' , views .logout_user ,` _`name`_ `= 'logout' ), ]` 

## Ahora vamos a template/home.html 

## Estaremos usando Bootstrap para le formulario 

Hacemos unos ajustes para que funcione el html 

`{% extends 'base.html' %} {% block content %} < div  class = "col-md-6 offset-md-3" >` 

`{% if user.is_authenticated %}` 

`< h1  class = "text-center" >` 👋 `Welcome` 👋 `</ h1 >` 

`{% else %}` 

`< h1  class = "text-center" >` 🔐 `Ingresar al sistemas` 👤 `</ h1 >` 

`< form  method = "POST"  action = "{% url 'home' %}" >` 

`{% csrf_token %} < br />` 

`< div  class = "mb-3" >` 

`< input  type = "text"  class = "form-control"  name = "username" placeholder = "Username"  required >` 

`</ div > < br />` 

`< div  class = "mb-3" > < input  type = "password"  class = "form-control"  name = "password" placeholder = "Password"  required  /> </ div >` 

`< button  type = "submit"  class = "btn btn-secondary" >login</ button > </ form > </ div > {% endif %} {% endblock %}` 

