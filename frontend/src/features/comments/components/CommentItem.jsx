import { useState } from 'react'
import CommentForm from './CommentForm'
import s from './CommentItem.module.css'

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
    <div className={s.item}>
      <div className={s.meta}>
        <span className={s.author}>{author?.nombre ?? 'Usuario'}</span>
        <time className={s.date} dateTime={comment.created_at}>{date}</time>
      </div>

      <p className={s.content}>{comment.content}</p>

      {depth < 3 && (
        <button className={s.btnReply} onClick={() => setShowReplyForm((v) => !v)}>
          {showReplyForm ? 'Cancelar' : 'Responder'}
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
        <div className={s.replies}>
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
