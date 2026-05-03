import { useState, useEffect } from 'react'
import { fetchComments } from '../services/commentsService'
import { buildCommentTree, insertIntoTree } from '../../../utils/buildCommentTree'

export function useComments(postId) {
  const [tree, setTree] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!postId) return
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      const { data, error } = await fetchComments(postId)

      if (cancelled) return

      if (error) setError('No se pudieron cargar los comentarios.')
      else setTree(buildCommentTree(data))

      setLoading(false)
    }

    load()
    return () => { cancelled = true }
  }, [postId])

  function appendComment(newComment) {
    setTree((prev) => insertIntoTree(prev, newComment))
  }

  return { tree, loading, error, appendComment }
}
