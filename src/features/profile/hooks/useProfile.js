import { useSession } from '../../../app/AuthContext'

export function useProfile() {
  const { profile, loadingProfile, profileError } = useSession()
  return { profile, loading: loadingProfile, error: profileError }
}
