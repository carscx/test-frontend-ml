const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./config.json");
const pkg = require("./package.json");
const port = config.PORT;

const authorInfo = pkg.author; // Obtiene los datos del autor desde el package.json

// Se establece la propiedad cors
app.use(cors());

// Funcionalidad para la búsqueda de productos
const search = require("./routes/search");

// Funcionalidad para obtener un producto por ID
const filterItems = require("./routes/filterItem");

// Funcionalidad para validar Author

const validateAuthor = (name, lastname) => {
  return authorInfo.name === name && authorInfo.lastname === lastname;
};

/**
 * Ruta para la busqueda de productos
 * GET: /api/items
 * @param {string} q
 */

app.get("/api/items", (request, response) => {
  const searchQuery = request.query.q;

  const name = request.header("x-author-name");
  const lastname = request.header("x-author-lastname");

  if (searchQuery !== null && validateAuthor(name, lastname)) {
    search.searchItems(searchQuery).then((results) => {
      response.status(200).json(results);
    });
  } else {
    response
      .status(403)
      .send({ error: "Las credenciales no son validas" })
      .end();
  }
});

/**
 * Ruta para obtener un producto por ID
 * GET: /api/items/:id
 * @param {string} id
 */

app.get("/api/items/:id", (request, response) => {
  const idItem = request.params.id;

  const name = request.header("x-author-name");
  const lastname = request.header("x-author-lastname");

  if (idItem !== null && validateAuthor(name, lastname)) {
    filterItems(idItem).then((results) => {
      response.status(200);
      response.json(results);
    });
  } else {
    response
      .status(403)
      .send({ error: "Las credenciales no son validas" })
      .end();
  }
});

// Devuelve "SERVER ML" al acceder a la API
app.get("/", (req, res) => res.send("SERVER ML"));
// Levanta el servidor en el puerto 5000
app.listen(port, () => console.log(`Corriendo server en el puerto: ${port}!`));
