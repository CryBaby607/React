
import { useState } from 'react'
import './styles/variables.css'
import './styles/typography.css'
import './styles/global.css'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Home />
      </main>
      <Footer />
    </div>
  )
}