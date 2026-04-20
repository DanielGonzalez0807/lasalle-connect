import { useState } from 'react'
import { createPost } from '../services/postsService'
import { useSession } from '../../../app/AuthContext'
import { validatePostContent } from '../../../utils/validators'

export function useCreatePost({ onSuccess, subjectId = null }) {
  const { session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function submit(content) {
    const validationError = validatePostContent(content)
    if (validationError) {
      setError(validationError)
      return { error: validationError }
    }

    setLoading(true)
    setError(null)

    const { data, error } = await createPost({
      content: content.trim(),
      authorId: session.user.id,
      subjectId,
    })

    if (error) {
      setError('No se pudo crear la publicación.')
    } else if (data) {
      onSuccess(data)
    } else {
      // El insert fue exitoso pero RLS bloqueó el select posterior.
      // Recargamos los posts para reflejar el nuevo contenido.
      onSuccess(null)
    }

    setLoading(false)
    return { error }
  }

  return { loading, error, submit }
}
