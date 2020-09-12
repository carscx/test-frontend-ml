const fetch = require("node-fetch");
const config = require("../config.json");

/**
 *
 * Busqueda de productos
 * @param {string} searchQuery // Ejemplo "coches"
 *
 */

const searchItems = async (searchQuery) => {
  // Listado de Categorias
  const listCategories = [];

  try {
    // Llamada a la busqueda de la API de ML
    const response = await fetch(
      `${config.URL_API_ML}sites/MLA/search?q=${searchQuery}`
    );
    // Se captura la respuesta
    const json = await response.json();

    // Respuesta de los resultados
    return json;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { searchItems };
