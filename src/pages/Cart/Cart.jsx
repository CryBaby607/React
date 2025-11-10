import { createContext, useContext, useState, useMemo } from 'react'
import {
  addOrUpdateCartItem,
  updateCartItemQuantity,
  removeCartItem,
  getCartSummary,
  validateCart
} from '../utils/cartHelpers'

// Crear el contexto
const CartContext = createContext()

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Nike Air Max 270',
      price: 3299,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      category: 'Hombre',
      quantity: 1
    },
    {
      id: 2,
      name: 'Adidas Ultraboost',
      price: 3799,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop',
      category: 'Mujer',
      quantity: 2
    },
    {
      id: 3,
      name: 'Jordan Retro 1',
      price: 4299,
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=500&fit=crop',
      category: 'Gorras',
      quantity: 1
    }
  ])

  /**
   * Agregar producto al carrito (o incrementar cantidad si existe)
   * @param {Object} product - Producto a agregar
   */
  const addToCart = (product) => {
    try {
      const updated = addOrUpdateCartItem(cartItems, product)
      const validation = validateCart(updated)

      if (!validation.valid) {
        console.error('Carrito inválido después de agregar:', validation.errors)
        return
      }

      setCartItems(updated)
    } catch (error) {
      console.error('Error al agregar producto:', error.message)
    }
  }

  /**
   * Actualizar cantidad de un producto
   * @param {number} productId - ID del producto
   * @param {number} quantity - Nueva cantidad
   */
  const updateQuantity = (productId, quantity) => {
    try {
      const updated = updateCartItemQuantity(cartItems, productId, quantity)
      setCartItems(updated)
    } catch (error) {
      console.error('Error al actualizar cantidad:', error.message)
    }
  }

  /**
   * Eliminar producto del carrito
   * @param {number} productId - ID del producto
   */
  const removeFromCart = (productId) => {
    try {
      const updated = removeCartItem(cartItems, productId)
      setCartItems(updated)
    } catch (error) {
      console.error('Error al eliminar producto:', error.message)
    }
  }

  /**
   * Calcular resumen del carrito de forma memoizada
   * Solo se recalcula cuando cartItems cambia
   */
  const summary = useMemo(() => {
    return getCartSummary(cartItems)
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        subtotal: summary.subtotal,
        total: summary.total,
        itemCount: summary.itemCount,
        isEmpty: summary.isEmpty
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

/**
 * Hook personalizado para acceder al contexto del carrito
 * @returns {Object} { cartItems, addToCart, updateQuantity, removeFromCart, ... }
 * @throws {Error} Si se usa fuera del CartProvider
 */
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider')
  }
  return context
}