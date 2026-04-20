import { useState, useEffect } from 'react'
import { fetchSubjects } from '../services/subjectsService'

export function useSubjects() {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetchSubjects().then(({ data, error }) => {
      if (cancelled) return
      if (error) setError('No se pudieron cargar las materias.')
      else setSubjects(data ?? [])
      setLoading(false)
    })

    return () => { cancelled = true }
  }, [])

  return { subjects, loading, error }
}
