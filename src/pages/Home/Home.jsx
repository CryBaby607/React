import './Home.css'

function Home() {
  // Datos de productos destacados
  const featuredProducts = [
    {
      id: 1,
      name: 'Nike Air Max 270',
      price: '$3,299',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      category: 'Hombre',
      isNew: true
    },
    {
      id: 2,
      name: 'Adidas Ultraboost',
      price: '$3,799',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop',
      category: 'Mujer',
      isNew: true
    },
    {
      id: 3,
      name: 'Jordan Retro 1',
      price: '$4,299',
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=500&fit=crop',
      category: 'Hombre',
      isNew: false
    }
  ]

  // Datos de categorías
  const categories = [
    {
      id: 1,
      name: 'Hombre',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=400&fit=crop',
      link: '#hombre'
    },
    {
      id: 2,
      name: 'Mujer',
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=400&fit=crop',
      link: '#mujer'
    },
    {
      id: 3,
      name: 'Gorras',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=400&fit=crop',
      link: '#gorras'
    }
  ]

  // Handler para el formulario de newsletter
  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Aquí puedes agregar la lógica de suscripción
    const email = e.target.elements.email.value
    console.log('Email suscrito:', email)
    // Mostrar mensaje de éxito o enviar a API
    alert('¡Gracias por suscribirte a nuestro newsletter!')
    e.target.reset()
  }

  return (
    <div className="home">
      {/* Font Awesome CDN */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1 className="hero-title">
                Bienvenido a duki
              </h1>
              <p className="hero-description"> 
                Encuentra tu estilo perfecto con las mejores marcas del mercado.
              </p>
              <div className="hero-actions">
                <a href="#productos" className="btn btn-primary">
                  Ver Colección
                </a>
              </div>
            </div>
          </div>
        </div>
        
      </section>

      {/* Categorías Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Compra por Categoría</h2>
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
              <a 
                href={category.link} 
                key={category.id} 
                className="category-card"
                aria-label={`Ver productos de ${category.name}`}
              >
                <div className="category-image-wrapper">
                  <img 
                    src={category.image} 
                    alt={`Categoría ${category.name}`}
                    className="category-image"
                    loading="lazy"
                  />
                  <div className="category-overlay"></div>
                </div>
                <h3 className="category-name">{category.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Productos Destacados</h2>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <article key={product.id} className="product-card">
                {product.isNew && (
                  <span className="product-badge">Nuevo</span>
                )}
                <div className="product-image-wrapper">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                  />
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-footer">
                    <span className="product-price">{product.price}</span>
                    <button 
                      className="btn-add-cart"
                      aria-label={`Agregar ${product.name} al carrito`}
                    >
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="section-cta">
            <a href="#productos" className="btn btn-outline">
              Ver Todos los Productos
            </a>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Más que una tienda, una <span className="highlight">comunidad</span></h2>
              <p>
                En DUKICKS no solo vendemos tenis y gorras, creamos conexiones. 
                Desde 2013, hemos sido el punto de encuentro para los amantes de la cultura urbana y el streetwear.
              </p>
              <p>
                Nuestra pasión por la moda urbana nos impulsa a buscar constantemente las piezas más exclusivas 
                y las colaboraciones más esperadas, siempre manteniendo la autenticidad que nos caracteriza.
              </p>
              
              <div className="stats">
                <div className="stat-item">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Años de Experiencia</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Clientes Satisfechos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">200+</span>
                  <span className="stat-label">Marcas Exclusivas</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Soporte al Cliente</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

          {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2 className="newsletter-title">
                Únete a la comunidad DUKICKS
              </h2>
              <p className="newsletter-description">
                Suscríbete y recibe ofertas exclusivas, lanzamientos anticipados y contenido especial directo en tu inbox.
              </p>
            </div>
            <div className="newsletter-form">
              <div className="newsletter-input-group">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico"
                  className="newsletter-input"
                  aria-label="Correo electrónico para newsletter"
                  id="newsletter-email"
                />
                <button 
                  onClick={(e) => {
                    e.preventDefault()
                    const email = document.getElementById('newsletter-email').value
                    if (email) {
                      console.log('Email suscrito:', email)
                      alert('¡Gracias por suscribirte a nuestro newsletter!')
                      document.getElementById('newsletter-email').value = ''
                    }
                  }}
                  className="newsletter-btn"
                  aria-label="Suscribirse al newsletter"
                >
                  Suscribirme
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home