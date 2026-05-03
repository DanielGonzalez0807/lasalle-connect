import { supabase } from '../../../services/supabaseClient'

export async function fetchPosts(subjectId = null) {
  let query = supabase
    .from('posts')
    .select(`
      id,
      content,
      created_at,
      author_id,
      subject_id,
      profiles!author_id (
        id,
        nombre
      )
    `)
    .order('created_at', { ascending: false })

  if (subjectId) query = query.eq('subject_id', subjectId)

  const { data, error } = await query
  return { data, error }
}

export async function createPost({ content, authorId, subjectId = null }) {
  const { data, error } = await supabase
    .from('posts')
    .insert({ content, author_id: authorId, subject_id: subjectId })
    .select(`
      id,
      content,
      created_at,
      author_id,
      subject_id,
      profiles!author_id (
        id,
        nombre
      )
    `)
    .maybeSingle()

  return { data, error }
}
