const fetch = require("node-fetch");

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
      `https://api.mercadolibre.com/sites/MLA/search?q=${searchQuery}`
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
