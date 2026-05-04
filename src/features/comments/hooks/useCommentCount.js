import { useState, useEffect } from 'react'
import { supabase } from '../../../services/supabaseClient'

export function useCommentCount(postId) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!postId) return
    supabase
      .from('comments')
      .select('id', { count: 'exact', head: true })
      .eq('post_id', postId)
      .then(({ count }) => setCount(count ?? 0))
  }, [postId])

  return count
}
