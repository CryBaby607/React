import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../../context/CartContext'
import {
  getCategories,
  getProductsByCategory,
  mockProducts,
  getPriceWithDiscount
} from '../../data/Products'
import './Shop.css'

function Shop() {
  const { addToCart } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('Hombre')
  const [sortBy, setSortBy] = useState('newest')

  const categories = getCategories()
  let filteredProducts = getProductsByCategory(selectedCategory)

  // Aplicar ordenamiento
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'newest') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.isNew - a.isNew)
  } else if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: `${product.brand} ${product.model}`,
      price: getPriceWithDiscount(product),
      image: product.images[0],
      category: product.category
    })
    alert(`${product.brand} ${product.model} agregado al carrito`)
  }

  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-wrapper">
          {/* Filtros Sidebar */}
          <aside className="shop-sidebar">
            <div className="filter-section">
              <h3 className="filter-title">Categorías</h3>
              <div className="filter-categories">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`category-btn ${
                      selectedCategory === category ? 'active' : ''
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                    <span className="product-count">
                      ({getProductsByCategory(category).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Ordenar Por</h3>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Más Nuevos</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Calificados</option>
              </select>
            </div>
          </aside>

          {/* Productos Grid */}
          <section className="shop-content">
            <div className="products-info">
              <p className="products-count">
                Mostrando {filteredProducts.length} productos
              </p>
            </div>

            <div className="shop-products-grid">
              {filteredProducts.map(product => (
                <article key={product.id} className="shop-product-card">
                  {/* Badges */}
                  <div className="product-badges">
                    {product.discount > 0 && (
                      <span className="badge badge-discount">
                        -{product.discount}%
                      </span>
                    )}
                    {product.isNew && (
                      <span className="badge badge-new">NUEVO</span>
                    )}
                  </div>

                  {/* Imagen */}
                  <div className="shop-product-image-wrapper">
                    <img
                      src={product.images[0]}
                      alt={product.model}
                      className="shop-product-image"
                      loading="lazy"
                    />
                    <div className="product-overlay">
                      <button
                        className="btn btn-primary btn-add-to-cart"
                        onClick={() => handleAddToCart(product)}
                        title="Agregar al carrito"
                      >
                        <FontAwesomeIcon icon={faShoppingCart} />
                        Agregar al carrito
                      </button>
                    </div>
                  </div>

                  {/* Información del producto */}
                  <div className="shop-product-info">
                    <div className="product-header">
                      <h3 className="shop-product-brand">{product.brand}</h3>
                      <span className="shop-product-rating">
                        ⭐ {product.rating}
                      </span>
                    </div>

                    <p className="shop-product-model">{product.model}</p>

                    <p className="shop-product-category">{product.category}</p>

                    {/* Precios */}
                    <div className="product-prices">
                      {product.discount > 0 ? (
                        <>
                          <span className="original-price">
                            {formatPrice(product.price)}
                          </span>
                          <span className="final-price">
                            {formatPrice(
                              getPriceWithDiscount(product)
                            )}
                          </span>
                        </>
                      ) : (
                        <span className="final-price">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>

                    {/* Stock */}
                    <div className="stock-info">
                      {product.inStock ? (
                        <span className="in-stock">En Stock</span>
                      ) : (
                        <span className="out-of-stock">Agotado</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="no-products">
                <p>No hay productos disponibles en esta categoría</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Shop