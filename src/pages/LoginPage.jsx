import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import { AUTH_CONFIG } from '../utils/constants'
import { Button } from '../components/ui'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { loading, error, login } = useAuth()
  const navigate = useNavigate()

  const isFormValid = email && password

  async function handleSubmit(e) {
    e.preventDefault()
    const { error } = await login({ email, password })
    if (!error) navigate('/feed')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lasalle-white via-slate-50 to-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold font-display text-lasalle-dark mb-2">
            LaSalle<span className="text-lasalle-yellow">.</span>
          </h1>
          <p className="text-slate-600 text-lg font-medium">Bienvenido de vuelta</p>
          <p className="text-slate-500 text-sm mt-1">
            Inicia sesión con tu cuenta institucional
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Correo Institucional
              </label>
              <input
                id="email"
                type="email"
                placeholder={`correo@${AUTH_CONFIG.allowedDomain}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:border-lasalle-dark focus:bg-white transition"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:border-lasalle-dark focus:bg-white transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              className="w-full mt-6 py-3.5 text-lg font-semibold"
              type="submit"
              disabled={loading || !isFormValid}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-slate-500 font-medium">o</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-slate-600">
            ¿No tienes cuenta?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="font-semibold text-lasalle-dark hover:text-lasalle-blue transition"
            >
              Regístrate
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-8">
          Solo para miembros de la comunidad LaSalle
        </p>
      </div>
    </div>
  )
}
