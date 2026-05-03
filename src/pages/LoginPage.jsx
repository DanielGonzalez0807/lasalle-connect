import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import { AUTH_CONFIG } from '../utils/constants'

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
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── Panel izquierdo — branding ── */}
      <div className="hidden lg:flex w-1/2 bg-[#1e3a8a] flex-col justify-between p-14 relative overflow-hidden">

        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#fbbf24]/10 translate-y-1/3 -translate-x-1/3" />

        {/* Logo */}
        <div className="relative z-10">
          <p className="text-white text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            LaSalle<span className="text-[#fbbf24]">.</span>
          </p>
        </div>

        {/* Texto central */}
        <div className="relative z-10 space-y-5">
          <div className="w-12 h-1 bg-[#fbbf24] rounded-full" />
          <h2 className="text-white text-4xl font-bold leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Conectá con tu<br />comunidad<br />académica
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Publicá, comentá y reaccioná a contenido de tus compañeros. Todo con tu correo institucional.
          </p>
          <div className="flex gap-10 pt-2">
            {[['100%', 'Institucional'], ['∞', 'Publicaciones'], ['24/7', 'Disponible']].map(([val, label]) => (
              <div key={label}>
                <p className="text-[#fbbf24] text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>{val}</p>
                <p className="text-white/40 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} LaSalle Connect</p>
        </div>
      </div>

      {/* ── Panel derecho — formulario ── */}
      <div className="flex-1 flex items-center justify-center bg-white px-8 py-16">
        <div className="w-full max-w-[360px]">

          {/* Logo solo en mobile */}
          <p className="lg:hidden text-center text-2xl font-bold mb-10 text-[#1e3a8a]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            LaSalle Connect<span className="text-[#fbbf24]">.</span>
          </p>

          <h1 className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Iniciar sesión
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-600">
                Correo institucional
              </label>
              <input
                id="email"
                type="email"
                placeholder={`correo@${AUTH_CONFIG.allowedDomain}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  color: '#0f172a',
                  outline: 'none',
                  width: '100%',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#1e3a8a'; e.target.style.background = '#fff' }}
                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc' }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-semibold text-slate-600">
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
                  style={{
                    background: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '12px 44px 12px 16px',
                    fontSize: '14px',
                    color: '#0f172a',
                    outline: 'none',
                    width: '100%',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#1e3a8a'; e.target.style.background = '#fff' }}
                  onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc' }}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#94a3b8' }}
                >
                  {showPassword ? (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '10px 14px' }}>
                <p style={{ fontSize: '12px', color: '#dc2626', fontWeight: 500 }}>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !isFormValid}
              style={{
                width: '100%',
                padding: '13px',
                background: loading || !isFormValid ? '#e2e8f0' : '#fbbf24',
                color: loading || !isFormValid ? '#94a3b8' : '#1e3a8a',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: loading || !isFormValid ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                fontFamily: 'Poppins, sans-serif',
              }}
              onMouseEnter={(e) => { if (!loading && isFormValid) e.target.style.background = '#f59e0b' }}
              onMouseLeave={(e) => { if (!loading && isFormValid) e.target.style.background = '#fbbf24' }}
            >
              {loading ? 'Entrando...' : 'Iniciar sesión'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '32px 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>o</span>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          </div>

          <button
            type="button"
            onClick={() => navigate('/register')}
            style={{
              width: '100%',
              padding: '13px',
              background: 'transparent',
              color: '#1e3a8a',
              border: '1.5px solid #1e3a8a',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'Poppins, sans-serif',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#1e3a8a'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1e3a8a' }}
          >
            Crear cuenta nueva
          </button>

          <p style={{ textAlign: 'center', fontSize: '11px', color: '#cbd5e1', marginTop: '32px' }}>
            Solo para miembros de la comunidad LaSalle
          </p>
        </div>
      </div>

    </div>
  )
}
