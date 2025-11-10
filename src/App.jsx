import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Admin from './pages/Admin/Admin'
import './styles/variables.css'
import './styles/typography.css'
import './styles/global.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                  <Admin />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header />
                <main>
                  <Home />
                </main>
                <Footer />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App