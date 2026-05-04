import { useState } from 'react'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useSession } from '../app/AuthContext'
import { usePosts } from '../features/posts/hooks/usePosts'
import { useProfile } from '../features/profile/hooks/useProfile'
import { useSubjects } from '../features/subjects/hooks/useSubjects'
import { useSubjectCounts } from '../features/subjects/hooks/useSubjectCounts'
import { useOnlineUsers } from '../features/profile/hooks/useOnlineUsers'
import PostForm from '../features/posts/components/PostForm'
import PostList from '../features/posts/components/PostList'
import PageLayout from '../components/layout/PageLayout'

export default function FeedPage() {
  const { logout } = useAuth()
  const { session } = useSession()
  const { profile } = useProfile()
  const { subjects } = useSubjects()
  const counts = useSubjectCounts()
  const { profiles, onlineIds } = useOnlineUsers(session?.user?.id)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const { posts, loading, error, prependPost } = usePosts(selectedSubject)

  const totalPosts = Object.values(counts).reduce((a, b) => a + b, 0)

  const headerActions = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
        {profile?.nombre ?? 'Usuario'}
      </span>
      <button onClick={logout}
        style={{ padding: '7px 16px', borderRadius: '8px', border: 'none', background: '#fbbf24', color: '#1e3a8a', fontSize: '13px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', cursor: 'pointer', transition: 'background 0.2s' }}
        onMouseEnter={(e) => e.target.style.background = '#f59e0b'}
        onMouseLeave={(e) => e.target.style.background = '#fbbf24'}
      >
        Cerrar sesión
      </button>
    </div>
  )

  return (
    <>
      <style>{`
        .feed-grid {
          display: grid;
          grid-template-columns: 200px 1fr 220px;
          gap: 24px;
          align-items: start;
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 16px 32px 8px;
        }
        .feed-sidebar-left, .feed-sidebar-right {
          position: sticky;
          top: 80px;
        }
        @media (max-width: 1024px) {
          .feed-grid { grid-template-columns: 1fr; }
          .feed-sidebar-left, .feed-sidebar-right { position: static; }
        }
        @media (max-width: 768px) {
          .feed-sidebar-right { display: none; }
        }
        .subject-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 8px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          gap: 6px;
        }
        .subject-item:hover { background: #f1f5f9; }
        .subject-item.active { background: #1e3a8a; }
        .subject-item.active .subject-name { color: #fff; }
        .subject-item.active .subject-count { background: #fbbf24; color: #1e3a8a; }
      `}</style>

      <PageLayout actions={headerActions} fullWidth>
        <div className="feed-grid">

          {/* ── Columna izquierda: Materias ── */}
          <aside className="feed-sidebar-left">
            <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
                <p style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#0f172a', margin: 0 }}>
                  Materias
                </p>
              </div>
              <div style={{ padding: '4px' }}>

                {/* Todas */}
                <button
                  className={`subject-item${selectedSubject === null ? ' active' : ''}`}
                  onClick={() => setSelectedSubject(null)}
                >
                  <span className="subject-name" style={{ fontSize: '13px', fontWeight: 500, color: selectedSubject === null ? '#fff' : '#374151' }}>
                    Todas
                  </span>
                  <span className="subject-count" style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', background: selectedSubject === null ? '#fbbf24' : '#f1f5f9', color: selectedSubject === null ? '#1e3a8a' : '#64748b' }}>
                    {totalPosts}
                  </span>
                </button>

                {subjects.map((s) => (
                  <button
                    key={s.id}
                    className={`subject-item${selectedSubject === s.id ? ' active' : ''}`}
                    onClick={() => setSelectedSubject(s.id)}
                  >
                    <span className="subject-name" style={{ fontSize: '13px', fontWeight: 500, color: selectedSubject === s.id ? '#fff' : '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0 }}>
                      {s.name}
                    </span>
                    <span className="subject-count" style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', flexShrink: 0, background: selectedSubject === s.id ? '#fbbf24' : '#f1f5f9', color: selectedSubject === s.id ? '#1e3a8a' : '#64748b' }}>
                      {counts[s.id] ?? 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Columna central: Feed ── */}
          <main>
            <div style={{ marginBottom: '20px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#0f172a', margin: '0 0 4px' }}>
                {selectedSubject ? subjects.find(s => s.id === selectedSubject)?.name ?? 'Feed' : 'Publicaciones recientes'}
              </h1>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
                {selectedSubject ? 'Publicaciones y comentarios de esta materia' : 'Seleccioná una materia para publicar y comentar'}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {selectedSubject && <PostForm onPostCreated={prependPost} subjectId={selectedSubject} />}
              <PostList posts={posts} loading={loading} error={error} subjectSelected={!!selectedSubject} onSelectSubject={setSelectedSubject} />
            </div>
          </main>

          {/* ── Columna derecha: Usuarios ── */}
          <aside className="feed-sidebar-right">
            <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#0f172a', margin: 0 }}>
                  Estudiantes
                </p>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', background: '#dcfce7', color: '#16a34a' }}>
                  {onlineIds.size} online
                </span>
              </div>
              <div style={{ padding: '8px', maxHeight: '400px', overflowY: 'auto' }}>
                {profiles.map((p) => {
                  const isOnline = onlineIds.has(p.id)
                  const initial = p.nombre?.[0]?.toUpperCase() ?? '?'
                  return (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '8px' }}>
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1e3a8a', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}>
                          {initial}
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '9px', height: '9px', borderRadius: '50%', background: isOnline ? '#22c55e' : '#cbd5e1', border: '2px solid #fff' }} />
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {p.nombre}
                        </p>
                        <p style={{ fontSize: '11px', color: isOnline ? '#22c55e' : '#94a3b8', margin: 0, fontWeight: 500 }}>
                          {isOnline ? 'En línea' : 'Desconectado'}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </aside>

        </div>
      </PageLayout>
    </>
  )
}
