import { useState } from 'react'
import { useCreateComment } from '../hooks/useCreateComment'
import s from './CommentForm.module.css'

export default function CommentForm({ postId, parentId = null, onSuccess, onCancel }) {
  const [content, setContent] = useState('')
  const { loading, error, submit } = useCreateComment({ postId, onSuccess })

  async function handleSubmit(e) {
    e.preventDefault()
    const { error } = await submit(content, parentId)
    if (!error) setContent('')
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <textarea
        id={parentId ? `reply-${parentId}` : `comment-${postId}`}
        name="content"
        placeholder={parentId ? 'Escribe una respuesta...' : 'Escribe un comentario...'}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={2}
      />
      {error && <p className={s.error}>{error}</p>}
      <div className={s.actions}>
        {onCancel && (
          <button type="button" className={s.btnCancel} onClick={onCancel}>Cancelar</button>
        )}
        <button type="submit" className={s.btnSubmit} disabled={loading || !content.trim()}>
          {loading ? 'Enviando...' : parentId ? 'Responder' : 'Comentar'}
        </button>
      </div>
    </form>
  )
}
