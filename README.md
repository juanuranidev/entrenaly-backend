- Español
  - [Sobre Entrenaly](#sobre-entrenaly)
  - [Arquitectura del software](#arquitectura-del-software)
    - [Config](#config)
    - [Domain](#domain)
    - [Infraestructure](#infraestructure)
    - [Presentation](#presentation)
  - [Instalación](#instalación)
    - [Prerrequisitos](#prerrequisitos)
    - [Pasos de instalación](#pasos-de-instalación)
  - [Sobre mi](#sobre-mi)
  - [Licencia](#licencia)
- English
  - [About Entrenaly](#about-entrenaly)
  - [Software architecture](#software-architecture)
    - [Config](#config-en)
    - [Domain](#domain-en)
    - [Infrastructure](#infrastructure-en)
    - [Presentation](#presentation-en)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Installation steps](#installation-steps)
  - [About me](#about-me)
  - [License](#license)


## Sobre Entrenaly

Entrenaly es una aplicación diseñada para optimizar y simplificar las tareas de los entrenadores personales, permitiéndoles gestionar todos los aspectos de su trabajo en un solo lugar de manera fácil y eficiente. Con Entrenaly los entrenadores pueden administrar sus clientes con su información médica, elaborar planes de entrenamiento personalizados y asignarlos directamente a cada uno de ellos.

La aplicación también permite a los entrenadores añadir sus propios ejercicios con soporte multimedia, como GIFs o videos, para que los clientes puedan visualizar las demostraciones necesarias al revisar sus planes de entrenamiento.

Cada cliente tiene acceso a la aplicación donde puede ver todos sus planes asignados, facilitando así un seguimiento detallado y eficaz de su progreso.

![entrenalt-exercises view](https://github.com/juanuranidev/entrenaly-frontend/assets/96846723/dd4e706c-6e1d-4ac8-91d5-07fda6245003)

---

## Arquitectura del software

Para la arquitectura del backend implementé una clean architecture, separando la aplicación en las siguientes capas:

- Domain
- Infraestructure
- Presentation
- Config

### Config

Dentro de esta carpeta encontraremos configuraciones escenciales para nuestro software, desde adapters que nos facilitan el trabajo con librerías externas hasta variables importantes del software. A continuación explicaremos las distintas carpetas dentro de Config:

**Adapters**  
Esta carpeta tiene como función principal concentrar la implementación de cualquier librería externa que utilicemos dentro de nuestro software para que su implementación no sea diréctamente dentro del mismo, sino que esté protegida por una función la cual utilizaremos en lugar de la librería.

Ejemplo de un adapter  
```
import { v4 as uuidv4 } from "uuid";

export const uuidAdapter = {
  generate: (): string => {
    return uuidv4();
  },
};
```

Si en un futuro necesitamos cambiar de libería para cumplir el mismo objetivo solamente deberemos reemplazar la lógica dentro del adapter y no en todos los lugares donde se haya implementado.

**Envs**  
Dentro de esta carpeta haremos la validación de que nuestras variables de entorno estén bien configuradas en nuestro proyecto y además las exportaremos para que cuando las queramos utilizar sea siempre del mismo lugar.

Ejemplo de un objeto envs  
```
import "dotenv/config";
import { get } from "env-var";

const ENVS = {
  PORT: get("PORT").required().asPortNumber(),
  NODE_ENV: get("NODE_ENV").required().asString(),
  ...
};
```

### Domain

Dentro de la carpeta domain es donde podremos encontrar todas las reglas de nuestro software, desde cómo debemos recibir los datos al momento de que nuestro frontend interactúe, cómo deben ser las entidades de nuestro software, etc.

A continuación veremos cada una de las carpetas y su objetivo:

**Constants**  
Dentro de esta carpeta podremos encontrar todo el texto plano relacionado a nuestro software, principalmente datos relacionados las entidades del mismo e información por defecto de nuestra base de datos. 

Ejemplo de constantes relacionadas a la entidad de User  
```
export const USER_CONSTANTS = {
   ROLES: {
      NAMES: {
         ADMINISTRATOR: "Administrator",
         CLIENT: "Client",
         TRAINER: "Trainer",
      },
   },
};
```

**Dtos**  
Los dtos o "Data Transfer Object" son objetos que tienen distintos usos, generalmente se utilizan para encapsular datos necesarios y enviarlos de una aplicación a otra, ya sea al frontend o a distintas api's.

Otra de sus funcionalidades, la que se utiliza dentro de esta aplicación, es la de concentrar y encapsular los parámetros que se reciben dentro de un endpoint en específico, así poder realizar validaciones o cualquier otro tipo de funcionalidades en un sólo lugar antes de que esos datos intenten interactuar con nuestra base de datos.

Ejemplo de un dto relacionado al create de un User  
```
export class CreateUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly authId: string,
    public readonly invite?: string | null,
    public readonly image?: string
  ) {}

  static create(data: { [key: string]: any }): [string?, CreateUserDto?] {
    const { name, image, email, authId, invite } = data;

    if (!name) return ["name is required", undefined];
    if (!email) return ["email is required", undefined];
    if (!authId) return ["authId is required", undefined];

    return [undefined, new CreateUserDto(name, email, authId, invite, image)];
  }
}
```

Como pueden observar dentro del mismo no solo concentramos tódos los parámetros necesarios para la base de datos, sino que también validamos que los mismos se envíen de forma correcta, devolviento la clase creada o un mensaje de error ([string?, CreateUserDto?]).

**Entities** 
Dentro de esta carpeta encontraremos todas las entidades de nuestro software, cada entidad tendrá el objetivo de marcar un modelo estandar al momento de que la información de las entidades salgan de nuestra aplicación, así podremos asegurarnos que en caso de cambiar cómo interactuamos con nuestra base de datos, siempre devolveremos la información con el mismo formato.

Ejemplo de la entity de User
```
import { SubscriptionPlanEntity } from "./subscription-plan.entity";
import { ClientEntity } from "../client/client.entity";
import { RoleEntity } from "./role.entity";

export class UserEntity {
  constructor(
    public id: number,
    public name: string,
    public role: RoleEntity,
    public email: string,
    public authId: string,
    public subscriptionPlan: SubscriptionPlanEntity,
    public image?: string,
    public clientInfo?: ClientEntity | null
  ) {}

  public static create(data: { [key: string]: any }): UserEntity {
    const {
      id,
      name,
      role,
      email,
      authId,
      subscriptionPlan,
      image,
      clientInfo,
    } = data;

    if (!id) throw "id is required";
    if (!name) throw "name is required";
    if (!role) throw "role is required";
    if (!(role instanceof RoleEntity)) throw "bad format of role";
    if (!email) throw "email is required";
    if (!authId) throw "authId is required";
    if (!subscriptionPlan) throw "subscriptionPlan is required";
    if (!(subscriptionPlan instanceof SubscriptionPlanEntity))
      throw "bad format of subscriptionPlan";
    if (clientInfo && !(clientInfo instanceof ClientEntity))
      throw "bad format of clientInfo";

    return new UserEntity(
      id,
      name,
      role,
      email,
      authId,
      subscriptionPlan,
      image,
      clientInfo
    );
  }
}
```

**Errors**  
Esta carpeta tiene un simple objetivo, unificar el manejo de errores dentro de nuestra aplicación.  
```
export class CustomError extends Error {
  private constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
  }
  static badRequest(message: string) {
    return new CustomError(400, message);
  }
  static unauthorized(message: string) {
    return new CustomError(401, message);
  }
  static forbidden(message: string) {
    return new CustomError(403, message);
  }
  static notFound(message: string) {
    return new CustomError(404, message);
  }
  static internalServer(message: string = "Internal server error") {
    return new CustomError(500, message);
  }
}
```

**Repositories**  
Dentro de esta carpeta tendremos una especie de "templates", es decir, clases que definirán la estructura con respecto a las funciones que interactúan con nuestra base de datos, los repositorios.

Dentro de cada repositorio que se encuentre en la carpeta de domain definiremos cómo deberán llamarse las funciones, qué parámetros deberán recibir y qué entidad deberán devolver.

Ejemplo del repositorio de la entidad User  
```
export abstract class UserRepository {
  abstract readUser(id: string): Promise<UserEntity | CustomError>;
  abstract readUserByAuthId(authId: string): Promise<UserEntity | CustomError>;
  abstract createUser(
    registerUser: CreateUserDto
  ): Promise<UserEntity | CustomError>;
  abstract createUserWithGoogleAuth(
    googleUserDto: CreateUserWithGoogleDto
  ): Promise<UserEntity | CustomError>;
}
```

Como vemos ya se empieza a notar la relación entre los dtos, las entidades y los errores que definimos anteriormente.

### Infraestructure

Dentro de la carpeta de Infraestructure podremos encontrar toda la lógica de nuestra base de datos, ya sea migraciones, esquemas, datos semilla, etc, así también como los repositorios que utilizaremos para interactuar con nuestra base de datos, los cuales se basan en los repositorios previamente definidos en nuestro Domain.

Podemos ver a continuación que los repositorios están separados por las entidades de nuestro software:  


Por otro lado tendremos la carpeta "db" la cuál contendrá toda la lógica de nuestra base de datos. La misma, al estar de lado de infraestructura, no tiene una base sobre cómo debe estar formada por lo que se definió de la siguiente forma:  


Podemos observar que tenemos la función para conectarnos a la base de datos, las migraciones, los esquemas y los datos semillas necesarios para que nuestro software interactúe con la base de datos.

> [!TIP]
> Si a futuro queremos añadir más bases de datos al software podemos envolver las carpetas de db y repositories dentro de una carpeta llamada postgresql por ejemplo, así al momento de agregar una base de datos de mongodb deberemos crear su correspondiente carpeta "mongodb" con las carpetas de db y repositories dentro de la misma.

### Presentation

Dentro de la carpeta Presentation encontraremos las partes de nuestro software que interactúan con el exterior de nuestra aplicación, en esta caso el frontend. Acá podremos encontrar la lógica para levantar el servidor principal, las rutas base de nuestra aplicación, las rutas de cada entidad y sus respectivos controladores, además de middlewares necesarios. 

---

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

> [!NOTA]  
> La variable de entorno BUILD_COMMAND sirve para definir si queremos levantar nuestra aplicación en modo desarrollo o producción. Para el modo desarrollo deberemos asignar el valor "dev" mientras que para el modo producción deberemos asignarle el valor de "start".

5. Levantar docker:
   ```bash
   docker compose up --build
   ```
6. Cargar datos iniciales:
   ```bash
   docker compose exec server npm run db:seed
   ```

---

## Sobre mi

Proactivo, creativo y apasionado por el desarrollo de aplicaciones innovadoras. Con más de dos años de experiencia profesional como desarrollador de software, disfruto especialmente de la creación de aplicaciones de uso diario y de la arquitectura de software. Actualmente estoy cursando la carrera de Ingeniería en Software en la Universidad Siglo 21, lo que refuerza mi compromiso con el crecimiento contínuo y la evolución hacia una carrera sólida en ingeniería y arquitectura de software.

Puedes ver mi portafolio en el siguiente link:

https://juanurani.netlify.app/

Conectemos en LinkedIn:

https://www.linkedin.com/in/juanurani/

## Licencia

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

---

## About Entrenaly

Entrenaly is an application designed to optimize and simplify the tasks of personal trainers, allowing them to manage all aspects of their work in one place easily and efficiently. With Entrenaly, trainers can manage their clients with their medical information, create personalized training plans and assign them directly to each client.

The application also allows trainers to add their own exercises with multimedia support, such as GIFs or videos, so that clients can view the necessary demonstrations when reviewing their training plans.

Each client has access to the application where they can view all their assigned plans, thus facilitating a detailed and efficient tracking of their progress.

![entrenalt-exercises view](https://github.com/juanuranidev/entrenaly-frontend/assets/96846723/dd4e706c-6e1d-4ac8-91d5-07fda6245003)

---

## Software architecture

For the backend architecture I implemented a clean architecture, separating the application into the following layers:

- Domain
- Infrastructure
- Presentation
- Config

### Config en

Inside this folder we will find essential configurations for our software, from adapters that facilitate the work with external libraries to important software variables. Next we will explain the different folders inside Config:

**Adapters**  
This folder has as main function to concentrate the implementation of any external library that we use inside our software so that its implementation is not directly inside the software, but it is protected by a function which we will use instead of the library.

Example of an adapter  
```
import { v4 as uuidv4 } from "uuid";

export const uuidAdapter = {
  generate: (): string => {
    return uuidv4();
  },
};
```

If in the future we need to change the library to accomplish the same goal we will only need to replace the logic inside the adapter and not everywhere where it has been implemented.

**Envs**  
Inside this folder we will make the validation that our environment variables are well configured in our project and also we will export them so that when we want to use them it is always from the same place.

Example of an envs object  
```
import "dotenv/config";
import { get } from "env-var";

const ENVS = {
  PORT: get("PORT").required().asPortNumber(),
  NODE_ENV: get("NODE_ENV").required().asString(),
  ...
};
```

### Domain en

Inside the domain folder is where we will be able to find all the rules of our software, from how we must receive the data at the moment that our frontend interacts, how the entities of our software must be, etc.

Next we will see each one of the folders and its objective:

**Constants**  
Inside this folder we will be able to find all the plain text related to our software, mainly data related to the entities of the same one and default information of our database. 

Example of constants related to the User entity  
```
export const const USER_CONSTANTS = {
   ROLES: {
      NAMES: {
         ADMINISTRATOR: "Administrator",
         CLIENT: "Client",
         TRAINER: { TRAINER,
      },
   },
};
```

**Data Transfer Objects**  
The dtos or "Data Transfer Object" are objects that have different uses, generally they are used to encapsulate the necessary data and send it from one application to another, either to the frontend or to different api's.

Another of its functionalities, the one used within this application, is to concentrate and encapsulate the parameters that are received within a specific endpoint, so we can perform validations or any other type of functionalities in a single place before those data try to interact with our database.

Example of a dto related to the create of a User  
```
export class CreateUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly authId: string,
    public readonly invite?: string | null,
    public readonly image?: string
  ) {}

  static create(data: { [key: string]: any }): [string?, CreateUserDto?] {
    const { name, image, email, authId, invite } = data;

    if (!name) return ["name is required", undefined];
    if (!email) return ["email is required", undefined];
    if (!authId) return ["authId is required", undefined];

    return [undefined, new CreateUserDto(name, email, authId, invite, image)];
  }
}
```

As you can see inside it we not only concentrate all the necessary parameters for the database, but we also validate that they are sent correctly, returning the created class or an error message ([string?, CreateUserDto?]).

**Entities**  
Inside this folder we will find all the entities of our software, each entity will have the objective of marking a standard model at the moment that the information of the entities leave our application, this way we will be able to make sure that in case of changing how we interact with our database, we will always return the information with the same format.

Ejemplo de entidad de usuario  
```
import { SubscriptionPlanEntity } from "./suscripción-plan.entidad";
import { ClientEntity } from "./cliente/cliente.entidad";
import { RoleEntity } de "./role.entity";

export class UsuarioEntidad {
  constructor(
    public id: número,
    public nombre: cadena,
    público rol: RoleEntity,
    public email: cadena,
    public authId: cadena,
    public subscriptionPlan: SubscriptionPlanEntity,
    public image?: cadena,
    public clientInfo? ClientEntity | null
  ) {}

  public static create(data: {[key: string]: any }): UserEntity {
    const {
      id,
      nombre
      rol,
      correo electrónico,
      authId,
      subscriptionPlan,
      imagen,
      clientInfo,
    } = datos;

    if (!id) throw "se requiere id";
    if (!name) throw "se requiere el nombre";
    if (!role) throw "se requiere role";
    if (!(role instanceof RoleEntity)) throw "mal formato del rol";
    if (!email) throw "se requiere email";
    if (!authId) throw "se requiere authId";
    if (!subscriptionPlan) throw "se requiere subscriptionPlan";
    if (!(subscriptionPlan instanceof SubscriptionPlanEntity))
      throw "mal formato de subscriptionPlan";
    if (clientInfo && !(clientInfo instanceof ClientEntity))
      throw "mal formato de clientInfo";

    return new EntidadUsuario(
      id,
      nombre
      rol,
      email,
      authId,
      subscriptionPlan,
      imagen,
      clientInfo
    );
  }
}
```

**Errors**  
This folder has a simple purpose, to unify error handling within our application.  
```
export class ErrorCustomError extends Error {
  private constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
  }
  static badRequest(message: string) {
    return new CustomError(400, message);
  }
  static unauthorized(message: string) {
    return new CustomError(401, message);
  }
  static forbidden(message: string) {
    return new CustomError(403, message);
  }
  static notFound(message: string) {
    return new CustomError(404, message);
  }
  static internalServer(message: string = "Internal server error") {
    return new CustomError(500, message);
  }
}
```

**Repositories**  
Inside this folder we will have a kind of "templates", that is to say, classes that will define the structure with respect to the functions that interact with our database, the repositories.

Within each repository that is in the domain folder we will define how the functions should be called, what parameters they should receive and what entity they should return.

Example of the repository of the entity User  
```
export abstract class UserRepository {
  abstract readUser(id: string): Promise<UserEntity | CustomError>;
  abstract readUserByAuthId(authId: string): Promise<UserEntity | CustomError>;
  abstract createUser(
    registerUser: CreateUserDto
  ): Promise<UserEntity | CustomError>;
  abstract createUserWithGoogleAuth(
    googleUserDto: CreateUserWithGoogleDto
  ): Promise<UserEntity | CustomError>;
}
```

As we can see, the relationship between the dtos, the entities and the errors that we defined previously is already beginning to be noticed.

### Infraestructure en

Inside the Infraestructure folder we will be able to find all the logic of our database, either migrations, schemas, seed data, etc, as well as the repositories that we will use to interact with our database, which are based on the repositories previously defined in our Domain.

We can see below that the repositories are separated by the entities of our software:  


On the other side we will have the folder "db" which will contain all the logic of our database. The same, being on the infrastructure side, does not have a basis on how it should be formed so it was defined as follows:  


We can see that we have the function to connect to the database, the migrations, the schemas and the necessary seed data for our software to interact with the database.

> [!TIP]
> If in the future we want to add more databases to the software we can wrap the db and repositories folders inside a folder called postgresql for example, so at the moment of adding a mongodb database we will have to create its corresponding folder "mongodb" with the db and repositories folders inside it.

### Presentation en

Inside the Presentation folder we will find the parts of our software that interact with the outside of our application, in this case the frontend. Here we will be able to find the logic to raise the main server, the base routes of our application, the routes of each entity and their respective controllers, in addition to necessary middlewares. 

---

## Installation

To install and run the project locally follow the steps below

#### Prerequisites

Before performing the installation, make sure you have the following tools configured:

- [Node.js](https://nodejs.org/) (version 18 or higher).
- [Docker](https://www.docker.com/)

#### Installation steps

1. Clone this repository:
   ````bash
   git clone https://github.com/juanuranidev/entrenaly-backend
   ```
2. Navigate to the directory:
   ````bash
   cd entrenaly-backend
   ```
3. Install the dependencies:
   ````bash
   npm install
   ```
4. Create an .env file based on the .env.example file and add your environment variables:
   `PORT=`8081  
   `NODE_ENV=`development  
   `BUILD_COMMAND=`dev  
   `POSTGRES_USER=`  
   `POSTGRES_DB=`  
   `POSTGRES_PORT=`  
   `POSTGRES_PASSWORD=`  
   `POSTGRES_URL=`  

> [!NOTE]  
> The BUILD_COMMAND environment variable is used to define if we want to build our application in development or production mode. For the development mode we will have to assign the value "dev" while for the production mode we will have to assign the value of "start".

5. To raise docker:
   ````bash
   docker compose up --build
   ```
6. Load initial data:
   ````bash
   docker compose exec server npm run db:seed
   ```

---

## About me

Proactive, creative and passionate about developing innovative applications. With more than two years of professional experience as a software developer, I especially enjoy creating everyday applications and software architecture. I am currently pursuing a degree in Software Engineering at Siglo 21 University, which reinforces my commitment to continuous growth and evolution towards a solid career in software engineering and architecture.

You can see my portfolio at the following link:

https://juanurani.netlify.app/

Let's connect on LinkedIn:

https://www.linkedin.com/in/juanurani/

---

## License

MIT License

Copyright (c) [2024] [Juan Urani].

Permission is hereby granted, free of charge, to any person who obtains a copy
of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including
in the Software without restriction, including without limitation the rights to use, copy, modify, merge, modify, merge, reverse engineer, copy, modify, merge, reverse engineer
to use, copy, modify, merge, merge, publish, distribute, sublicense and/or sell copies of the Software.
sublicense and/or sell copies of the Software, and to permit persons to whom the Software is made available to use, copy, modify, merge, publish, distribute, sublicense and/or sell copies of the Software, subject to the following
the Software, subject to the following conditions:

The foregoing copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE FOLLOWING
IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT
SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE IN ANY EVENT FOR ANY CLAIM, DAMAGE OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, WHETHER IN CONTRACT, TORT, NEGLIGENCE OR OTHERWISE.
LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE, ARISING OUT OF,
FROM OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS WITH THE SOFTWARE.
SOFTWARE.