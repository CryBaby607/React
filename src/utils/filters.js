/**
 * Obtiene marcas únicas de un array de productos
 * @param {Array} products - Productos
 * @param {boolean} includeAll - Incluir opción "Todas" al inicio
 * @returns {string[]} Array de marcas ordenadas alfabéticamente
 * @example
 * const brands = getUniqueBrands(products, true)
 * // ['Todas', 'Adidas', 'Nike', 'Puma']
 */
export const getUniqueBrands = (products, includeAll = true) => {
  if (!Array.isArray(products)) return includeAll ? ['Todas'] : []

  // Extraer marcas únicas
  const brands = [...new Set(products.map(p => p?.brand).filter(Boolean))]
  
  // Ordenar alfabéticamente
  brands.sort()

  // Agregar "Todas" al inicio si se solicita
  return includeAll ? ['Todas', ...brands] : brands
}

/**
 * Filtra productos por marca
 * @param {Array} products - Productos a filtrar
 * @param {string|Array} brands - Marca(s) a incluir
 * @returns {Array} Productos filtrados
 * @example
 * const filtered = filterByBrand(products, 'Nike')
 * const filtered = filterByBrand(products, ['Nike', 'Adidas'])
 * const filtered = filterByBrand(products, 'Todas') // Retorna todos
 */
export const filterByBrand = (products, brands) => {
  if (!Array.isArray(products)) return []

  // Si es "Todas" o vacío, retornar todos los productos
  if (!brands || brands === 'Todas' || 
      (Array.isArray(brands) && brands.includes('Todas'))) {
    return products
  }

  // Convertir a array si es string
  const brandArray = Array.isArray(brands) ? brands : [brands]
  
  // Filtrar solo productos que coincidan con las marcas
  return products.filter(p => brandArray.includes(p.brand))
}

/**
 * Obtiene el rango de precio (mínimo y máximo) de productos
 * @param {Array} products - Productos
 * @returns {Object} { min, max } precios
 * @example
 * const range = getPriceRange(products)
 * // { min: 1299, max: 4299 }
 */
export const getPriceRange = (products) => {
  if (!Array.isArray(products) || products.length === 0) {
    return { min: 0, max: 0 }
  }

  const prices = products
    .map(p => p.price)
    .filter(p => typeof p === 'number' && p > 0)

  if (prices.length === 0) {
    return { min: 0, max: 0 }
  }

  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  }
}

/**
 * Filtra productos por rango de precio
 * @param {Array} products - Productos a filtrar
 * @param {number} minPrice - Precio mínimo
 * @param {number} maxPrice - Precio máximo
 * @returns {Array} Productos dentro del rango
 */
export const filterByPrice = (products, minPrice = 0, maxPrice = Infinity) => {
  if (!Array.isArray(products)) return []

  return products.filter(p => 
    p.price >= minPrice && p.price <= maxPrice
  )
}

/**
 * Filtra solo productos en stock
 * @param {Array} products - Productos
 * @returns {Array} Productos disponibles
 */
export const filterInStock = (products) => {
  if (!Array.isArray(products)) return []

  return products.filter(p => p.inStock === true)
}

/**
 * Aplica múltiples filtros a un array de productos
 * Combina todos los filtros de forma declarativa
 * @param {Array} products - Productos iniciales
 * @param {Object} filters - Objeto con filtros a aplicar
 *   - brand: string|Array - Marca(s) a incluir
 *   - priceMin: number - Precio mínimo
 *   - priceMax: number - Precio máximo
 *   - inStock: boolean - Solo en stock
 * @returns {Array} Productos filtrados
 * @example
 * const filtered = applyFilters(products, {
 *   brand: 'Nike',
 *   priceMin: 2000,
 *   priceMax: 4000,
 *   inStock: true
 * })
 */
export const applyFilters = (products, filters = {}) => {
  let result = [...products]

  // Filtrar por marca
  if (filters.brand) {
    result = filterByBrand(result, filters.brand)
  }

  // Filtrar por precio mínimo
  if (filters.priceMin !== undefined && filters.priceMin > 0) {
    result = result.filter(p => p.price >= filters.priceMin)
  }

  // Filtrar por precio máximo
  if (filters.priceMax !== undefined && filters.priceMax < Infinity) {
    result = result.filter(p => p.price <= filters.priceMax)
  }

  // Filtrar solo stock disponible
  if (filters.inStock === true) {
    result = filterInStock(result)
  }

  return result
}

/**
 * Cuenta productos que cumplen cierto criterio (marca)
 * Útil para mostrar conteos en filtros
 * @param {Array} products - Productos
 * @param {string} brand - Marca a contar
 * @returns {number} Cantidad de productos
 */
export const countByBrand = (products, brand) => {
  if (!Array.isArray(products) || brand === 'Todas') {
    return products.length || 0
  }

  return products.filter(p => p.brand === brand).length
}