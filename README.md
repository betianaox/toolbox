# 🧰 Toolbox Challenge

Este proyecto contiene una solución completa (frontend + backend) para el challenge de ToolBox, desarrollada con React y Node.js. Todo el entorno está dockerizado para facilitar la ejecución y el despliegue.

---

## 📦 Estructura del Proyecto

```
/toolbox
│
├── /api               # Backend en Node.js (Express)
├── /frontend          # Frontend en React + Redux
├── /docs              # Documentación técnica (API, Frontend, Docker)
├── docker-compose.yml # Levanta todo el stack con Docker
├── .gitignore         # Ignora archivos innecesarios para Git
└── README.md          # Documentación general del proyecto
```

---

## 🚀 Cómo levantar el proyecto

### Requisitos:
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)

### Paso a paso:
Desde la raíz del proyecto (`/toolbox`), ejecutá:

```bash
docker compose up --build
```

## 🌐 Accesos

- 🛠️ **API (Backend):** [http://localhost:3000/files/data](http://localhost:3000/files/data)
- 💻 **Frontend (React):** [http://localhost:3001](http://localhost:3001)

---

## 📚 Documentación

La documentación técnica está organizada en la carpeta [`/docs`](./docs):

- [`frontend.md`](./docs/frontend.md): Estructura y explicación del Frontend.
- [`api.md`](./docs/api.md): Detalles de implementación del Backend.
- [`dockerizacion.md`](./docs/dockerizacion.md): Cómo está configurada la dockerización.

---

## 🧪 Tests

- **API:** Contiene tests básicos con Mocha + Chai para validar los endpoints.
- Para ejecutar los tests de la API:
  
```bash
cd api
npm install
npm test
```

---

## 📝 Notas

- Este proyecto está preparado para entornos de desarrollo.
- Se usó Redux en una implementación mínima.
