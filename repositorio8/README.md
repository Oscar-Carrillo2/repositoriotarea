# Demostrador de tecnología Node.js

El siguiente código muestra distintas características de la programación con node.js. 

Se abarcan ejemplos basados en la modularización, tratamiento de la asincronicidad, etc.

El proyecto está dividido en etapas (tags en git), por lo que mediante la instrucción "git checkout step-0" hasta el step-21 podréis ver los distintos pasos para construir aplicaciones en node.js. La descripción de los cambios relevantes de cada paso está en la descripción del commit correspondiente.

A partir del step-10, se crea una pagina web que accede a un api (mediante un sdk que también generaremos), y que es un ejemplo clásico de chat, con histórico de mensajes (para lo que se emplea una base de datos MongoDB, necesario a partir del paso 16).


## Ejemplos disponibles en el repositorio (por tag)

* **step-0** primer ejemplo
* **step-1** lo mismo pero escribo "bien"
* **step-2** simulamos latencia para ver como se comporta asíncronamente (desorden)
* **step-3** detectamos que la asincronicidad produce un efecto extraño
* **step-4** incluimos un callback para detectar cuando se ha procesado cada elemento
* **step-5** control de la ejecución en paralelo con la librería async, solucionamos el problema del paso 3
* **step-6** aplanamos el código para que sea mas mantenible
* **step-7** hacemos un ejemplo real que descarga webs de resultado de busqueda y almacena el html en disco
* **step-8** creamos moculos para que nuestro codigo quede más claro
* **step-10** Reiniciamos el proyecto: vamos a empezar con la web
* **step-11** Creamos un servidor web
* **step-12** Creamos un servidor web usando el framework express
* **step-13** Creamos el api, y el mock de respuesta (get y post de mensajes del chat)
* **step-14** Modularizamos el router del api y el test-mock
* **step-15** Creamos un middleware de autorización (securizamos el api) y los controladores
* **step-16** Añadimos MongoDB para almacenar los datos de forma real
* **step-17** Creamos la web y el SDK de acceso al api, usando Jade como motor de plantillas
* **step-18** Añadimos algun maquetado extra para crear un marco de trabajo para publicar chats
* **step-19** Añadimos Socket.io para gestionar los eventos en tiempo real 
* **step-20** Añadimos muchos más eventos de ejemplo a Socket.io
* **step-21** Preparamos la configuración para desplegar en heroku



## Requisitos

### Node

Es necesario tener instalado Node.js para su ejecución

Las dependencias de cada paso pueden ser instaladas usando "npm install" en cualquiera de los pasos.

Documentación de instalación: [https://nodejs.org/download/](https://nodejs.org/download/)

### Mongo

Para que funcione la base de datos (a partir del step-16) es necesario tener instalado y en ejecución un motor de MongoDB.

Documentación de instalación: [http://docs.mongodb.org/manual/installation/](http://docs.mongodb.org/manual/installation/)

## Verlo en marcha

Podeis ver este ejemplo en marcha (mientras siga levantado) aqui [http://solu-chat.herokuapp.com/messages](http://solu-chat.herokuapp.com/messages)

## Documentos relacionados

Presentación: [http://slides.com/findemor](http://slides.com/findemor)

## Autor

El ejemplo es obra de: [@findemor](https://twitter.com/findemor)

Si bien incluye ejemplos del chat de la documentación oficial de node y socket.io
