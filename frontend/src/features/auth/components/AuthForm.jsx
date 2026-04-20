import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { AUTH_CONFIG } from '../../../utils/constants'
import s from './AuthForm.module.css'

export default function AuthForm() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')

  const { loading, error, login, register } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (mode === 'login') {
      const { error } = await login({ email, password })
      if (!error) navigate('/feed')
    } else {
      const { error } = await register({ email, password, fullName })
      if (!error) navigate('/feed')
    }
  }

  function switchMode() {
    setMode(mode === 'login' ? 'register' : 'login')
    setEmail(''); setPassword(''); setFullName('')
  }

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <p className={s.logo}>LaSalle Connect</p>
        <p className={s.subtitle}>
          {mode === 'login' ? 'Inicia sesión para continuar' : 'Crea tu cuenta institucional'}
        </p>

        <form className={s.form} onSubmit={handleSubmit}>
          {mode === 'register' && (
            <input
              id="register-name"
              name="nombre"
              type="text"
              placeholder="Nombre completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          )}
          <input
            id="auth-email"
            name="email"
            type="email"
            placeholder={`correo@${AUTH_CONFIG.allowedDomain}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            id="auth-password"
            name="password"
            type="password"
            placeholder="Contraseña (mín. 8 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className={s.error}>{error}</p>}
          <button className={s.btnPrimary} type="submit" disabled={loading}>
            {loading ? 'Cargando...' : mode === 'login' ? 'Entrar' : 'Registrarse'}
          </button>
        </form>

        <div className={s.toggle}>
          {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          <button className={s.toggleBtn} onClick={switchMode}>
            {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  )
}
