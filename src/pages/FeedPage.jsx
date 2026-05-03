import { useState } from 'react'
import { useAuth } from '../features/auth/hooks/useAuth'
import { usePosts } from '../features/posts/hooks/usePosts'
import { useProfile } from '../features/profile/hooks/useProfile'
import { useSubjects } from '../features/subjects/hooks/useSubjects'
import PostForm from '../features/posts/components/PostForm'
import PostList from '../features/posts/components/PostList'
import PageLayout from '../components/layout/PageLayout'

export default function FeedPage() {
  const { logout } = useAuth()
  const { profile } = useProfile()
  const { subjects } = useSubjects()
  const [selectedSubject, setSelectedSubject] = useState(null)
  const { posts, loading, error, prependPost } = usePosts(selectedSubject)

  const headerActions = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}
        className="hidden sm:inline">
        {profile?.nombre ?? 'Usuario'}
      </span>
      <button onClick={logout}
        style={{
          padding: '7px 16px', borderRadius: '8px', border: 'none',
          background: '#fbbf24', color: '#1e3a8a', fontSize: '13px',
          fontWeight: 700, fontFamily: 'Poppins, sans-serif', cursor: 'pointer', transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => e.target.style.background = '#f59e0b'}
        onMouseLeave={(e) => e.target.style.background = '#fbbf24'}
      >
        Cerrar sesión
      </button>
    </div>
  )

  return (
    <PageLayout actions={headerActions}>

      {/* Encabezado de sección */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#0f172a', margin: '0 0 4px' }}>
          Feed
        </h1>
        <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
          Comparte y descubre publicaciones de tu comunidad
        </p>
      </div>

      {/* Filtro de materias */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="subject-select" style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
          Filtrar por materia
        </label>
        <select id="subject-select" value={selectedSubject ?? ''} onChange={(e) => setSelectedSubject(e.target.value || null)}
          style={{
            width: '100%', padding: '11px 16px', borderRadius: '10px',
            border: '1.5px solid #e2e8f0', background: '#fff',
            fontSize: '14px', color: '#0f172a', outline: 'none',
            fontFamily: 'Inter, sans-serif', cursor: 'pointer', transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        >
          <option value="">Todas las materias</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
          ))}
        </select>
      </div>

      {/* Contenido */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <PostForm onPostCreated={prependPost} subjectId={selectedSubject} />
        <PostList posts={posts} loading={loading} error={error} />
      </div>

    </PageLayout>
  )
}
