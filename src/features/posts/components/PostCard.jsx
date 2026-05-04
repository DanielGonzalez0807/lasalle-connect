import { useState } from 'react'
import { useReactions } from '../../reactions/hooks/useReactions'
import CommentList from '../../comments/components/CommentList'
import { useCommentCount } from '../../comments/hooks/useCommentCount'

export default function PostCard({ post, subjectSelected = false, onSelectSubject }) {
  const author = post.profiles
  const subject = post.subjects
  const { count, userHasLiked, loading, toggle } = useReactions(post.id)
  const commentCount = useCommentCount(post.id)
  const [showComments, setShowComments] = useState(false)

  const date = new Date(post.created_at)
  const dateStr = date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })
  const timeStr = date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
  const initial = author?.nombre?.[0]?.toUpperCase() ?? '?'

  return (
    <article
      style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '20px', transition: 'box-shadow 0.2s' }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 16px rgba(30,58,138,0.08)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Cabecera: autor + fecha */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1e3a8a', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', flexShrink: 0 }}>
            {initial}
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'Poppins, sans-serif', color: '#0f172a', margin: 0 }}>
              {author?.nombre ?? 'Usuario'}
            </p>
            <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>
              {dateStr} · {timeStr}
            </p>
          </div>
        </div>

        {/* Badge de materia — solo si no hay materia seleccionada */}
        {!subjectSelected && subject && (
          <button
            onClick={() => onSelectSubject?.(subject.id)}
            style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: '#eff6ff', color: '#1e3a8a', border: '1px solid #bfdbfe', whiteSpace: 'nowrap', flexShrink: 0, cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#dbeafe' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#eff6ff' }}
          >
            {subject.name}
          </button>
        )}
      </div>

      {/* Contenido */}
      <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#334155', whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word', margin: '0 0 16px' }}>
        {post.content}
      </p>

      {/* Acciones — siempre visibles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
        <button onClick={toggle} disabled={loading}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', background: userHasLiked ? '#fbbf24' : '#f1f5f9', color: userHasLiked ? '#1e3a8a' : '#64748b', fontSize: '13px', fontWeight: 600, transition: 'background 0.2s' }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = userHasLiked ? '#f59e0b' : '#e2e8f0' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = userHasLiked ? '#fbbf24' : '#f1f5f9' }}
        >
          {userHasLiked ? '❤️' : '🤍'}{count > 0 && <span>{count}</span>}
        </button>

        {/* Botón comentarios solo si hay materia seleccionada */}
        {subjectSelected && (
          <button onClick={() => setShowComments((v) => !v)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: showComments ? '#1e3a8a' : '#f1f5f9', color: showComments ? '#fff' : '#64748b', fontSize: '13px', fontWeight: 600, transition: 'background 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = showComments ? '#1e40af' : '#e2e8f0' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = showComments ? '#1e3a8a' : '#f1f5f9' }}
          >
            💬 {commentCount > 0 ? commentCount : ''} {showComments ? 'Ocultar' : 'Comentarios'}
          </button>
        )}
      </div>

      {/* Comentarios — solo si hay materia seleccionada */}
      {subjectSelected && showComments && (
        <div style={{ marginTop: '16px' }}>
          <CommentList postId={post.id} />
        </div>
      )}
    </article>
  )
}
