import { useState } from 'react'
import { useReactions } from '../../reactions/hooks/useReactions'
import CommentList from '../../comments/components/CommentList'

export default function PostCard({ post }) {
  const author = post.profiles
  const date = new Date(post.created_at).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
  const { count, userHasLiked, loading, toggle } = useReactions(post.id)
  const [showComments, setShowComments] = useState(false)

  const initial = author?.nombre?.[0]?.toUpperCase() ?? '?'

  return (
    <article style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '20px', transition: 'box-shadow 0.2s' }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 16px rgba(30,58,138,0.08)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Autor y fecha */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: '#1e3a8a', color: '#fbbf24',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', flexShrink: 0,
          }}>
            {initial}
          </div>
          <span style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'Poppins, sans-serif', color: '#0f172a' }}>
            {author?.nombre ?? 'Usuario'}
          </span>
        </div>
        <time style={{ fontSize: '12px', color: '#94a3b8' }} dateTime={post.created_at}>{date}</time>
      </div>

      {/* Contenido */}
      <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#334155', whiteSpace: 'pre-wrap', margin: '0 0 16px' }}>
        {post.content}
      </p>

      {/* Acciones */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
        <button onClick={toggle} disabled={loading}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            background: userHasLiked ? '#fbbf24' : '#f1f5f9',
            color: userHasLiked ? '#1e3a8a' : '#64748b',
            fontSize: '13px', fontWeight: 600, transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = userHasLiked ? '#f59e0b' : '#e2e8f0' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = userHasLiked ? '#fbbf24' : '#f1f5f9' }}
        >
          {userHasLiked ? '❤️' : '🤍'}{count > 0 && <span>{count}</span>}
        </button>

        <button onClick={() => setShowComments((v) => !v)}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
            background: showComments ? '#1e3a8a' : '#f1f5f9',
            color: showComments ? '#fff' : '#64748b',
            fontSize: '13px', fontWeight: 600, transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = showComments ? '#1e40af' : '#e2e8f0' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = showComments ? '#1e3a8a' : '#f1f5f9' }}
        >
          💬 {showComments ? 'Ocultar' : 'Comentarios'}
        </button>
      </div>

      {showComments && (
        <div style={{ marginTop: '16px' }}>
          <CommentList postId={post.id} />
        </div>
      )}
    </article>
  )
}
