**TALLER: APRENDIENDO PROMESAS Y APIS CON JAVASCRIPT**

*Nivel básico · Edad sugerida: 11 años · JavaScript Vanilla*

# **🎯 ¿Qué vamos a aprender?**

Imagina que le pides una pizza a una aplicación. Tú haces el pedido y no te quedas mirando la puerta durante 30 minutos. Mientras esperas, puedes hacer otras cosas. Una Promise (Promesa) funciona de una manera parecida: “Te prometo que voy a buscar la información. Cuando la tenga, te aviso si salió bien o si ocurrió un problema”.

Durante este taller aprenderás:

* Promesa básica  
* Promesa con listas  
* Promise.all()  
* Promise.allSettled()  
* Promise.race()  
* Promise.any()  
* Máquina de estados  
* async y await  
* Uso de cámara  
* Generación de reportes  
* Geolocalización

# **TALLER 1 — MI PRIMERA PROMESA**

🧠 Aprenderás a pedir información a Internet y esperar la respuesta.

## **🎯 Objetivo**

Completar la actividad siguiendo los pasos y comprender qué ocurre en cada uno.

## **👣 Paso a paso**

1\. Crear una función llamada loadSinglePost.

2\. Mostrar un mensaje de “Cargando...”.

3\. Utilizar fetch() para pedir el post número 1\.

4\. Esperar la respuesta.

5\. Comprobar si la respuesta fue correcta.

6\. Convertir la respuesta para trabajar con los datos.

7\. Buscar en la página el lugar donde mostrarás el post.

8\. Mostrar título, contenido, ID e ID del autor.

9\. Si ocurre un error, mostrar un mensaje.

10\. Finalmente, informar en consola que la operación terminó.

## **🧩 Preguntas**

* ¿Qué pasa mientras esperamos la respuesta?  
* ¿Qué significa que una Promesa esté pendiente?  
* ¿Qué sucede si Internet no responde?  
* ¿Para qué sirve .catch()?  
* ¿Para qué sirve .finally()?

## **⭐ Reto**

Cambia el número del post y prueba con 1, 2, 3 y 10\.

# **TALLER 2 — UNA PROMESA CON UNA LISTA**

🧠 Ahora vamos a pedir varios usuarios en lugar de uno.

## **🎯 Objetivo**

Completar la actividad siguiendo los pasos y comprender qué ocurre en cada uno.

## **👣 Paso a paso**

1\. Crear loadUsersList.

2\. Mostrar “Cargando usuarios...”.

3\. Realizar la petición.

4\. Esperar la respuesta.

5\. Convertir los datos.

6\. Recibir la lista.

7\. Recorrer la lista.

8\. Mostrar nombre, usuario, correo y empresa.

9\. Manejar errores.

10\. Informar al finalizar.

## **🧩 Preguntas**

* ¿Necesitas una función diferente para cada usuario?  
* ¿Por qué podemos recorrer una lista?

## **⭐ Reto**

Prueba con 3, 5 y 10 usuarios.

# **TALLER 3 — Promise.all()**

🧠 Tres personas pueden trabajar al mismo tiempo: una trae el post, otra el autor y otra los comentarios.

## **🎯 Objetivo**

Completar la actividad siguiendo los pasos y comprender qué ocurre en cada uno.

## **👣 Paso a paso**

1\. Crear la petición del post.

2\. Crear la petición del autor.

3\. Crear la petición de comentarios.

4\. Guardar las tres Promesas.

5\. Colocarlas dentro de Promise.all().

6\. Esperar los tres resultados.

7\. Mostrar título, autor y comentarios.

## **🧩 Preguntas**

* ¿Qué pasa si una de las tres operaciones falla?  
* ¿Por qué es útil trabajar al mismo tiempo?

## **⭐ Reto**

Haz que una petición tenga una dirección incorrecta y observa el resultado.

# **TALLER 4 — Promise.allSettled()**

🧠 Aprenderás a revisar qué operaciones funcionaron y cuáles fallaron.

## **🎯 Objetivo**

Completar la actividad siguiendo los pasos y comprender qué ocurre en cada uno.

## **👣 Paso a paso**

1\. Crear una lista de IDs.

2\. Incluir IDs correctos y uno incorrecto.

3\. Crear una Promesa para cada ID.

4\. Utilizar Promise.allSettled().

5\. Esperar todos los resultados.

6\. Revisar cada resultado.

7\. Identificar fulfilled como éxito.

8\. Identificar rejected como fallo.

9\. Mostrar ambos resultados.

## **🧩 Preguntas**

* ¿Cuál es la diferencia entre fulfilled y rejected?  
* ¿Qué ventaja tiene revisar cada resultado?

## **⭐ Reto**

Usa 3 IDs correctos y 2 incorrectos.

# **TALLER 5 — Promise.race()**

🧠 Dos tareas comienzan al mismo tiempo y gana la primera que termina.

## **🎯 Objetivo**

Completar la actividad siguiendo los pasos y comprender qué ocurre en cada uno.

## **👣 Paso a paso**

1\. Crear una petición a la API.

2\. Crear una Promesa que espere 2 segundos.

3\. Hacer que el temporizador produzca un error al terminar.

4\. Colocar ambas en Promise.race().

5\. Esperar al ganador.

6\. Mostrar el post si gana la API.

7\. Mostrar un aviso si gana el temporizador.

## **🧩 Preguntas**

* ¿Qué significa “gana la API”?  
* ¿Qué significa “gana el timeout”?

## **⭐ Reto**

Prueba con 1, 3 y 5 segundos.

# **TALLER 6 — Promise.any()**

🧠 Tenemos varias puertas y queremos entrar por la primera que esté disponible.

## **🎯 Objetivo**

Completar la actividad siguiendo los pasos y comprender qué ocurre en cada uno.

## **👣 Paso a paso**

1\. Crear tres peticiones.

2\. Colocarlas dentro de Promise.any().

3\. Esperar un resultado exitoso.

4\. Mostrar el post conseguido.

5\. Si todas fallan, mostrar un mensaje de error.

## **🧩 Preguntas**

* ¿Qué diferencia hay entre Promise.race() y Promise.any()?  
* ¿Qué ocurre si todas las opciones fallan?

## **⭐ Reto**

Haz que una o dos peticiones fallen y vuelve a probar.

# **TALLER 7 — LA MÁQUINA DE ESTADOS**

🧠 Una búsqueda puede estar esperando, funcionando, terminada correctamente o con error.

## **🎯 Objetivo**

Completar la actividad siguiendo los pasos y comprender qué ocurre en cada uno.

## **👣 Paso a paso**

1\. Identificar IDLE: no hacemos nada.

2\. Identificar PENDING: estamos buscando.

3\. Identificar FULFILLED: encontramos la información.

4\. Identificar REJECTED: ocurrió un error.

5\. Crear un buscador de posts por usuario.

6\. Desactivar el botón mientras busca.

7\. Mostrar el resultado o el error.

## **🧩 Preguntas**

* ¿Qué estado aparece mientras esperamos?  
* ¿Qué estado aparece cuando todo sale bien?  
* ¿Qué estado aparece cuando hay un error?

## **⭐ Reto**

Agrega un mensaje diferente para cada estado.

# **TALLER 8 — async Y await**

🧠 Aprenderás una forma sencilla de leer código que trabaja con Promesas.

## **🎯 Objetivo**

Completar la actividad siguiendo los pasos y comprender qué ocurre en cada uno.

## **👣 Paso a paso**

1\. Crear una función asíncrona.

2\. Recibir el ID del usuario.

3\. Verificar que el ID sea válido.

4\. Realizar la petición.

5\. Usar await.

6\. Esperar la respuesta.

7\. Convertir los datos.

8\. Mostrar los posts.

9\. Usar try para intentar la operación.

10\. Usar catch para capturar errores.

## **🧩 Preguntas**

* ¿Qué significa async?  
* ¿Qué significa await?  
* ¿Qué ventaja tiene try/catch?

## **⭐ Reto**

Compara mentalmente “cuando termine haz esto” con “espera el resultado”.

# **TALLER 9 — ENCENDER LA CÁMARA**

🧠 Aprenderás a solicitar permiso para usar la cámara y capturar una fotografía.

## **🎯 Objetivo**

Completar la actividad siguiendo los pasos y comprender qué ocurre en cada uno.

## **👣 Paso a paso**

1\. Crear botón Iniciar cámara.

2\. Crear botón Detener cámara.

3\. Crear botón Tomar foto.

4\. Comprobar si el navegador permite utilizar la cámara.

5\. Solicitar permiso.

6\. Mostrar la cámara.

7\. Obtener información de la cámara.

8\. Tomar una fotografía.

9\. Mostrarla en un canvas.

10\. Detener la cámara al terminar.

## **🧩 Preguntas**

* ¿Por qué el navegador pide permiso?  
* ¿Qué ocurre si elegimos No permitir?  
* ¿Por qué debemos apagar la cámara?

## **⭐ Reto**

Explica por qué la cámara es un recurso privado.

# **TALLER 10 — CREAR UN REPORTE**

🧠 Convertiremos información obtenida de una API en un reporte.

## **🎯 Objetivo**

Completar la actividad siguiendo los pasos y comprender qué ocurre en cada uno.

## **👣 Paso a paso**

1\. Crear botón para usuarios.

2\. Consultar usuarios.

3\. Crear un texto organizado.

4\. Mostrar el reporte.

5\. Crear botón para descargar.

6\. Crear botón para imprimir.

7\. Repetir el proceso con posts.

8\. Crear un reporte combinado.

## **🧩 Preguntas**

* ¿Qué información debería tener un reporte?  
* ¿Para qué sirve la fecha de generación?

## **⭐ Reto**

Agrega fecha y hora al reporte.

# **TALLER 11 — MI UBICACIÓN**

🧠 Aprenderás a obtener la ubicación del dispositivo.

## **🎯 Objetivo**

Completar la actividad siguiendo los pasos y comprender qué ocurre en cada uno.

## **👣 Paso a paso**

1\. Crear botón Obtener ubicación.

2\. Comprobar si el navegador permite geolocalización.

3\. Solicitar permiso.

4\. Esperar la respuesta.

5\. Obtener latitud.

6\. Obtener longitud.

7\. Obtener precisión.

8\. Mostrar los datos.

9\. Mostrar la ubicación en un mapa.

10\. Manejar los errores.

## **🧩 Preguntas**

* ¿Por qué se necesita permiso?  
* ¿Por qué la ubicación es información privada?

## **⭐ Reto**

Explica por qué nunca debes compartir tu ubicación con desconocidos.

# **🏆 RETO FINAL — SUPER EXPLORADOR DE APIS**

Construye una pequeña aplicación que reúna todo lo aprendido.

* Módulo 1 — Un post: mostrar un post individual.  
* Módulo 2 — Usuarios: mostrar cinco usuarios.  
* Módulo 3 — Información combinada: Post \+ Autor \+ Comentarios usando Promise.all().  
* Módulo 4 — Detective de errores: consultar varios posts usando Promise.allSettled().  
* Módulo 5 — Carrera: comprobar quién termina primero usando Promise.race().  
* Módulo 6 — Primer ganador: obtener el primer resultado exitoso usando Promise.any().  
* Módulo 7 — Buscador: buscar posts por usuario usando async/await.  
* Módulo 8 — Cámara: encender cámara y tomar una fotografía.  
* Módulo 9 — Reportes: generar y descargar información.  
* Módulo 10 — Mi ubicación: mostrar la ubicación del dispositivo.

# **🧠 TABLA PARA RECORDAR**

| Herramienta | Explicación para niños |
| :---- | :---- |
| Promise | Una promesa de que llegará una respuesta |
| .then() | Cuando termine, haz esto |
| .catch() | Si algo sale mal, haz esto |
| .finally() | Pase lo que pase, haz esto al final |
| async | Esta función trabaja con Promesas |
| await | Espera el resultado |
| Promise.all() | Esperar a que todos terminen |
| Promise.allSettled() | Revisar cómo terminó cada uno |
| Promise.race() | Gana el primero que termine |
| Promise.any() | Gana el primero que tenga éxito |
| fetch() | Pedir información a Internet |
| API | Un servicio que nos entrega información |
| try/catch | Intentar algo y atrapar errores |
| getUserMedia() | Pedir acceso a cámara o micrófono |
| Geolocalización | Obtener la ubicación del dispositivo |

# **🎮 FORMA DE EVALUACIÓN**

⭐ 1 punto: realizó la actividad.

⭐ 1 punto: explicó qué hizo.

⭐ 1 punto: modificó el ejemplo.

⭐ 1 punto: resolvió el reto.

⭐ 1 punto: respondió las preguntas.

Total: 5 puntos por taller.