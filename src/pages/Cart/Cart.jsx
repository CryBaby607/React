import { useCart } from '../../context/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './Cart.css'

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, subtotal, total } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const getSubtotal = (price, quantity) => price * quantity

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <div className="empty-content">
            <h1 className="empty-title">Tu carrito está vacío</h1>
            <p className="empty-description">
              Parece que aún no has agregado productos a tu carrito.
            </p>
            <a href="/" className="btn btn-primary">
              Seguir comprando
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Tu Carrito de Compras</h1>

        <div className="cart-wrapper">
          {/* Lista de productos */}
          <div className="cart-items-section">
            <div className="cart-items-header">
              <span className="header-products">Productos</span>
              <span className="header-price">Precio</span>
              <span className="header-quantity">Cantidad</span>
              <span className="header-subtotal">Subtotal</span>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <article key={item.id} className="cart-item">
                  {/* Imagen del producto */}
                  <div className="item-image-wrapper">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                      loading="lazy"
                    />
                  </div>

                  {/* Información del producto */}
                  <div className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-category">{item.category}</p>
                  </div>

                  {/* Precio unitario */}
                  <div className="item-price">
                    <span className="price-label">Precio:</span>
                    <span className="price-value">{formatPrice(item.price)}</span>
                  </div>

                  {/* Control de cantidad */}
                  <div className="item-quantity">
                    <label htmlFor={`quantity-${item.id}`} className="quantity-label">
                      Cantidad:
                    </label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      max="99"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="quantity-input"
                      aria-label={`Cantidad de ${item.name}`}
                    />
                  </div>

                  {/* Subtotal */}
                  <div className="item-subtotal">
                    <span className="subtotal-label">Subtotal:</span>
                    <span className="subtotal-value">
                      {formatPrice(getSubtotal(item.price, item.quantity))}
                    </span>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn-remove"
                    aria-label={`Eliminar ${item.name} del carrito`}
                    title="Eliminar producto"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </article>
              ))}
            </div>
          </div>

          {/* Resumen del carrito */}
          <aside className="cart-summary">
            <div className="summary-card">
              <h2 className="summary-title">Resumen del Pedido</h2>

              <div className="summary-row">
                <span className="summary-label">Subtotal:</span>
                <span className="summary-value">{formatPrice(subtotal)}</span>
              </div>

              <div className="summary-row summary-total">
                <span className="summary-label">Total:</span>
                <span className="summary-value total-value">{formatPrice(total)}</span>
              </div>

              <button className="btn btn-primary btn-checkout">
                Proceder al Pago
              </button>

              <a href="/" className="btn btn-secondary btn-continue">
                Continuar Comprando
              </a>

              <p className="summary-note">
                Los impuestos serán calculados en el próximo paso.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Cart