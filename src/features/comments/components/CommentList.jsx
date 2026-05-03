import { useComments } from '../hooks/useComments'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'

export default function CommentList({ postId }) {
  const { tree, loading, error, appendComment } = useComments(postId)

  return (
    <section>
      <p style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#1e3a8a', margin: '0 0 14px' }}>
        Comentarios
      </p>

      <CommentForm postId={postId} onSuccess={appendComment} />

      {loading && (
        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '16px 0 0', textAlign: 'center' }}>Cargando comentarios...</p>
      )}
      {error && (
        <p style={{ fontSize: '13px', color: '#dc2626', margin: '16px 0 0' }}>{error}</p>
      )}
      {!loading && !error && tree.length === 0 && (
        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '16px 0 0', textAlign: 'center' }}>Sin comentarios aún. ¡Sé el primero!</p>
      )}

      {tree.length > 0 && (
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {tree.map((comment) => (
            <CommentItem key={comment.id} comment={comment} postId={postId} onNewComment={appendComment} />
          ))}
        </div>
      )}
    </section>
  )
}
