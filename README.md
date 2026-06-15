\# Todo List Web



\## Integrantes



\* Jose Guillermo Bozo

\* Laura Andrea Nina Peñaloza



\------------------------------------------------------------



\## Descripción



Aplicación web de gestión de tareas desarrollada con:



\### Backend



\* Node.js

\* Express

\* SQLite

\* Passport JWT



\### Frontend



\* React

\* Vite



\### Seguridad



\* HTTPS mediante certificados SSL (.pem)



\---



\# Requisitos



Instalar:



\* Node.js

\* Git



\---



\# Clonar repositorio



```bash

git clone https://github.com/201410005-web/TodoList-repo.git

```



Entrar al proyecto:



```bash

cd TodoList-repo

```



\---



\# Instalación Backend



Entrar a la carpeta backend:



```bash

cd backend

```



Instalar dependencias:



```bash

npm install

```



Ejecutar:



```bash

node index.js

```



Servidor:



```text

https://localhost:3000

```



\---



\# Instalación Frontend



Abrir una nueva terminal:



```bash

cd frontend

```



Instalar dependencias:



```bash

npm install

```



Ejecutar:



```bash

npm run dev

```



Frontend:



```text

http://localhost:5173

```



\---



\# Base de Datos



El proyecto utiliza SQLite.



Archivo:



```text

backend/tasks.db

```



La base de datos contiene información de prueba para validar las funcionalidades del sistema.



\---



\# Funcionalidades



\* Registro de usuarios

\* Inicio de sesión

\* Creación de tareas

\* Eliminación de tareas

\* Cambio de estado de tareas

\* Prioridades de tareas

\* API REST

\* HTTPS



\---



\# Seguridad



Las credenciales sensibles no se almacenan en el repositorio.



Los certificados SSL utilizados son:



```text

backend/cert.pem

backend/key.pem

```



Utilizados únicamente para pruebas académicas en entorno local.



