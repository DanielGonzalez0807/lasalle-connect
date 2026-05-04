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
    <>
      <style>{`
        .login-wrapper { min-height: 100vh; display: flex; }
        .login-branding { width: 50%; background: #1e3a8a; display: flex; flex-direction: column; justify-content: space-between; padding: 56px; position: relative; overflow: hidden; }
        .login-mobile-logo { display: none; text-align: center; margin-bottom: 40px; }
        @media (max-width: 1023px) {
          .login-branding { display: none !important; }
          .login-mobile-logo { display: block; }
        }
      `}</style>

      <div className="login-wrapper">

        {/* Panel izquierdo */}
        <div className="login-branding">
          <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', transform: 'translate(30%,-30%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(251,191,36,0.07)', transform: 'translate(-30%,30%)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#fff' }}>
              LaSalle Connect<span style={{ color: '#fbbf24' }}>.</span>
            </span>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ width: '48px', height: '4px', background: '#fbbf24', borderRadius: '2px', marginBottom: '28px' }} />
            <h2 style={{ fontSize: '38px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#fff', lineHeight: 1.25, margin: '0 0 20px' }}>
              Conectá con tu<br />comunidad<br />académica
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: '280px', margin: '0 0 40px' }}>
              Publicá, comentá y reaccioná a contenido de tus compañeros. Todo con tu correo institucional.
            </p>
            <div style={{ display: 'flex', gap: '40px' }}>
              {[['100%', 'Institucional'], ['∞', 'Publicaciones'], ['24/7', 'Disponible']].map(([val, label]) => (
                <div key={label}>
                  <p style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#fbbf24', margin: '0 0 4px' }}>{val}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          <p style={{ position: 'relative', zIndex: 1, fontSize: '12px', color: 'rgba(255,255,255,0.2)', margin: 0 }}>
            © {new Date().getFullYear()} LaSalle Connect
          </p>
        </div>

        {/* Panel derecho */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', padding: '48px 32px' }}>
          <div style={{ width: '100%', maxWidth: '360px' }}>

            <div className="login-mobile-logo">
              <span style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#1e3a8a' }}>
                LaSalle<span style={{ color: '#fbbf24' }}>.</span>
              </span>
            </div>

            <div style={{ marginBottom: '36px' }}>
              <h1 style={{ fontSize: '26px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#0f172a', margin: '0 0 8px' }}>
                Iniciar sesión
              </h1>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
                Ingresá con tu cuenta institucional
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="email" style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>
                  Correo institucional
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder={`correo@${AUTH_CONFIG.allowedDomain}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '14px', color: '#0f172a', outline: 'none', width: '100%', boxSizing: 'border-box', transition: 'border-color 0.2s, background 0.2s', fontFamily: 'Inter, sans-serif' }}
                  onFocus={(e) => { e.target.style.borderColor = '#1e3a8a'; e.target.style.background = '#fff' }}
                  onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="password" style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>
                  Contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '13px 44px 13px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '14px', color: '#0f172a', outline: 'none', width: '100%', boxSizing: 'border-box', transition: 'border-color 0.2s, background 0.2s', fontFamily: 'Inter, sans-serif' }}
                    onFocus={(e) => { e.target.style.borderColor = '#1e3a8a'; e.target.style.background = '#fff' }}
                    onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc' }}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#94a3b8', display: 'flex', alignItems: 'center' }}
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
                  <p style={{ fontSize: '12px', color: '#dc2626', fontWeight: 500, margin: 0 }}>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !isFormValid}
                style={{ marginTop: '4px', width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: loading || !isFormValid ? '#e2e8f0' : '#fbbf24', color: loading || !isFormValid ? '#94a3b8' : '#1e3a8a', fontSize: '15px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', cursor: loading || !isFormValid ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={(e) => { if (!loading && isFormValid) e.currentTarget.style.background = '#f59e0b' }}
                onMouseLeave={(e) => { if (!loading && isFormValid) e.currentTarget.style.background = '#fbbf24' }}
              >
                {loading ? 'Entrando...' : 'Iniciar sesión'}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '28px 0' }}>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>o</span>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            </div>

            <button
              type="button"
              onClick={() => navigate('/register')}
              style={{ width: '100%', padding: '14px', borderRadius: '10px', background: 'transparent', color: '#1e3a8a', border: '1.5px solid #1e3a8a', fontSize: '15px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', cursor: 'pointer', transition: 'all 0.2s' }}
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
    </>
  )
}
