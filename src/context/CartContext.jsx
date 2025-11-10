import { createContext, useContext, useState } from 'react'

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

  // Agregar producto al carrito
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  // Actualizar cantidad de producto
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return
    setCartItems(cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    ))
  }

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId))
  }

  // Calcular subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  // Calcular total (sin impuestos para este ejemplo)
  const total = subtotal

  // Cantidad total de productos
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      subtotal,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider')
  }
  return context
}