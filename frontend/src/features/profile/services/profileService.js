import { supabase } from '../../../services/supabaseClient'

export async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, nombre, role')
    .eq('id', userId)
    .maybeSingle()

  return { data, error }
}
