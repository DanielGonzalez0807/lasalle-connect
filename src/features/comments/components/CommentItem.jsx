import { useState } from 'react'
import CommentForm from './CommentForm'

export default function CommentItem({ comment, postId, onNewComment, depth = 0 }) {
  const [showReplyForm, setShowReplyForm] = useState(false)

  const author = comment.profiles
  const date = new Date(comment.created_at).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

  function handleReplySuccess(newComment) {
    onNewComment(newComment)
    setShowReplyForm(false)
  }

  return (
    <div className={`space-y-3 ${depth > 0 ? 'border-l-4 border-lasalle-yellow pl-4' : ''}`}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">👤</span>
          <span className="text-sm font-semibold font-display text-lasalle-dark">{author?.nombre ?? 'Usuario'}</span>
        </div>
        <time className="text-xs text-slate-500" dateTime={comment.created_at}>📅 {date}</time>
      </div>

      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{comment.content}</p>

      {depth < 3 && (
        <button
          className="text-sm font-semibold text-lasalle-dark hover:text-lasalle-blue underline transition"
          onClick={() => setShowReplyForm((v) => !v)}
        >
          {showReplyForm ? 'Cancelar' : '↩️ Responder'}
        </button>
      )}

      {showReplyForm && (
        <CommentForm
          postId={postId}
          parentId={comment.id}
          onSuccess={handleReplySuccess}
          onCancel={() => setShowReplyForm(false)}
        />
      )}

      {comment.replies.length > 0 && (
        <div className="space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={postId}
              onNewComment={onNewComment}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
