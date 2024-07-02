# Entrenaly (backend)

Entrenaly es una aplicación diseñada para optimizar y simplificar las tareas de los entrenadores personales, permitiéndoles gestionar todos los aspectos de su trabajo en un solo lugar de manera fácil y eficiente. Con Entrenaly los entrenadores pueden administrar sus clientes con su información médica, elaborar planes de entrenamiento personalizados y asignándolos directamente a cada uno de ellos.

La aplicación también permite a los entrenadores añadir sus propios ejercicios con soporte multimedia, como GIFs o videos, para que los clientes puedan visualizar las demostraciones necesarias al revisar sus planes de entrenamiento.

Cada cliente tiene acceso a la aplicación donde puede ver todos sus planes asignados, facilitando así un seguimiento detallado y eficaz de su progreso.

![entrenalt-exercises view](https://github.com/juanuranidev/entrenaly-frontend/assets/96846723/dd4e706c-6e1d-4ac8-91d5-07fda6245003)

## Arquitectura del proyecto

Para la arquitectura del backend implementé una clean architecture, separando la aplicación en las siguientes capas:

- Domain
- Infraestructure
- Presentation
- Config

## Config

Dentro de la carpeta config encontraremos dos carpetas, adapters y envs.

Adapters:
Esta carpeta tiene como función principal adaptar cualquier librería externa que utilicemos dentro de nuestro proyecto para que su implementación no sea diréctamente del mismo sino que esté concentrada en una sola función. Si en un futuro necesitamos cambiar de libería para cumplir el mismo objetivo solamente deberemos reemplazar la lógica dentro de la función principal.

Envs:
En esta parte de nuestra aplicación es donde haremos la validación de que nuestras variables de entorno estén bien configuradas en nuestro proyecto y podamos importar a todas desde un mismo lugar.

## Domain

Dentro de la carpeta de domain podremos encontrar las siguientes carpetas, constants, dtos, entities, errors y repositories.

Constants:
Dentro de esta carpeta podremos encontrar todo el texto plano relacionado a nuestras entidads y datos de nuestra base de datos.

Dtos:
Los dtos o "Data Transfer Object" son objetos que se utilizan para encapsular la información y realizar validaciones o cualquier tipo de funcionalidad dentro de ella antes de recibirla o enviarla fuera del sistema. En nuestro software, los dtos se utilizan para encapsular y validar que la información recibida tanto para los Creates o Updates sea la correcta.

Entities:
Dentro de esta carpeta encontraremos todas las entidades de nuestro software, las cuales usaremos también como "Adapters" en caso de que querramos cambiar cualquier lógica dentro de la aplicación, así nos aseguraremos de devolver siempre lo mismo.

Errors:
Esta carpeta tiene como objetivo unificar el manejo de errores dentro de nuestra aplicación.

Repositories:
Dentro de esta carpeta tendremos una especie de "Template" sobre los repositories de nuestra infraestructure, es decir, definiremos cómo deberán estar conformados nuestros repositorios.

## Infraestructure

Dentro de la carpeta de Infraestructure podremos encontrar tanto la lógica de nuestra base de datos, ya sea migraciones, esquemas y seeds, así también como los repositorios que utilizaremos para interactuar con nuestra base de datos.

## Presentation

Dentro de la carpeta de Presentation encontraremos tanto las rutas como los controladores de cada entidad dentro de nuestro software, así mismo también encontraremos los middlewares necesarios que utilicemos. Además, encontraremos la lógica para poder levantar nuestra aplicación.

## Instalación

Para instalar y correr el proyecto de forma local sigue los siguientes pasos

#### Prerrequisitos

Antes de realizar la instalación, asegúrate de tener las siguientes herramientas configuradas:

- [Node.js](https://nodejs.org/) (version 18 o mayor)
- [Docker](https://www.docker.com/)

#### Pasos de instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/juanuranidev/entrenaly-backend
   ```
2. Navega hasta el directorio:
   ```bash
   cd entrenaly-backend
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Crea un archivo .env basado en el archivo .env.example y agrega tus variables de entorno:

   `PORT=`8081

   `NODE_ENV=`development

   `BUILD_COMMAND=`dev

   `POSTGRES_USER=`

   `POSTGRES_DB=`

   `POSTGRES_PORT=`

   `POSTGRES_PASSWORD=`

   `POSTGRES_URL=`

5. Levantar docker:
   ```bash
   docker compose up --build
   ```
6. Cargar datos iniciales
   ```bash
   docker compose exec server npm run db:seed
   ```

## Sobre mi

Proactivo, creativo y apasionado por el desarrollo de aplicaciones innovadoras. Con más de dos años de experiencia profesional como desarrollador de software, disfruto especialmente de la creación de aplicaciones de uso diario y de la arquitectura de software. Actualmente estoy cursando la carrera de Ingeniería en Software en la Universidad Siglo 21, lo que refuerza mi compromiso con el crecimiento contínuo y la evolución hacia una carrera sólida en ingeniería y arquitectura de software.

Puedes ver mi portafolio en el siguiente link:

https://juanurani.netlify.app/

Conectemos en LinkedIn:

https://www.linkedin.com/in/juanurani/

## License

MIT License

Copyright (c) [2024] [Juan Urani]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
