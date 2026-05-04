import { supabase } from '../../../services/supabaseClient'

export async function fetchAllProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, nombre')
    .order('nombre', { ascending: true })

  return { data, error }
}
