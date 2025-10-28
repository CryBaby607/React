import React from 'react';
import Header from '../components/Header/Header'; // Asegúrate que esta ruta sea correcta
import Footer from '../components/Footer/Footer'; // Asegúrate que esta ruta sea correcta

const Home = () => {
  return (
    <>
      <Header />
      <main style={{ padding: '20px' }}>
        <h2>Página de INICIO (Wireframe completo aquí)</h2>
        <p>¡Bienvenido a DUKICKS!</p>
      </main>
      <Footer />
    </>
  );
};

export default Home;