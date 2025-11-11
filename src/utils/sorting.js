export const SORT_STRATEGIES = {
  'price-low': (a, b) => a.price - b.price,
  'price-high': (a, b) => b.price - a.price,
  'newest': (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0),
  'discount': (a, b) => (b.discount || 0) - (a.discount || 0),
  'name-asc': (a, b) => a.model.localeCompare(b.model),
  'name-desc': (a, b) => b.model.localeCompare(a.model)
}

/**
 * Ordena array de productos según estrategia especificada
 * @param {Array} products - Productos a ordenar
 * @param {string} sortBy - Clave de estrategia de ordenamiento
 * @returns {Array} Array ordenado (no modifica original)
 * @example
 * const sorted = sortProducts(products, 'price-low')
 */
export const sortProducts = (products, sortBy = 'newest') => {
  if (!Array.isArray(products) || products.length === 0) {
    return products
  }

  const strategy = SORT_STRATEGIES[sortBy]

  if (!strategy) {
    console.warn(`Estrategia de ordenamiento desconocida: "${sortBy}"`)
    return products
  }

  return [...products].sort(strategy)
}

/**
 * Obtiene opciones de ordenamiento disponibles para mostrar en select
 * @returns {Array} Array de objetos { value, label }
 */
export const getSortOptions = () => {
  return [
    { value: 'newest', label: 'Más Nuevos' },
    { value: 'price-low', label: 'Precio: Menor a Mayor' },
    { value: 'price-high', label: 'Precio: Mayor a Menor' },
    { value: 'discount', label: 'Mayor Descuento' },
    { value: 'name-asc', label: 'Nombre (A-Z)' },
    { value: 'name-desc', label: 'Nombre (Z-A)' }
  ]
}

/**
 * Verifica si una estrategia de ordenamiento existe
 * @param {string} sortBy - Clave a verificar
 * @returns {boolean} True si existe la estrategia
 */
export const isSortStrategyValid = (sortBy) => {
  return sortBy in SORT_STRATEGIES
}

/**
 * Obtiene la etiqueta de una estrategia de ordenamiento
 * @param {string} sortBy - Clave de estrategia
 * @returns {string} Etiqueta legible para el usuario
 */
export const getSortLabel = (sortBy) => {
  const option = getSortOptions().find(opt => opt.value === sortBy)
  return option ? option.label : 'Ordenamiento desconocido'
}