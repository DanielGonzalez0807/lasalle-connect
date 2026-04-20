import { useState } from 'react'
import { createComment } from '../services/commentsService'
import { useSession } from '../../../app/AuthContext'

const MAX_LENGTH = 500

export function useCreateComment({ postId, onSuccess }) {
  const { session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function submit(content, parentId = null) {
    const trimmed = content.trim()
    if (!trimmed) { setError('El comentario no puede estar vacío.'); return { error: true } }
    if (trimmed.length > MAX_LENGTH) { setError(`Máximo ${MAX_LENGTH} caracteres.`); return { error: true } }

    setLoading(true)
    setError(null)

    const { data, error } = await createComment({
      content: trimmed,
      authorId: session.user.id,
      postId,
      parentId,
    })

    if (error) setError('No se pudo enviar el comentario.')
    else onSuccess(data)

    setLoading(false)
    return { error }
  }

  return { loading, error, submit }
}
