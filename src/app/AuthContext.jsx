import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { fetchProfile } from '../features/profile/services/profileService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined) // undefined = cargando, null = sin sesión
  const [profile, setProfile] = useState(null)
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [profileError, setProfileError] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (!session) { setProfile(null); setProfileError(null) }
    })

    return () => subscription.unsubscribe()
  }, [])

  const userId = session?.user?.id ?? null

  useEffect(() => {
    if (!userId) return
    if (profile?.id === userId) return // perfil ya cargado para este usuario

    let cancelled = false
    setLoadingProfile(true)
    setProfileError(null)

    fetchProfile(userId).then(({ data, error }) => {
      if (cancelled) return
      if (error) setProfileError('No se pudo cargar el perfil.')
      else setProfile(data ?? null)
      setLoadingProfile(false)
    })

    return () => { cancelled = true }
  }, [userId])

  return (
    <AuthContext.Provider value={{ session, isLoading: session === undefined, profile, loadingProfile, profileError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useSession() {
  return useContext(AuthContext)
}
