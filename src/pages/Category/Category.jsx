import { useState, useMemo, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../../context/CartContext'
import { getProductsByCategory, getPriceWithDiscount } from '../../data/Products'
import { formatPrice } from '../../utils/formatters'
import { sortProducts, getSortOptions } from '../../utils/sorting'
import { getUniqueBrands, applyFilters } from '../../utils/filters'
import './Category.css'

function CategoryPage({ category }) {
  const { addToCart } = useCart()
  const [selectedBrand, setSelectedBrand] = useState('Todas')
  const [sortBy, setSortBy] = useState('newest')

  // Obtener todos los productos de la categoría
  const allProducts = useMemo(
    () => getProductsByCategory(category),
    [category]
  )

  // Obtener marcas únicas (memoizado)
  const brandsInCategory = useMemo(
    () => getUniqueBrands(allProducts, true),
    [allProducts]
  )

  // Aplicar filtros (memoizado)
  const filteredProducts = useMemo(() => {
    return applyFilters(allProducts, { brand: selectedBrand })
  }, [allProducts, selectedBrand])

  // Aplicar ordenamiento (memoizado)
  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortBy)
  }, [filteredProducts, sortBy])

  /**
   * Agregar producto al carrito
   * Memoizado para evitar recrear función cada render
   */
  const handleAddToCart = useCallback((product) => {
    try {
      const cartItem = {
        id: product.id,
        name: `${product.brand} ${product.model}`,
        price: getPriceWithDiscount(product),
        image: product.images[0],
        category: product.category
      }

      addToCart(cartItem)

      // Feedback al usuario (en futuro: usar Toast)
      alert(`${product.brand} ${product.model} agregado al carrito`)
    } catch (error) {
      console.error('Error al agregar al carrito:', error)
      alert('Error al agregar producto')
    }
  }, [addToCart])

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
                    aria-pressed={selectedBrand === brand}
                  >
                    {brand}
                    <span className="brand-count">
                      (
                      {brand === 'Todas'
                        ? allProducts.length
                        : allProducts.filter(p => p.brand === brand).length}
                      )
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
                aria-label="Ordenar productos"
              >
                {getSortOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          {/* Contenido Principal */}
          <section className="category-content">
            <div className="products-info">
              <p className="products-count">
                Mostrando {sortedProducts.length} de {allProducts.length} productos
              </p>
              {selectedBrand !== 'Todas' && (
                <p className="filter-applied">
                  Filtrado por: <strong>{selectedBrand}</strong>
                </p>
              )}
            </div>

            {/* Grid de Productos */}
            <div className="category-products-grid">
              {sortedProducts.map(product => (
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
                        title={`Agregar ${product.brand} ${product.model} al carrito`}
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

            {sortedProducts.length === 0 && (
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