import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../../context/CartContext'
import {
  getProductsByCategory,
  getPriceWithDiscount,
  getBrands
} from '../../data/Products'
import './Category.css'

function CategoryPage({ category }) {
  const { addToCart } = useCart()
  const [selectedBrand, setSelectedBrand] = useState('Todas')
  const [sortBy, setSortBy] = useState('newest')

  // Obtener todos los productos de la categoría
  let filteredProducts = getProductsByCategory(category)

  // Obtener marcas únicas de esta categoría
  const brandsInCategory = [
    'Todas',
    ...new Set(filteredProducts.map(p => p.brand))
  ]

  // Filtrar por marca
  if (selectedBrand !== 'Todas') {
    filteredProducts = filteredProducts.filter(p => p.brand === selectedBrand)
  }

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

  // Mapeo de títulos de categoría
  const categoryTitles = {
    'Hombre': 'Tenis Hombre',
    'Mujer': 'Tenis Mujer',
    'Gorras': 'Gorras'
  }

  return (
    <div className="category-page">
      <div className="container">
        <div className="category-wrapper">
          {/* Sidebar Filtros */}
          <aside className="category-sidebar">
            {/* Filtro de Marca */}
            <div className="filter-section">
              <h3 className="filter-title">Marcas</h3>
              <div className="filter-brands">
                {brandsInCategory.map(brand => (
                  <button
                    key={brand}
                    className={`brand-btn ${
                      selectedBrand === brand ? 'active' : ''
                    }`}
                    onClick={() => setSelectedBrand(brand)}
                  >
                    {brand}
                    <span className="brand-count">
                      ({getProductsByCategory(category).filter(p =>
                        brand === 'Todas' ? true : p.brand === brand
                      ).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ordenamiento */}
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

          {/* Contenido Principal */}
          <section className="category-content">
            <div className="products-info">
              <p className="products-count">
                Mostrando {filteredProducts.length} de{' '}
                {getProductsByCategory(category).length} productos
              </p>
              {selectedBrand !== 'Todas' && (
                <p className="filter-applied">
                  Filtrado por: <strong>{selectedBrand}</strong>
                </p>
              )}
            </div>

            {/* Grid de Productos */}
            <div className="category-products-grid">
              {filteredProducts.map(product => (
                <article key={product.id} className="category-product-card">
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
                  <div className="category-product-image-wrapper">
                    <img
                      src={product.images[0]}
                      alt={product.model}
                      className="category-product-image"
                      loading="lazy"
                    />
                    <div className="product-overlay">
                      <button
                        className="btn btn-primary btn-add-to-cart"
                        onClick={() => handleAddToCart(product)}
                        title="Agregar al carrito"
                      >
                        <FontAwesomeIcon icon={faShoppingCart} />
                        Agregar
                      </button>
                    </div>
                  </div>

                  {/* Información */}
                  <div className="category-product-info">
                    <div className="product-header">
                      <h3 className="category-product-brand">
                        {product.brand}
                      </h3>
                      <span className="category-product-rating">
                        ⭐ {product.rating}
                      </span>
                    </div>

                    <p className="category-product-model">{product.model}</p>

                    {/* Precios */}
                    <div className="product-prices">
                      {product.discount > 0 ? (
                        <>
                          <span className="original-price">
                            {formatPrice(product.price)}
                          </span>
                          <span className="final-price">
                            {formatPrice(getPriceWithDiscount(product))}
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
                <p>
                  No hay productos disponibles con los filtros seleccionados
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage