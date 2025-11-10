import { useState, useMemo, useCallback } from 'react'
import { useCart } from '../../context/CartContext'
import { getProductsByCategory } from '../../data/Products'
import { sortProducts, getSortOptions } from '../../utils/sorting'
import { getUniqueBrands, applyFilters } from '../../utils/filters'
import ProductCard from '../../components/ProductCard/ProductCard'
import './Category.css'

function CategoryPage({ category }) {
  const { addToCart } = useCart()
  const [selectedBrand, setSelectedBrand] = useState('Todas')
  const [sortBy, setSortBy] = useState('newest')

  // Obtener todos los productos de la categoría (memoizado)
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
   * El ProductCard ya normaliza el producto, solo pasamos el callback
   */
  const handleAddToCart = useCallback((cartItem) => {
    try {
      addToCart(cartItem)
      // Feedback al usuario (en futuro: usar Toast)
      alert(`${cartItem.name} agregado al carrito`)
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
      {/* Header de categoría */}
      <div className="category-header">
        <div className="container">
          <h1 className="category-title">{categoryTitles[category] || category}</h1>
        </div>
      </div>

      <div className="container">
        <div className="category-wrapper">
          
          {/* ===== SIDEBAR: FILTROS ===== */}
          <aside className="category-sidebar">
            
            {/* Filtro de Marca */}
            <div className="filter-section">
              <h3 className="filter-title">Marcas</h3>
              <div className="filter-brands">
                {brandsInCategory.map(brand => (
                  <button
                    key={brand}
                    className={`brand-btn ${selectedBrand === brand ? 'active' : ''}`}
                    onClick={() => setSelectedBrand(brand)}
                    aria-pressed={selectedBrand === brand}
                  >
                    {brand}
                    <span className="brand-count">
                      ({brand === 'Todas'
                        ? allProducts.length
                        : allProducts.filter(p => p.brand === brand).length})
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

          {/* ===== CONTENIDO PRINCIPAL ===== */}
          <section className="category-content">
            
            {/* Info de productos */}
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

            {/* ===== GRID DE PRODUCTOS ===== */}
            <div className="category-products-grid">
              {sortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  variant="default"
                  showCategory={false}
                  showStock={true}
                />
              ))}
            </div>

            {/* Mensaje si no hay productos */}
            {sortedProducts.length === 0 && (
              <div className="no-products">
                <p>No hay productos disponibles con los filtros seleccionados</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage