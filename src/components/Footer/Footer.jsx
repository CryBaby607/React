import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      {/* Sección principal del footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            
            {/* Columna 1: Información de la marca */}
            <div className="footer-column">
              <div className="footer-brand">
                <h3 className="footer-logo">
                  <span className="logo-du">DU</span>
                  <span className="logo-kicks">KICKS</span>
                </h3>
                <p className="footer-description">
                  Tu destino para el mejor calzado deportivo y streetwear. 
                  Encuentra las últimas tendencias y los clásicos que nunca pasan de moda.
                </p>
              </div>
              
              {/* Redes sociales */}
              <div className="footer-social">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Síguenos en Facebook"
                  className="social-link"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Síguenos en Instagram"
                  className="social-link"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Síguenos en Twitter"
                  className="social-link"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Síguenos en TikTok"
                  className="social-link"
                >
                  <i className="fab fa-tiktok"></i>
                </a>
              </div>
            </div>

            {/* Columna 2: Enlaces rápidos */}
            <div className="footer-column">
              <h4 className="footer-title">Comprar</h4>
              <ul className="footer-links">
                <li>
                  <a href="#hombre">Hombre</a>
                </li>
                <li>
                  <a href="#mujer">Mujer</a>
                </li>
                <li>
                  <a href="#gorras">Gorras</a>
                </li>
                <li>
                  <a href="#novedades">Novedades</a>
                </li>
                <li>
                  <a href="#ofertas">Ofertas</a>
                </li>
              </ul>
            </div>

            {/* Columna 3: Ayuda */}
            <div className="footer-column">
              <h4 className="footer-title">Ayuda</h4>
              <ul className="footer-links">
                <li>
                  <a href="#envios">Envíos y entregas</a>
                </li>
                <li>
                  <a href="#devoluciones">Devoluciones</a>
                </li>
                <li>
                  <a href="#pagos">Formas de pago</a>
                </li>
                <li>
                  <a href="#faq">Preguntas frecuentes</a>
                </li>
                <li>
                  <a href="#contacto">Contacto</a>
                </li>
              </ul>
            </div>

            {/* Columna 4: Newsletter */}
            <div className="footer-column">
              <h4 className="footer-title">Únete a la comunidad</h4>
              <p className="footer-newsletter-text">
                Suscríbete y recibe ofertas exclusivas, novedades y descuentos especiales.
              </p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <div className="newsletter-input-wrapper">
                  <input 
                    type="email" 
                    placeholder="Tu correo electrónico"
                    className="newsletter-input"
                    aria-label="Correo electrónico para newsletter"
                    required
                  />
                  <button 
                    type="submit" 
                    className="newsletter-btn"
                    aria-label="Suscribirse al newsletter"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* Sección inferior del footer */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            {/* Copyright */}
            <p className="footer-copyright">
              &copy; {currentYear} <strong>DUKICKS</strong>. Todos los derechos reservados.
            </p>

            {/* Métodos de pago */}
            <div className="footer-payment">
              <span className="payment-icon" aria-label="Visa">
                <i className="fab fa-cc-visa"></i>
              </span>
              <span className="payment-icon" aria-label="Mastercard">
                <i className="fab fa-cc-mastercard"></i>
              </span>
              <span className="payment-icon" aria-label="PayPal">
                <i className="fab fa-cc-paypal"></i>
              </span>
              <span className="payment-icon" aria-label="American Express">
                <i className="fab fa-cc-amex"></i>
              </span>
            </div>

            {/* Enlaces legales */}
            <div className="footer-legal">
              <a href="#privacidad">Privacidad</a>
              <span className="separator">|</span>
              <a href="#terminos">Términos</a>
            </div>
          </div>
        </div>
      </div>

      {/* CDN de Font Awesome */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />
    </footer>
  )
}

export default Footer