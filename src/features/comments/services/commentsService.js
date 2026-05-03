import { supabase } from '../../../services/supabaseClient'

const COMMENT_SELECT = `
  id,
  content,
  created_at,
  post_id,
  author_id,
  parent_id,
  profiles!author_id (
    id,
    nombre
  )
`

export async function fetchComments(postId) {
  const { data, error } = await supabase
    .from('comments')
    .select(COMMENT_SELECT)
    .eq('post_id', postId)
    .order('created_at', { ascending: true })

  return { data, error }
}

export async function createComment({ content, authorId, postId, parentId = null }) {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      content,
      author_id: authorId,
      post_id: postId,
      parent_id: parentId,
    })
    .select(COMMENT_SELECT)
    .maybeSingle()

  return { data, error }
}
