# Documentación de Dockerización

## Estructura de Archivos
/toolbox
│
├── docker-compose.yml # Compose principal para frontend + backend
│
├── /api # Backend en Node.js con Express
│ ├── Dockerfile # Dockerfile del backend
│ ├── api.js # Entrada principal del servidor Express
│ └── ...otros archivos
│
└── /frontend # Frontend en React
├── Dockerfile # Dockerfile del frontend
├── .env # Archivo para setear el puerto 3001
└── ...otros archivos React


## Descripción

### Backend (API)
- **Imagen base**: `node:14-alpine` (según requerimiento)
- **Expone el puerto**: 3000
- **Proceso**: El contenedor instala dependencias con `npm install` y ejecuta la app con `node api.js`

### Dockerfile del backend (`/api/Dockerfile`):

FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
Frontend (React)
Imagen base: node:16

Expone el puerto: 3001

Configuración: Usa un archivo .env para configurar el puerto de desarrollo

Comando: Levanta la app con npm start

### Dockerfile del frontend (/frontend/Dockerfile):

FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
Archivo .env del frontend (/frontend/.env):
PORT=3001
docker-compose.yml
yaml
services:
  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
Cómo levantar el proyecto
Desde la raíz del proyecto, ejecutar:


### Verificación
Una vez levantado el proyecto, acceder a:

Backend (API):
http://localhost:3000/files/list
http://localhost:3000/files/data

Frontend (React):
http://localhost:3001