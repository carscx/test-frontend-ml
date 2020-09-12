const fetch = require("node-fetch");
const config = require("../config.json");
const pkg = require("../package.json");
const { isFloat, splitFloat } = require("../utils/numbers.js");

const search = require("./search");

const authorInfo = pkg.author; // Obtiene los datos del autor desde el package.json

/**
 *
 * Obtiene la descripcion del item consultado por ID
 * @param {string} idItem // Ejemplo. MLA877503989
 *
 */

const getDescription = async (idItem) => {
  try {
    // Llamada a la descripcion de la API de ML
    const response = await fetch(
      `${config.URL_API_ML}items/${idItem}/description`
    );
    const json = await response.json();

    // Respuesta JSON
    return json;
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * Get de producto por ID
 * @param {string} idItem // Ejemplo MLA877503989
 *
 */

const filterItem = async (idItem) => {
  // Array de resultados
  let results = {};
  try {
    // Llamada a los items de la API de ML
    const response = await fetch(`${config.URL_API_ML}items/${idItem}`);
    const item = await response.json();

    // Se obtienen las categorias para despues formar el breadcrumbs
    const breadcrumbs = await search.getBreadcrumbs(item.category_id);

    // Se obtiene la descripcion del producto pasando el ID
    const description = await getDescription(idItem);
    // Se llena el objeto con el formato adecuado
    results = {
      author: authorInfo,
      item: {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: isFloat(item.price)
            ? splitFloat(item.price).integer
            : item.price,
          decimals: isFloat(item.price) ? splitFloat(item.price).decimal : 0,
        },
        picture: item.pictures[0].url,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
        description: description,
      },
      breadcrumbs: breadcrumbs,
    };
    // Respuesta de los resultados
    return results;
  } catch (error) {
    console.log(error);
  }
};

module.exports = filterItem;
