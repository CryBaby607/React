import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../../context/CartContext'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount } = useCart()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <Link to="/" onClick={closeMenu}>
              <span className="logo-text">
                <span className="logo-du">DU</span>
                <span className="logo-kicks">KICKS</span>
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              <li>
                <Link to="/" onClick={closeMenu}>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/hombre" onClick={closeMenu}>
                  Hombre
                </Link>
              </li>
              <li>
                <Link to="/mujer" onClick={closeMenu}>
                  Mujer
                </Link>
              </li>
              <li>
                <Link to="/gorras" onClick={closeMenu}>
                  Gorras
                </Link>
              </li>
            </ul>
          </nav>

          {/* Icons and Hamburger */}
          <div className="header-controls">
            <button className="icon-btn" aria-label="Search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>

            {/* Link al carrito */}
            <Link
              to="/cart"
              className="icon-btn cart-btn"
              aria-label="Shopping cart"
              onClick={closeMenu}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              {itemCount > 0 && (
                <span className="cart-badge">{itemCount}</span>
              )}
            </Link>

            {/* Toggle Menu Mobile */}
            <button
              className={`hamburger ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header