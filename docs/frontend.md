# Documentación Frontend - React

## 1. Estructura general del proyecto
- `/src`
  - `/components`
    - `DataTable.js` — Componente principal que muestra la tabla de archivos y líneas.
  - `/services`
    - `api.service.js` — Contiene funciones para llamadas HTTP usando axios.
  - `/store`
    - `index.js` — Configuración y creación de la store Redux.
  - `/styles`
    - `Style.css` — Estilos personalizados de la app.
  - `index.js` — Entrada principal de la aplicación React, donde se monta el árbol y se importa el store.

## 2. index.js - Punto de entrada
- Importa React y ReactDOM para renderizar la app.
- Importa Provider de react-redux para conectar Redux con React.
- Importa la store configurada para que esté disponible globalmente.
- Importa estilos globales: Bootstrap, Bootstrap Icons y estilos personalizados.
- Renderiza el componente DataTable dentro del proveedor Redux, permitiendo que cualquier componente conectado pueda acceder al estado global.

## 3. Store Redux (/store/index.js)
- Se crea una store Redux simple sin slices ni middleware.
- Define un estado inicial con propiedades:
  - `data`: array para almacenar la info de archivos y líneas.
  - `loading`: booleano para controlar el estado de carga.
  - `filter`: string para el filtro de nombre de archivo.
- Se define un reducer que maneja acciones para:
  - Actualizar la data (`SET_DATA`).
  - Actualizar el filtro (`SET_FILTER`).
  - Cambiar el estado de carga (`SET_LOADING`).
- Exporta la store creada con `createStore`.

## 4. Servicios HTTP (/services/api.service.js)
- Centraliza las llamadas al backend usando axios.
- Funciones disponibles:
  - `fetchFileData()` — Obtiene todos los archivos con sus líneas.
  - `fetchFileDataByName(fileName)` — Obtiene archivos filtrados por nombre usando parámetro query `fileName`.
- Estas funciones son usadas en el componente para separar la lógica de petición del componente.

## 5. Componente DataTable (/components/DataTable.js)
- Conecta con Redux para obtener estado global (`data`, `filter`, `loading`).
- Usa `useDispatch` para lanzar acciones a la store.
- Controla un input de filtro que dispara la acción de actualización de filtro y recarga datos con debounce de 500ms.
- Cuando el filtro cambia, dispara la petición correspondiente usando las funciones del servicio para obtener datos filtrados o todos los datos.
- Muestra un spinner de carga mientras se obtienen los datos.
- Renderiza una tabla con columnas: Nombre de archivo, Texto, Número y Hex.
- Aplana la estructura recibida (archivos con líneas) para mostrar cada línea en una fila con su nombre de archivo correspondiente.
- Muestra mensaje “No hay datos disponibles” si la respuesta está vacía.

## 6. Funcionamiento general
- La aplicación inicia con la carga de todos los archivos y líneas.
- El usuario puede filtrar en tiempo real escribiendo en la caja de texto el nombre (o parte del nombre) del archivo.
- Cada cambio en el filtro realiza una nueva petición al backend para obtener datos filtrados.
- El estado global se actualiza vía Redux, manteniendo sincronizados los datos y el filtro en toda la aplicación.
- La UI refleja el estado global y muestra los datos en una tabla responsiva usando Bootstrap.

## 7. Estilos
- Bootstrap CSS proporciona la base visual y responsive.
- Bootstrap Icons ofrecen íconos visuales, por ejemplo en el input de búsqueda (lupa).
- Estilos personalizados están en `/styles/Style.css` para ajustes específicos.