import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import './Login.css'

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (loginData.email && loginData.password) {
      login(loginData.email)
      navigate('/admin')
      setLoginData({ email: '', password: '' })
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">
          <span className="logo-du">DU</span>
          <span className="logo-kicks">KICKS</span>
        </h1>
        <p className="login-subtitle">Panel de Administración</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              placeholder="admin@dukicks.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Iniciar Sesión
          </button>
        </form>

        <p className="login-demo">Demo: usa cualquier email y contraseña</p>
      </div>
    </div>
  )
}

export default Login