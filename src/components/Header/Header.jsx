import { useState } from 'react'
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
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
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
                <a href="#home" onClick={closeMenu}>
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
              <i className="fas fa-magnifying-glass"></i>
            </button>
            <button className="icon-btn cart-btn" aria-label="Shopping cart">
              <i className="fas fa-shopping-cart"></i>
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