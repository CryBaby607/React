import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import './Admin.css'

function Admin() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([
    { id: 1, name: 'Nike Air Max 270', price: 3299, category: 'Hombre', stock: 10 },
    { id: 2, name: 'Adidas Ultraboost', price: 3799, category: 'Mujer', stock: 8 },
  ])
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ name: '', price: '', category: '', stock: '' })

  const handleAddProduct = (e) => {
    e.preventDefault()
    if (formData.name && formData.price && formData.category && formData.stock) {
      if (editingId) {
        setProducts(products.map(p =>
          p.id === editingId
            ? { ...p, ...formData, price: Number(formData.price), stock: Number(formData.stock) }
            : p
        ))
        setEditingId(null)
      } else {
        const newProduct = {
          id: Date.now(),
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        }
        setProducts([...products, newProduct])
      }
      setFormData({ name: '', price: '', category: '', stock: '' })
    }
  }

  const handleEdit = (product) => {
    setEditingId(product.id)
    setFormData(product)
  }

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({ name: '', price: '', category: '', stock: '' })
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <h1 className="admin-title">
              <span className="logo-du">DU</span>
              <span className="logo-kicks">KICKS</span> Admin
            </h1>
            <div className="admin-user-info">
              <span className="user-email">{user?.email}</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="container">
          {/* Formulario */}
          <div className="admin-form-section">
            <h2 className="section-title">
              {editingId ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </h2>

            <div className="product-form">
              <input
                type="text"
                placeholder="Nombre del producto"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <input
                type="number"
                placeholder="Precio"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />

              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Selecciona Categoría</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Gorras">Gorras</option>
              </select>

              <input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />

              <div className="form-buttons">
                <button onClick={handleAddProduct} className="btn btn-primary">
                  {editingId ? 'Actualizar' : 'Agregar'}
                </button>
                {editingId && (
                  <button onClick={handleCancel} className="btn btn-secondary">
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tabla de productos */}
          <div className="admin-table-section">
            <h2 className="section-title">Productos</h2>
            <div className="table-wrapper">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="empty-message">
                        No hay productos. ¡Agrega uno nuevo!
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>${product.price}</td>
                        <td>{product.stock} unidades</td>
                        <td className="action-buttons">
                          <button
                            onClick={() => handleEdit(product)}
                            className="btn-action btn-edit"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="btn-action btn-delete"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="admin-stats">
            <div className="stat-card">
              <p className="stat-label">Total de Productos</p>
              <p className="stat-value">{products.length}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Valor Total en Inventario</p>
              <p className="stat-value">${products.reduce((sum, p) => sum + p.price * p.stock, 0)}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Stock Total</p>
              <p className="stat-value">{products.reduce((sum, p) => sum + p.stock, 0)}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Admin