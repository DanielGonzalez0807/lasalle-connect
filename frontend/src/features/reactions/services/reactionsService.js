import { supabase } from '../../../services/supabaseClient'

export async function fetchReactions(postId, userId) {
  const [countResult, userResult] = await Promise.all([
    supabase
      .from('reactions')
      .select('id', { count: 'exact', head: true })
      .eq('post_id', postId),

    supabase
      .from('reactions')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .maybeSingle(),
  ])

  return {
    count: countResult.count ?? 0,
    userHasLiked: !!userResult.data,
    error: countResult.error || userResult.error,
  }
}

export async function addReaction(postId, userId) {
  const { error } = await supabase
    .from('reactions')
    .insert({ post_id: postId, user_id: userId })

  return { error }
}

export async function removeReaction(postId, userId) {
  const { error } = await supabase
    .from('reactions')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', userId)

  return { error }
}
