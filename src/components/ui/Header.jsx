import { Link } from 'react-router-dom'

export default function Header({ actions }) {
  return (
    <header style={{ background: '#1e3a8a', position: 'sticky', top: 0, zIndex: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/feed" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#fff' }}>
            LaSalle Connect<span style={{ color: '#fbbf24' }}>.</span>
          </span>
        </Link>
        {actions && <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>{actions}</div>}
      </div>
    </header>
  )
}
