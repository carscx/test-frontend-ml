const express = require("express");
const app = express();
const port = 5000;

/**
 * Ruta para la busqueda de productos
 * GET: /api/items
 * @param {string} q
 */

app.get("/api/items", (request, response) => {
  const searchQuery = request.query.q;
  if (searchQuery !== null) {
    response.status(200).json({ searchQuery });
  } else {
    response.status(503).end();
  }
});

// Devuelve "SERVER ML" al acceder a la API
app.get("/", (req, res) => res.send("SERVER ML"));
// Levanta el servidor en el puerto 5000
app.listen(port, () => console.log(`Corriendo server en el puerto: ${port}!`));
