import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { AUTH_CONFIG } from '../../../utils/constants'
import { Button } from '../../../components/ui'

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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-[1.5rem] border border-slate-200 bg-white px-6 py-8 shadow-soft sm:px-8">
        <p className="text-3xl font-semibold text-slate-900">LaSalle Connect</p>
        <p className="mt-2 text-sm text-slate-600">
          {mode === 'login' ? 'Inicia sesión para continuar' : 'Crea tu cuenta institucional'}
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <input
              id="register-name"
              name="nombre"
              type="text"
              placeholder="Nombre completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
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
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
          <input
            id="auth-password"
            name="password"
            type="password"
            placeholder="Contraseña (mín. 8 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
          {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? 'Cargando...' : mode === 'login' ? 'Entrar' : 'Registrarse'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button type="button" className="font-semibold text-sky-700 hover:text-sky-800" onClick={switchMode}>
            {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  )
}
