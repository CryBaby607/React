// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar los componentes de PÁGINA que representan tus wireframes
// Vamos a usar nombres simples por ahora:
import HomePage from './pages/Home';
import CatalogPage from './pages/Catalog';
import AboutPage from './pages/About'; // Quiénes Somos
import ContactPage from './pages/Contact';
import ProductDetailPage from './pages/ProductDetail';

function App() {
  return (
    // <Router> debe envolver toda la aplicación para habilitar el enrutamiento
    <Router>
      <Routes>
        {/* Ruta para la página principal (Home) */}
        <Route path="/" element={<HomePage />} />
        
        {/* Ruta para la página de Catálogo (Listado de productos) */}
        <Route path="/catalogo" element={<CatalogPage />} />
        
        {/* Ruta para la página Quiénes Somos */}
        <Route path="/quienes-somos" element={<AboutPage />} />
        
        {/* Ruta para la página Contacto */}
        <Route path="/contacto" element={<ContactPage />} />
        
        {/* Ruta para la página de Detalle de Producto
            :productId es un parámetro dinámico para identificar qué producto mostrar */}
        <Route path="/producto/:productId" element={<ProductDetailPage />} />
        
        {/* Ruta de contingencia para cualquier URL no definida (404) */}
        <Route path="*" element={<div><h1>404</h1><p>Página no encontrada</p></div>} /> 
      </Routes>
    </Router>
  );
}

export default App;
