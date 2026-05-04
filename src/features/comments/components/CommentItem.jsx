import { useState } from 'react'
import CommentForm from './CommentForm'

export default function CommentItem({ comment, postId, onNewComment, depth = 0 }) {
  const [showReplyForm, setShowReplyForm] = useState(false)

  const author = comment.profiles
  const date = new Date(comment.created_at).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
  const initial = author?.nombre?.[0]?.toUpperCase() ?? '?'

  function handleReplySuccess(newComment) {
    onNewComment(newComment)
    setShowReplyForm(false)
  }

  return (
    <div style={{ paddingLeft: depth > 0 ? '16px' : 0, borderLeft: depth > 0 ? '3px solid #fbbf24' : 'none' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
        <div style={{
          width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
          background: '#1e3a8a', color: '#fbbf24',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '12px', fontWeight: 700, fontFamily: 'Poppins, sans-serif',
        }}>
          {initial}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'Poppins, sans-serif', color: '#0f172a' }}>
              {author?.nombre ?? 'Usuario'}
            </span>
            <time style={{ fontSize: '11px', color: '#94a3b8' }} dateTime={comment.created_at}>{date}</time>
          </div>
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#475569', margin: '0 0 8px', whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            {comment.content}
          </p>
          {depth < 3 && (
            <button onClick={() => setShowReplyForm((v) => !v)}
              style={{ fontSize: '12px', fontWeight: 600, color: '#1e3a8a', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'Poppins, sans-serif' }}>
              {showReplyForm ? 'Cancelar' : '↩ Responder'}
            </button>
          )}
        </div>
      </div>

      {showReplyForm && (
        <div style={{ marginLeft: '40px', marginBottom: '12px' }}>
          <CommentForm postId={postId} parentId={comment.id} onSuccess={handleReplySuccess} onCancel={() => setShowReplyForm(false)} />
        </div>
      )}

      {comment.replies.length > 0 && (
        <div style={{ marginLeft: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} postId={postId} onNewComment={onNewComment} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
