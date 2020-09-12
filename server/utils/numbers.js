/**
 * isFloat comprueba si un numero es decimal
 * @param {number} n
 */

const isFloat = (n) => {
  return n === +n && n !== (n | 0);
};

/**
 * splitFloat devuelve un objeto separando los decimales
 * de un numero decimal
 * @param {number} n
 */

const splitFloat = (n) => {
  const regex = /(\d*)[.,]{1}(\d*)/;
  var m;

  if ((m = regex.exec(n.toString())) !== null) {
    return {
      integer: parseInt(m[1]),
      decimal: parseFloat(`${m[2]}`),
    };
  }
};

// Exporta los modulos en el archivo

module.exports = { isFloat, splitFloat };
