// src/components/Footer/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-dukicks">
      {/* Columna 1: Información Legal y Derechos Reservados */}
      <div className="footer-legal">
        <p className="footer-logo">Dukicks</p>
        <p className="copyright">© {new Date().getFullYear()} Derechos reservados.</p>
      </div>

      {/* Columna 2: Enlaces Rápidos (Quick Links) */}
      <nav className="footer-links">
        {/* Usamos los enlaces definidos en tu wireframe */}
        <Link to="/">Inicio</Link>
        <Link to="/catalogo">Catálogo</Link>
        
        {/* Estos enlaces deberían llevar a las páginas correspondientes */}
        <Link to="/quienes-somos">Por qué elegir Dukicks</Link>
        <Link to="/contacto">Únete a la comunidad</Link>
        
        {/* Opcional: Enlaces a redes sociales */}
        {/* <div className="social-icons"> [Icono Instagram] [Icono Facebook] </div> */}
      </nav>
    </footer>
  );
};

export default Footer;