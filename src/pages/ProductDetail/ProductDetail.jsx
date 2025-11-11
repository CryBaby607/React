import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faShoppingCart, 
  faArrowLeft, 
  faCheck,
  faTruck,
  faShieldAlt,
  faSync
} from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../../context/CartContext'
import { getProductById, getPriceWithDiscount } from '../../data/Products'
import { formatPrice } from '../../utils/formatters'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Cargar producto al montar o cambiar ID
  useEffect(() => {
    const productData = getProductById(parseInt(id))
    
    if (!productData) {
      navigate('/') // Redirigir si no existe el producto
      return
    }
    
    setProduct(productData)
    setSelectedImage(0)
    setSelectedSize(null)
    setQuantity(1)
  }, [id, navigate])

  // Scroll to top al cargar
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!product) {
    return (
      <div className="product-detail-loading">
        <div className="container">
          <p>Cargando producto...</p>
        </div>
      </div>
    )
  }

  // Calcular precio final
  const finalPrice = product.discount > 0 
    ? getPriceWithDiscount(product)
    : product.price

  // Preparar imágenes
  const images = Array.isArray(product.images) 
    ? product.images 
    : [product.image]

  const productName = product.brand 
    ? `${product.brand} ${product.model}` 
    : product.name

  // Handlers
  const handleAddToCart = () => {
    // Validar talla si el producto tiene tallas
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Por favor selecciona una talla')
      return
    }

    // Agregar al carrito
    addToCart({
      id: product.id,
      name: productName,
      price: finalPrice,
      image: images[0],
      category: product.category,
      size: selectedSize,
      quantity: quantity
    })

    // Mostrar mensaje de éxito
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="product-detail">
      <div className="container">
        
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <Link to={`/${product.category.toLowerCase()}`}>{product.category}</Link>
          <span>/</span>
          <span>{productName}</span>
        </div>

        {/* Botón volver */}
        <button 
          className="btn-back"
          onClick={() => navigate(-1)}
          aria-label="Volver atrás"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Volver</span>
        </button>

        {/* Contenido principal */}
        <div className="detail-wrapper">
          
          {/* Galería de imágenes */}
          <div className="detail-gallery">
            {/* Imagen principal */}
            <div className="gallery-main">
              {product.discount > 0 && (
                <span className="detail-badge detail-badge--discount">
                  -{product.discount}%
                </span>
              )}
              {product.isNew && (
                <span className="detail-badge detail-badge--new">NUEVO</span>
              )}
              <img 
                src={images[selectedImage]} 
                alt={`${productName} - Vista ${selectedImage + 1}`}
                className="gallery-main-image"
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="gallery-thumbnails">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`Ver imagen ${index + 1}`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="detail-info">
            
            {/* Categoría */}
            <span className="detail-category">{product.category}</span>

            {/* Nombre */}
            <h1 className="detail-title">
              {product.brand && <span className="detail-brand">{product.brand}</span>}
              {product.model && <span className="detail-model">{product.model}</span>}
              {!product.brand && !product.model && product.name}
            </h1>

            {/* Precios */}
            <div className="detail-prices">
              {product.discount > 0 ? (
                <>
                  <span className="detail-price detail-price--original">
                    {formatPrice(product.price)}
                  </span>
                  <span className="detail-price detail-price--final">
                    {formatPrice(finalPrice)}
                  </span>
                  <span className="detail-savings">
                    Ahorras {formatPrice(product.price - finalPrice)}
                  </span>
                </>
              ) : (
                <span className="detail-price detail-price--final">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Descripción */}
            {product.description && (
              <div className="detail-description">
                <h3>Descripción</h3>
                <p>{product.description}</p>
              </div>
            )}

            {/* Selector de talla */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="detail-sizes">
                <h3>Selecciona tu talla</h3>
                <div className="sizes-grid">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={selectedSize === size}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cantidad */}
            <div className="detail-quantity">
              <h3>Cantidad</h3>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  aria-label="Disminuir cantidad"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="quantity-input"
                  aria-label="Cantidad"
                />
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 99}
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="detail-actions">
              <button
                className="btn btn-primary btn-add-cart"
                onClick={handleAddToCart}
                disabled={product.inStock === false}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>
                  {product.inStock === false 
                    ? 'Agotado' 
                    : 'Agregar al Carrito'}
                </span>
              </button>

              <Link to="/cart" className="btn btn-secondary">
                Ver Carrito
              </Link>
            </div>

            {/* Mensaje de éxito */}
            {showSuccessMessage && (
              <div className="success-message">
                <FontAwesomeIcon icon={faCheck} />
                <span>¡Producto agregado al carrito!</span>
              </div>
            )}

            {/* Beneficios */}
            <div className="detail-benefits">
              <div className="benefit-item">
                <FontAwesomeIcon icon={faTruck} />
                <div>
                  <h4>Envío Gratis</h4>
                  <p>En compras mayores a $1,000</p>
                </div>
              </div>
              <div className="benefit-item">
                <FontAwesomeIcon icon={faShieldAlt} />
                <div>
                  <h4>Compra Segura</h4>
                  <p>Protección de datos garantizada</p>
                </div>
              </div>
              <div className="benefit-item">
                <FontAwesomeIcon icon={faSync} />
                <div>
                  <h4>Devoluciones</h4>
                  <p>30 días para devoluciones</p>
                </div>
              </div>
            </div>

            {/* Estado de stock */}
            <div className="detail-stock">
              {product.inStock !== false ? (
                <span className="stock-available">
                  <FontAwesomeIcon icon={faCheck} />
                  En Stock
                </span>
              ) : (
                <span className="stock-unavailable">
                  Agotado
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail