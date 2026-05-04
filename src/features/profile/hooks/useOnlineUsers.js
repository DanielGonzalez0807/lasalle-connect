import { useState, useEffect } from 'react'
import { supabase } from '../../../services/supabaseClient'
import { fetchAllProfiles } from '../services/allProfilesService'

export function useOnlineUsers(currentUserId) {
  const [profiles, setProfiles] = useState([])
  const [onlineIds, setOnlineIds] = useState(new Set())

  useEffect(() => {
    fetchAllProfiles().then(({ data }) => {
      if (data) setProfiles(data)
    })
  }, [])

  useEffect(() => {
    if (!currentUserId) return

    const channel = supabase.channel('online-users', {
      config: { presence: { key: currentUserId } },
    })

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState()
        setOnlineIds(new Set(Object.keys(state)))
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ user_id: currentUserId, online_at: new Date().toISOString() })
        }
      })

    return () => { supabase.removeChannel(channel) }
  }, [currentUserId])

  return { profiles, onlineIds }
}
