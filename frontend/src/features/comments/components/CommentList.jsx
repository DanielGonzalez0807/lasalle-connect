import { useComments } from '../hooks/useComments'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
import s from './CommentList.module.css'

export default function CommentList({ postId }) {
  const { tree, loading, error, appendComment } = useComments(postId)

  return (
    <section className={s.section}>
      <CommentForm postId={postId} onSuccess={appendComment} />

      {loading && <p className={s.empty}>Cargando comentarios...</p>}
      {error && <p className={s.error}>{error}</p>}
      {!loading && !error && tree.length === 0 && (
        <p className={s.empty}>Sin comentarios aún. ¡Sé el primero!</p>
      )}

      {tree.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postId={postId}
          onNewComment={appendComment}
        />
      ))}
    </section>
  )
}
