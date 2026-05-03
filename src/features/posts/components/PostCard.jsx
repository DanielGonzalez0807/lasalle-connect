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

  return (
    <article className="space-y-5 rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg hover:shadow-xl transition">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl bg-lasalle-yellow/20 rounded-full w-10 h-10 flex items-center justify-center">👤</span>
          <span className="text-sm font-semibold font-display text-lasalle-dark">{author?.nombre ?? 'Usuario'}</span>
        </div>
        <time className="text-sm text-slate-500" dateTime={post.created_at}>📅 {date}</time>
      </div>

      <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700 font-medium">{post.content}</p>

      <div className="flex flex-wrap items-center gap-2 border-t-2 border-slate-100 pt-4">
        <button
          className={`inline-flex items-center gap-2 rounded-2xl border-2 px-4 py-2 text-sm font-semibold transition ${userHasLiked ? 'border-lasalle-yellow bg-lasalle-yellow/20 text-lasalle-dark' : 'border-slate-200 text-slate-600 hover:border-lasalle-yellow/50 hover:bg-slate-50'}`}
          onClick={toggle}
          disabled={loading}
        >
          {userHasLiked ? '❤️' : '🤍'} {count > 0 && <span className="font-bold">{count}</span>}
        </button>

        <button
          className={`inline-flex items-center gap-2 rounded-2xl border-2 px-4 py-2 text-sm font-semibold transition ${showComments ? 'border-lasalle-blue bg-lasalle-blue/20 text-lasalle-dark' : 'border-slate-200 text-slate-600 hover:border-lasalle-blue/50 hover:bg-slate-50'}`}
          onClick={() => setShowComments((v) => !v)}
        >
          💬 {showComments ? 'Ocultar' : 'Comentarios'}
        </button>
      </div>

      {showComments && <CommentList postId={post.id} />}
    </article>
  )
}
