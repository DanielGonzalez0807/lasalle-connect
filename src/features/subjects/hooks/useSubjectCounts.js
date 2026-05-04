import { useState, useEffect } from 'react'
import { fetchPostCountsBySubject } from '../services/subjectCountsService'

export function useSubjectCounts() {
  const [counts, setCounts] = useState({})

  useEffect(() => {
    let cancelled = false
    fetchPostCountsBySubject().then(({ data }) => {
      if (!cancelled && data) setCounts(data)
    })
    return () => { cancelled = true }
  }, [])

  return counts
}
