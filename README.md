# Test frontend para Mercado Libre

En el proyecto se encuentran dos carpetas principales, `client` y `server`.

## Requisitos previos

- Instalar <a href="https://nodejs.org/en/download/" target="_blank">Node.js</a>

### Servidor `/server`

#### Primeros pasos

Debe ejecutar el siguiente comando en la ruta `${proyecto}/server/` para instalar las dependencias del servidor

```sh
npm install
```

A continuación

```sh
npm run start
```

El servidor por defecto corre en el puerto **5000**, se puede cambiar modificando el archivo `config.json`

#### Configuración

En el archivo `config.json` se pueden modificar los siguientes valores:

```json
{
  "PORT": 5000, // Puerto que escucha la API
  "URL_API_ML": "https://api.mercadolibre.com/", // URL de la API de ML
  "LIMIT_ITEMS": 4 // Limite de productos obtenidos por la API
}
```

#### Enpoints disponibles

Ver carpeta `server/postman` para más información

http://localhost:5000/api/items?q=:query
http://localhost:5000/api/items/:id

### Cliente `/client`

El cliente se ha desarrollado en React `v.16.13.1` y creado con `create-react-app`, puede ver más información <a href="https://create-react-app.dev/" target="_blank">aquí</a>.

Para los estilos se ha usado `styled-components` en su versión `5.2.0`, más info en <a href="https://styled-components.com/" target="_blank"> su web</a>.

#### Instalar dependencias front

```sh
yarn install
```

#### Correr aplicación front

```sh
yarn start
```

Por defecto corre en `http://localhost:3000`
