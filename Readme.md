Sistema de Gestión de Soporte Técnico


#AUTOR


Anthony Rebolledo

========================
DESCRIPCIÓN DEL PROYECTO
========================

Aplicación web desarrollada con Angular 22, Node.js,
Express y MySQL para administrar tickets de soporte
técnico.

El sistema permite:

- Registrar tickets
- Listar tickets
- Editar tickets
- Eliminar tickets
- Mantener la información almacenada en MySQL

Cada ticket contiene:

- Asunto
- Solicitante
- Descripción
- Categoría
- Prioridad
- Estado
- Fecha de registro

======================
TECNOLOGÍAS UTILIZADAS
======================

Frontend:
- Angular 22
- TypeScript
- HTML5
- CSS3

Backend:
- Node.js
- Express
- CORS
- MySQL2

Base de Datos:
- MySQL

Herramientas:
- Visual Studio Code
- Git
- GitHub

===========
INSTALACIÓN
===========

1. Clonar repositorio

git clone URL_DEL_REPOSITORIO

2. Ingresar al proyecto

cd evaluacion-angular

3. Instalar dependencias Backend

cd api-soporte

npm install

4. Instalar dependencias Frontend

cd ../soporte-angular

npm install

===========
EJECUCIÓN
===========

1. Iniciar MySQL

Verificar que el servicio MySQL se encuentre activo.

2. Iniciar Backend

cd api-soporte

node server.js

API disponible en:

http://localhost:3000

3. Iniciar Frontend

cd soporte-angular

ng serve

Aplicación disponible en:

http://localhost:4200

================================
ESTRUCTURA GENERAL DEL PROYECTO
================================

evaluacion-angular
│
├── api-soporte
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── soporte-angular
│   ├── src
│   │   └── app
│   │       ├── components
│   │       ├── models
│   │       └── services
│   │
│   ├── angular.json
│   └── package.json
│
└── db.sql

=============================
FUNCIONALIDADES IMPLEMENTADAS
=============================

Tickets

- Listado de tickets
- Registro de tickets
- Edición de tickets
- Eliminación de tickets

Backend

- GET /api/soportes
- GET /api/soportes/:id
- POST /api/soportes
- PUT /api/soportes/:id
- DELETE /api/soportes/:id

Angular

- Componentes standalone
- Routing
- Servicios Angular
- HttpClient
- Formularios reactivos
- Validaciones
- Manejo básico de errores

Persistencia

- Base de datos MySQL
- Consultas parametrizadas
- Persistencia real de datos

==================
PRUEBAS REALIZADAS
==================

GET

- Obtención de tickets desde MySQL.

POST

- Registro de tickets desde Angular.
- Almacenamiento correcto en la base de datos.

PUT

- Modificación de tickets existentes.
- Verificación de persistencia.

DELETE

- Eliminación de tickets desde Angular.
- Confirmación de eliminación en MySQL.

Persistencia

- Reinicio de Angular.
- Reinicio de API Express.
- Verificación de permanencia de los datos.

Compilación

ng build

Resultado:

Proyecto compilado sin errores.

==============================================
DECLARACIÓN DE USO DE INTELIGENCIA ARTIFICIAL
==============================================

Herramienta utilizada

- Microsoft Copilot

Actividades para las que fue utilizada

- Explicación de conceptos Angular.
- Generación de ejemplos de código (.html, .css).
- Resolución de errores.
- Apoyo en documentación
- Elaboración del README.

Elementos que recibieron apoyo de IA

- Servicios Angular.
- Formularios reactivos.
- Documentación técnica.

Modificaciones realizadas por el estudiante

Todo el código generado fue:

- Revisado.
- Adaptado al caso de soporte técnico.
- Probado localmente.
- Corregido según los resultados obtenidos.
- Integrado manualmente al proyecto final.

El estudiante comprende y puede explicar cada uno de
los elementos incorporados en la solución.

==================
FIN DEL DOCUMENTO
==================
