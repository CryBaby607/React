import { createContext, useContext, useState } from 'react'

// Crear el contexto
const CartContext = createContext()

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  // ✅ ESTADO INICIAL: Carrito vacío
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    
    if (existingItem) {
      // Producto ya existe: incrementar cantidad (máximo 99)
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
          : item
      ))
    } else {
      // Producto nuevo: agregar con cantidad 1
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  /**
   * Actualizar cantidad de un producto específico
   * @param {number} productId - ID del producto
   * @param {number} quantity - Nueva cantidad (1-99)
   */
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1 || quantity > 99) return
    
    setCartItems(cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    ))
  }

  /**
   * Eliminar producto del carrito
   * @param {number} productId - ID del producto a eliminar
   */
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId))
  }

  /**
   * Vaciar completamente el carrito
   */
  const clearCart = () => {
    setCartItems([])
  }

  // ========================================
  // CÁLCULOS DERIVADOS
  // ========================================

  // Calcular subtotal (suma de precio * cantidad de cada item)
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price * item.quantity), 
    0
  )

  // Calcular total (en el futuro: subtotal + impuestos + envío - descuentos)
  const total = subtotal

  // Cantidad total de items (suma de todas las cantidades)
  const itemCount = cartItems.reduce(
    (acc, item) => acc + item.quantity, 
    0
  )

  // Verificar si el carrito está vacío
  const isEmpty = cartItems.length === 0

  return (
    <CartContext.Provider value={{
      // Estado
      cartItems,
      isEmpty,
      
      // Acciones
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      
      // Cálculos
      subtotal,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

/**
 * Hook personalizado para usar el contexto del carrito
 * Debe usarse dentro de un componente envuelto por CartProvider
 * @returns {Object} Contexto del carrito con estado y métodos
 * @throws {Error} Si se usa fuera del CartProvider
 */
export const useCart = () => {
  const context = useContext(CartContext)
  
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider')
  }
  
  return context
}