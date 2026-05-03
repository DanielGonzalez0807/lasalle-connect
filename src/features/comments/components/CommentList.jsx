import { useComments } from '../hooks/useComments'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'

export default function CommentList({ postId }) {
  const { tree, loading, error, appendComment } = useComments(postId)

  return (
    <section className="space-y-5 border-t-2 border-slate-100 pt-5">
      <h4 className="font-semibold font-display text-lasalle-dark text-lg">💬 Comentarios</h4>
      <CommentForm postId={postId} onSuccess={appendComment} />

      {loading && <p className="text-sm text-slate-500 font-medium">⏳ Cargando comentarios...</p>}
      {error && <p className="text-sm text-red-700 font-semibold">❌ {error}</p>}
      {!loading && !error && tree.length === 0 && (
        <p className="text-sm text-slate-500 italic">📝 Sin comentarios aún. ¡Sé el primero!</p>
      )}

      <div className="space-y-4">
        {tree.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            postId={postId}
            onNewComment={appendComment}
          />
        ))}
      </div>
    </section>
  )
}
