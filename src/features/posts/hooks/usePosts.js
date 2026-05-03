import { useState, useEffect, useCallback } from 'react'
import { fetchPosts } from '../services/postsService'

export function usePosts(subjectId = null) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await fetchPosts(subjectId)
    if (error) setError('No se pudieron cargar las publicaciones.')
    else setPosts(data ?? [])
    setLoading(false)
  }, [subjectId])

  useEffect(() => { load() }, [load])

  function prependPost(post) {
    if (!post) { load(); return }
    setPosts((prev) => [post, ...prev])
  }

  return { posts, loading, error, prependPost }
}
