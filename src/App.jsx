import { useState } from 'react'
import './config/fontawesome'
import './styles/variables.css'
import './styles/typography.css'
import './styles/global.css'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  )
}