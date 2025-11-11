import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { formatPrice } from '../../utils/formatters'
import { getPriceWithDiscount } from '../../data/Products'
import './ProductCard.css'

/**
 * Componente ProductCard - Tarjeta reutilizable para mostrar productos
 * 
 * @param {Object} props
 * @param {Object} props.product - Objeto del producto
 * @param {Function} props.onAddToCart - Callback al agregar al carrito
 * @param {boolean} props.showOverlay - Mostrar overlay con botón (default: true)
 * @param {string} props.variant - Variante visual: 'default' | 'featured' | 'compact'
 * @param {boolean} props.showCategory - Mostrar categoría (default: true)
 * 
 * @example
 * <ProductCard 
 *   product={product} 
 *   onAddToCart={handleAdd}
 *   variant="featured"
 * />
 */
function ProductCard({ 
  product, 
  onAddToCart,
  showOverlay = true,
  variant = 'default',
  showCategory = true
}) {
  
  // ========================================
  // CÁLCULOS DERIVADOS
  // ========================================
  
  // Calcular precio final (con o sin descuento)
  const finalPrice = product.discount > 0 
    ? getPriceWithDiscount(product)
    : product.price

  // Determinar nombre completo del producto
  const productName = product.brand 
    ? `${product.brand} ${product.model}` 
    : product.name

  // Determinar imagen a mostrar (puede venir como array o string)
  const productImage = Array.isArray(product.images) 
    ? product.images[0] 
    : product.image

  
  // ========================================
  // MANEJADORES DE EVENTOS
  // ========================================
  
  /**
   * Maneja el click en el botón "Agregar al Carrito"
   * Previene la navegación y ejecuta el callback
   */
  const handleAddClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (onAddToCart && typeof onAddToCart === 'function') {
      // Crear objeto normalizado para el carrito
      const cartItem = {
        id: product.id,
        name: productName,
        price: finalPrice,
        image: productImage,
        category: product.category
      }
      
      onAddToCart(cartItem)
    }
  }

  return (
    <article className={`product-card product-card--${variant}`}>
      
      {/* ===== BADGES (Descuento y Nuevo) ===== */}
      {(product.discount > 0 || product.isNew) && (
        <div className="product-card__badges">
          {product.discount > 0 && (
            <span className="badge badge--discount">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="badge badge--new">
              NUEVO
            </span>
          )}
        </div>
      )}

      {/* ===== IMAGEN Y OVERLAY ===== */}
      <div className="product-card__image-wrapper">
        <img
          src={productImage}
          alt={productName}
          className="product-card__image"
          loading="lazy"
        />
        
        {/* Overlay con botón de agregar (condicional) */}
        {showOverlay && onAddToCart && product.inStock !== false && (
          <div className="product-card__overlay">
            <button
              className="btn btn-primary btn--add-to-cart"
              onClick={handleAddClick}
              aria-label={`Agregar ${productName} al carrito`}
              title={`Agregar ${productName}`}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              <span>Agregar</span>
            </button>
          </div>
        )}
      </div>

      {/* ===== INFORMACIÓN DEL PRODUCTO ===== */}
      <div className="product-card__info">
        
        {/* Categoría (opcional) */}
        {showCategory && product.category && (
          <span className="product-card__category">
            {product.category}
          </span>
        )}
        
        {/* Header: Nombre */}
        <div className="product-card__header">
          <h3 className="product-card__name">
            {product.brand && <span className="product-card__brand">{product.brand}</span>}
            {product.model && <span className="product-card__model">{product.model}</span>}
            {!product.brand && !product.model && product.name}
          </h3>
        </div>

        {/* Descripción corta (solo en variant featured) */}
        {variant === 'featured' && product.description && (
          <p className="product-card__description">
            {product.description.substring(0, 80)}...
          </p>
        )}

        {/* ===== PRECIOS ===== */}
        <div className="product-card__prices">
          {product.discount > 0 ? (
            <>
              <span className="product-card__price product-card__price--original">
                {formatPrice(product.price)}
              </span>
              <span className="product-card__price product-card__price--final">
                {formatPrice(finalPrice)}
              </span>
            </>
          ) : (
            <span className="product-card__price product-card__price--final">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProductCard