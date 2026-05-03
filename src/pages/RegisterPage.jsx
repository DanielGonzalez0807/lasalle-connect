import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import { AUTH_CONFIG } from '../utils/constants'

const inputStyle = {
  background: '#f8fafc',
  border: '1.5px solid #e2e8f0',
  borderRadius: '10px',
  padding: '12px 16px',
  fontSize: '14px',
  color: '#0f172a',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s, background 0.2s',
}

function Field({ label, id, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label htmlFor={id} style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>
        {label}
      </label>
      {children}
      {error && <p style={{ fontSize: '12px', color: '#dc2626', fontWeight: 500 }}>{error}</p>}
    </div>
  )
}

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { loading, error, register } = useAuth()
  const navigate = useNavigate()

  const passwordMatch = password === confirmPassword && password.length >= 8
  const isFormValid = email && fullName && passwordMatch

  const passwordError = password && !passwordMatch
    ? (password.length < 8 ? 'Mínimo 8 caracteres' : 'Las contraseñas no coinciden')
    : null

  async function handleSubmit(e) {
    e.preventDefault()
    const { error } = await register({ email, password, fullName })
    if (!error) navigate('/feed')
  }

  function focusInput(e) { e.target.style.borderColor = '#1e3a8a'; e.target.style.background = '#fff' }
  function blurInput(e) { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc' }

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>

      {/* Panel izquierdo */}
      <div style={{ display: 'none', width: '50%', background: '#1e3a8a', flexDirection: 'column', justifyContent: 'space-between', padding: '56px', position: 'relative', overflow: 'hidden' }}
        className="lg:flex">
        <div style={{ position: 'absolute', top: 0, right: 0, width: '288px', height: '288px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', transform: 'translate(33%, -33%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '384px', height: '384px', borderRadius: '50%', background: 'rgba(251,191,36,0.08)', transform: 'translate(-33%, 33%)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ color: '#fff', fontSize: '22px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', margin: 0 }}>
            LaSalle Connect<span style={{ color: '#fbbf24' }}>.</span>
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ width: '48px', height: '4px', background: '#fbbf24', borderRadius: '2px', marginBottom: '24px' }} />
          <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', lineHeight: 1.3, margin: '0 0 16px' }}>
            Únete a la<br />comunidad<br />académica
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.7, maxWidth: '280px', margin: 0 }}>
            Registrate con tu correo institucional y empezá a conectar con tus compañeros.
          </p>
        </div>

        <p style={{ position: 'relative', zIndex: 1, color: 'rgba(255,255,255,0.2)', fontSize: '12px', margin: 0 }}>
          © {new Date().getFullYear()} LaSalle Connect
        </p>
      </div>

      {/* Panel derecho */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', padding: '48px 32px' }}>
        <div style={{ width: '100%', maxWidth: '360px' }}>

          {/* Logo mobile */}
          <p className="lg:hidden" style={{ textAlign: 'center', fontSize: '22px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#1e3a8a', marginBottom: '40px' }}>
            LaSalle<span style={{ color: '#fbbf24' }}>.</span>
          </p>

          <h1 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#0f172a', margin: '0 0 4px' }}>
            Crear cuenta
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 32px' }}>Completá tus datos para registrarte</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <Field label="Nombre completo" id="fullName">
              <input id="fullName" type="text" placeholder="Juan Pérez García" value={fullName}
                onChange={(e) => setFullName(e.target.value)} required
                style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </Field>

            <Field label="Correo institucional" id="email">
              <input id="email" type="email" placeholder={`correo@${AUTH_CONFIG.allowedDomain}`} value={email}
                onChange={(e) => setEmail(e.target.value)} required
                style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </Field>

            <Field label="Contraseña" id="password">
              <input id="password" type="password" placeholder="Mínimo 8 caracteres" value={password}
                onChange={(e) => setPassword(e.target.value)} required
                style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </Field>

            <Field label="Confirmar contraseña" id="confirmPassword" error={passwordError}>
              <input id="confirmPassword" type="password" placeholder="Repite tu contraseña" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} required
                style={{ ...inputStyle, borderColor: passwordError ? '#dc2626' : '#e2e8f0' }}
                onFocus={(e) => { e.target.style.borderColor = passwordError ? '#dc2626' : '#1e3a8a'; e.target.style.background = '#fff' }}
                onBlur={(e) => { e.target.style.borderColor = passwordError ? '#dc2626' : '#e2e8f0'; e.target.style.background = '#f8fafc' }} />
            </Field>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '10px 14px' }}>
                <p style={{ fontSize: '12px', color: '#dc2626', fontWeight: 500, margin: 0 }}>{error}</p>
              </div>
            )}

            <button type="submit" disabled={loading || !isFormValid}
              style={{
                width: '100%', padding: '13px', borderRadius: '10px', border: 'none',
                background: loading || !isFormValid ? '#e2e8f0' : '#fbbf24',
                color: loading || !isFormValid ? '#94a3b8' : '#1e3a8a',
                fontSize: '14px', fontWeight: 700, fontFamily: 'Poppins, sans-serif',
                cursor: loading || !isFormValid ? 'not-allowed' : 'pointer', transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { if (!loading && isFormValid) e.target.style.background = '#f59e0b' }}
              onMouseLeave={(e) => { if (!loading && isFormValid) e.target.style.background = '#fbbf24' }}
            >
              {loading ? 'Registrando...' : 'Crear cuenta'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>o</span>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          </div>

          <button type="button" onClick={() => navigate('/login')}
            style={{
              width: '100%', padding: '13px', borderRadius: '10px',
              background: 'transparent', color: '#1e3a8a',
              border: '1.5px solid #1e3a8a', fontSize: '14px', fontWeight: 700,
              fontFamily: 'Poppins, sans-serif', cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#1e3a8a'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1e3a8a' }}
          >
            Ya tengo cuenta
          </button>

          <p style={{ textAlign: 'center', fontSize: '11px', color: '#cbd5e1', marginTop: '32px' }}>
            Solo para miembros de la comunidad LaSalle
          </p>
        </div>
      </div>
    </div>
  )
}
