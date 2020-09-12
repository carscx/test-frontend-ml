const fetch = require("node-fetch");
const config = require("../config.json");
const { isFloat, splitFloat } = require("../utils/numbers.js");

/**
 *
 * Obtiene el breadcrumbs basado en la búsqueda
 * @param {string} idCategory // Ejemplo. MLA1384
 *
 */

const getBreadcrumbs = async (idCategory) => {
  try {
    // Llamada a las categorias de la API de ML
    const response = await fetch(
      `${config.URL_API_ML}categories/${idCategory}`
    );
    const json = await response.json();
    // Respuesta JSON
    return json.path_from_root;
  } catch (error) {
    console.log(error);
  }
};

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

    // Se realiza un filtro para obtener el listado de categorías.
    const categories = json.available_filters.filter(
      (item) => item.id === "category"
    );

    // Se llena el array de listado de categorías
    categories[0].values.map((item) => {
      listCategories.push(item);
    });

    // Se obtienen los items en el formato requerido

    const items = json.results.map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: isFloat(item.price)
          ? splitFloat(item.price).integer
          : item.price,
        decimals: isFloat(item.price) ? splitFloat(item.price).decimal : 0,
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    }));

    // Se obtienen las categorias para despues formar el breadcrumbs
    const breadcrumbs = await getBreadcrumbs(listCategories[0].id);

    // Se crea el objeto con los resultados obtenidos

    const results = {
      categories: listCategories,
      items: items,
      breadcrumbs: breadcrumbs,
    };

    // Respuesta de los resultados
    return results;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { searchItems };
