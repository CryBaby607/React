/**
 * Formatea un número como moneda mexicana (MXN)
 * @param {number} price - Precio a formatear
 * @returns {string} Precio formateado "$ X,XXX"
 * @example formatPrice(3299) => "$3,299"
 */
export const formatPrice = (price) => {
  if (typeof price !== 'number' || price < 0) {
    console.warn('formatPrice recibió valor inválido:', price)
    return '$0'
  }

  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

/**
 * Formatea múltiples precios
 * @param {number[]} prices - Array de precios
 * @returns {string[]} Array de precios formateados
 */
export const formatPrices = (prices) => {
  if (!Array.isArray(prices)) return []
  return prices.map(formatPrice)
}

/**
 * Obtiene información detallada del precio
 * @param {number} price - Precio
 * @param {number} discount - Descuento en %
 * @returns {Object} { original, discount, final, saved }
 */
export const getPriceBreakdown = (price, discount = 0) => {
  const discountAmount = Math.round((price * discount) / 100)
  const finalPrice = price - discountAmount

  return {
    original: formatPrice(price),
    originalRaw: price,
    discount: discount,
    discountAmount: discountAmount,
    final: formatPrice(finalPrice),
    finalRaw: finalPrice,
    saved: formatPrice(discountAmount)
  }
}