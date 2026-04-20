import { supabase } from '../../../services/supabaseClient'

export async function fetchSubjects() {
  const { data, error } = await supabase
    .from('subjects')
    .select('id, name, code')
    .order('name', { ascending: true })

  return { data, error }
}
