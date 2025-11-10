/**
 * Valida si un item del carrito es válido
 * @param {Object} item - Item a validar
 * @returns {boolean} True si es válido
 */
export const isValidCartItem = (item) => {
  return (
    item &&
    typeof item.id === 'number' &&
    item.id > 0 &&
    typeof item.price === 'number' &&
    item.price > 0 &&
    typeof item.quantity === 'number' &&
    item.quantity > 0 &&
    item.quantity <= 99 &&
    item.name &&
    typeof item.name === 'string'
  )
}

/**
 * Calcula el precio total de un item (precio * cantidad)
 * @param {Object} item - Item del carrito
 * @returns {number} Precio total del item
 */
export const calculateItemTotal = (item) => {
  return isValidCartItem(item) ? item.price * item.quantity : 0
}

/**
 * Calcula el subtotal de todos los items en el carrito
 * @param {Array} cartItems - Items del carrito
 * @returns {number} Subtotal total
 * @example
 * const total = calculateCartSubtotal(cartItems)
 * // 10597 (suma de todos los precios * cantidades)
 */
export const calculateCartSubtotal = (cartItems) => {
  if (!Array.isArray(cartItems)) return 0

  return cartItems.reduce((sum, item) => {
    return sum + calculateItemTotal(item)
  }, 0)
}

/**
 * Cuenta la cantidad total de items en el carrito
 * @param {Array} cartItems - Items del carrito
 * @returns {number} Cantidad total (suma de todas las cantidades)
 * @example
 * const count = calculateCartItemCount(cartItems)
 * // 4 (si hay items con cantidades 1, 2, 1)
 */
export const calculateCartItemCount = (cartItems) => {
  if (!Array.isArray(cartItems)) return 0

  return cartItems.reduce((count, item) => {
    return count + (isValidCartItem(item) ? item.quantity : 0)
  }, 0)
}

/**
 * Encuentra el índice de un producto en el carrito por ID
 * @param {Array} cartItems - Items del carrito
 * @param {number} productId - ID del producto a buscar
 * @returns {number} Índice del producto o -1 si no existe
 */
const findCartItemIndex = (cartItems, productId) => {
  return cartItems.findIndex(item => item.id === productId)
}

/**
 * Agrega un producto al carrito o incrementa su cantidad si ya existe
 * @param {Array} cartItems - Items actuales del carrito
 * @param {Object} product - Producto a agregar
 * @returns {Array} Nuevo array con el producto agregado o actualizado
 * @throws {Error} Si el producto es inválido
 * @example
 * const updated = addOrUpdateCartItem(cartItems, product)
 */
export const addOrUpdateCartItem = (cartItems, product) => {
  if (!product?.id) {
    throw new Error('Producto inválido: falta ID')
  }

  const index = findCartItemIndex(cartItems, product.id)
  const newItems = [...cartItems]

  if (index > -1) {
    // Producto existe: incrementar cantidad (máximo 99)
    newItems[index] = {
      ...newItems[index],
      quantity: Math.min(newItems[index].quantity + 1, 99)
    }
  } else {
    // Nuevo producto: agregar con cantidad 1
    newItems.push({ ...product, quantity: 1 })
  }

  return newItems
}

/**
 * Actualiza la cantidad de un producto en el carrito
 * @param {Array} cartItems - Items actuales del carrito
 * @param {number} productId - ID del producto a actualizar
 * @param {number} quantity - Nueva cantidad
 * @returns {Array} Nuevo array actualizado
 * @throws {Error} Si la cantidad es inválida o producto no existe
 */
export const updateCartItemQuantity = (cartItems, productId, quantity) => {
  if (quantity < 1 || quantity > 99 || !Number.isInteger(quantity)) {
    throw new Error('Cantidad debe estar entre 1 y 99 (números enteros)')
  }

  const index = findCartItemIndex(cartItems, productId)
  if (index === -1) {
    throw new Error('Producto no encontrado en el carrito')
  }

  const newItems = [...cartItems]
  newItems[index] = { ...newItems[index], quantity }

  return newItems
}

/**
 * Elimina un producto del carrito
 * @param {Array} cartItems - Items actuales
 * @param {number} productId - ID del producto a eliminar
 * @returns {Array} Nuevo array sin el producto
 */
export const removeCartItem = (cartItems, productId) => {
  return cartItems.filter(item => item.id !== productId)
}

/**
 * Vacía completamente el carrito
 * @returns {Array} Array vacío
 */
export const clearCart = () => {
  return []
}

/**
 * Obtiene un resumen completo del carrito
 * @param {Array} cartItems - Items del carrito
 * @returns {Object} Resumen con { subtotal, total, itemCount, items, isEmpty, averagePrice }
 * @example
 * const summary = getCartSummary(cartItems)
 * // {
 * //   subtotal: 10597,
 * //   total: 10597,
 * //   itemCount: 4,
 * //   items: 3,
 * //   isEmpty: false,
 * //   averagePrice: 2649
 * // }
 */
export const getCartSummary = (cartItems) => {
  const subtotal = calculateCartSubtotal(cartItems)
  const itemCount = calculateCartItemCount(cartItems)

  return {
    subtotal,
    total: subtotal, // En futuro: + impuestos, envío, descuentos
    itemCount,       // Cantidad total de unidades
    items: cartItems.length, // Cantidad de productos distintos
    isEmpty: cartItems.length === 0,
    averagePrice: itemCount > 0 ? Math.round(subtotal / itemCount) : 0
  }
}

/**
 * Valida que todos los items del carrito sean válidos
 * @param {Array} cartItems - Items a validar
 * @returns {Object} { valid, errors, invalidItems }
 */
export const validateCart = (cartItems) => {
  const errors = []
  const invalidItems = []

  if (!Array.isArray(cartItems)) {
    return {
      valid: false,
      errors: ['Carrito debe ser un array'],
      invalidItems: []
    }
  }

  cartItems.forEach((item, index) => {
    if (!isValidCartItem(item)) {
      invalidItems.push({
        index,
        id: item?.id,
        error: `Item inválido en posición ${index}`
      })
    }
  })

  if (invalidItems.length > 0) {
    errors.push(`${invalidItems.length} items inválidos`)
  }

  return {
    valid: errors.length === 0,
    errors,
    invalidItems
  }
}

/**
 * Busca un producto en el carrito por ID
 * @param {Array} cartItems - Items del carrito
 * @param {number} productId - ID del producto
 * @returns {Object|null} El item encontrado o null
 */
export const findCartItem = (cartItems, productId) => {
  const index = findCartItemIndex(cartItems, productId)
  return index > -1 ? cartItems[index] : null
}

/**
 * Verifica si un producto ya está en el carrito
 * @param {Array} cartItems - Items del carrito
 * @param {number} productId - ID del producto
 * @returns {boolean} True si el producto está en el carrito
 */
export const isProductInCart = (cartItems, productId) => {
  return findCartItemIndex(cartItems, productId) > -1
}