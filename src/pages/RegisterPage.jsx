import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import { AUTH_CONFIG } from '../utils/constants'
import { Button } from '../components/ui'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { loading, error, register } = useAuth()
  const navigate = useNavigate()

  const passwordMatch = password === confirmPassword && password.length >= 8
  const isFormValid = email && fullName && passwordMatch

  async function handleSubmit(e) {
    e.preventDefault()
    const { error } = await register({ email, password, fullName })
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
          <p className="text-slate-600 text-lg font-medium">Crea tu cuenta</p>
          <p className="text-slate-500 text-sm mt-1">
            Únete a nuestra comunidad educativa
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                Nombre Completo
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Juan Pérez García"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:border-lasalle-dark focus:bg-white transition"
              />
            </div>

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
              <input
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:border-lasalle-dark focus:bg-white transition"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`w-full px-5 py-3.5 bg-slate-50 border-2 rounded-2xl text-slate-900 placeholder-slate-400 transition ${
                  password && !passwordMatch
                    ? 'border-danger'
                    : 'border-slate-200 focus:border-lasalle-dark focus:bg-white'
                }`}
              />
              {password && !passwordMatch && (
                <p className="text-sm text-danger mt-1 font-medium">
                  {password.length < 8
                    ? 'La contraseña debe tener al menos 8 caracteres'
                    : 'Las contraseñas no coinciden'}
                </p>
              )}
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
              {loading ? 'Registrando...' : 'Crear Cuenta'}
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

          {/* Login Link */}
          <p className="text-center text-slate-600">
            ¿Ya tienes cuenta?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="font-semibold text-lasalle-dark hover:text-lasalle-blue transition"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
