import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
            <a href="/" onClick={closeMenu}>
              <span className="logo-text">
                <span className="logo-du">DU</span>
                <span className="logo-kicks">KICKS</span>
              </span>
            </a>
          </div>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              <li>
                <a href="/" onClick={closeMenu}>
                  Inicio
                </a>
              </li>
              <li>
                <a href="#about" onClick={closeMenu}>
                  Hombre
                </a>
              </li>
              <li>
                <a href="#services" onClick={closeMenu}>
                  Mujer
                </a>
              </li>
              <li>
                <a href="#contact" onClick={closeMenu}>
                  Gorras
                </a>
              </li>
            </ul>
          </nav>

          {/* Icons and Hamburger */}
          <div className="header-controls">
            <button className="icon-btn" aria-label="Search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <button className="icon-btn cart-btn" aria-label="Shopping cart">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="cart-badge">1</span>
            </button>

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