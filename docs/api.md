
# Documentación API

## 1. Estructura general del proyecto

```
/api.js                # Archivo principal que arranca el servidor Express
/package.json          # Configuración de dependencias
/src
  /controllers
    filesController.js # Lógica para manejar los endpoints
  /routes
    filesRoutes.js     # Define las rutas para /files/list y /files/data
  /test
    files.test.js      # Tests básicos usando Mocha y Chai
```

---
## 2. Funcionalidad principal

- El servidor Express corre por defecto en `http://localhost:3000` (puede configurarse en `api.js`).
- Endpoints disponibles:

### `GET /files/data`

- Devuelve los datos procesados de los archivos (CSV parseado).
- Respuesta: array con la información de cada archivo y sus líneas correspondientes.

### `GET /files/list`

- Devuelve la lista de archivos disponibles.
- Respuesta: objeto JSON con una propiedad `files`, que es un array de nombres de archivos.

---

## 3. Validaciones y manejo de errores

- Si algún archivo no se puede procesar, se omite sin interrumpir la ejecución.
- Los datos mal formados o incompletos se descartan silenciosamente.
- Los archivos vacíos no generan errores (simplemente no agregan datos a la respuesta).

---
## 4. Cómo ejecutar el proyecto

1. Clonar o descargar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Levantar el servidor:
   ```bash
   npm run dev
   ```
4. Probar la API:
   ```bash
   curl http://localhost:3000/files/list
   curl http://localhost:3000/files/data
   ```
---
## 5. Cómo usar los tests

- Tests implementados con **Mocha** y **Chai**, usando `chai-http` para peticiones HTTP.
- El archivo `api.js` exporta la app Express para facilitar el testing sin levantar un servidor.

### Ejecutar tests:

```bash
npm test
```
---
## 6. Qué se testea

- `GET /files/list` responde con estado `200`.
- La respuesta contiene una propiedad `files` que es un array.
- `GET /files/data` responde con estado `200`.
- La respuesta es un array con los datos procesados de los archivos.
