import { supabase } from '../../../services/supabaseClient'

export async function fetchPostCountsBySubject() {
  const { data, error } = await supabase
    .from('posts')
    .select('subject_id')

  if (error) return { data: null, error }

  const counts = {}
  for (const post of data) {
    const key = post.subject_id ?? '__none__'
    counts[key] = (counts[key] ?? 0) + 1
  }
  return { data: counts, error: null }
}
