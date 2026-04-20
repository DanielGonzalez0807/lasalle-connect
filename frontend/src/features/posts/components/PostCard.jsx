import { useState } from 'react'
import { useReactions } from '../../reactions/hooks/useReactions'
import CommentList from '../../comments/components/CommentList'
import s from './PostCard.module.css'

export default function PostCard({ post }) {
  const author = post.profiles
  const date = new Date(post.created_at).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
  const { count, userHasLiked, loading, toggle } = useReactions(post.id)
  const [showComments, setShowComments] = useState(false)

  return (
    <article className={s.card}>
      <div className={s.header}>
        <span className={s.author}>{author?.nombre ?? 'Usuario'}</span>
        <time className={s.date} dateTime={post.created_at}>{date}</time>
      </div>

      <p className={s.content}>{post.content}</p>

      <div className={s.actions}>
        <button
          className={`${s.btnLike} ${userHasLiked ? s.btnLiked : ''}`}
          onClick={toggle}
          disabled={loading}
        >
          {userHasLiked ? '❤️' : '🤍'} {count}
        </button>

        <button className={s.btnComments} onClick={() => setShowComments((v) => !v)}>
          💬 {showComments ? 'Ocultar' : 'Comentarios'}
        </button>
      </div>

      {showComments && <CommentList postId={post.id} />}
    </article>
  )
}
