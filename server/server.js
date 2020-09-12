const express = require("express");
const app = express();
const config = require("./config.json");
const port = config.PORT;

// Funcionalidad para la búsqueda de productos
const search = require("./routes/search");

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
    response.status(401).end();
  }
});

// Devuelve "SERVER ML" al acceder a la API
app.get("/", (req, res) => res.send("SERVER ML"));
// Levanta el servidor en el puerto 5000
app.listen(port, () => console.log(`Corriendo server en el puerto: ${port}!`));
