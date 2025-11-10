import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Admin from './pages/Admin/Admin'
import './styles/variables.css'
import './styles/typography.css'
import './styles/global.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Ruta Login - Sin Header ni Footer */}
          <Route path="/login" element={<Login />} />

          {/* Ruta Admin - Protegida, sin Header ni Footer */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* Ruta Home - Con Header y Footer */}
          <Route
            path="/"
            element={
              <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header />
                <main style={{ flex: 1 }}>
                  <Home />
                </main>
                <Footer />
              </div>
            }
          />

          {/* Rutas no encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App