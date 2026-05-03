import { useState, useEffect } from 'react'
import { useSession } from '../../../app/AuthContext'
import { fetchReactions, addReaction, removeReaction } from '../services/reactionsService'

export function useReactions(postId) {
  const { session } = useSession()
  const userId = session?.user?.id

  const [count, setCount] = useState(0)
  const [userHasLiked, setUserHasLiked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!postId || !userId) return
    let cancelled = false

    fetchReactions(postId, userId).then(({ count, userHasLiked }) => {
      if (cancelled) return
      setCount(count)
      setUserHasLiked(userHasLiked)
      setLoading(false)
    })

    return () => { cancelled = true }
  }, [postId, userId])

  async function toggle() {
    if (!userId) return

    // Optimistic update
    const prevCount = count
    const prevLiked = userHasLiked

    setUserHasLiked(!userHasLiked)
    setCount((c) => userHasLiked ? c - 1 : c + 1)

    const { error } = userHasLiked
      ? await removeReaction(postId, userId)
      : await addReaction(postId, userId)

    // Revertir si falló
    if (error) {
      setUserHasLiked(prevLiked)
      setCount(prevCount)
    }
  }

  return { count, userHasLiked, loading, toggle }
}
