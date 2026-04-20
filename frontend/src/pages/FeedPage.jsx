import { useState } from 'react'
import { useAuth } from '../features/auth/hooks/useAuth'
import { usePosts } from '../features/posts/hooks/usePosts'
import { useProfile } from '../features/profile/hooks/useProfile'
import { useSubjects } from '../features/subjects/hooks/useSubjects'
import PostForm from '../features/posts/components/PostForm'
import PostList from '../features/posts/components/PostList'
import s from './FeedPage.module.css'

export default function FeedPage() {
  const { logout } = useAuth()
  const { profile } = useProfile()
  const { subjects } = useSubjects()
  const [selectedSubject, setSelectedSubject] = useState(null)
  const { posts, loading, error, prependPost } = usePosts(selectedSubject)

  return (
    <div className={s.page}>
      <header className={s.header}>
        <span className={s.brand}>LaSalle Connect</span>
        <div className={s.headerRight}>
          <span className={s.userName}>{profile?.nombre ?? 'Usuario'}</span>
          <button className={s.btnLogout} onClick={logout}>Cerrar sesión</button>
        </div>
      </header>

      <main className={s.main}>
        <select
          className={s.subjectSelect}
          value={selectedSubject ?? ''}
          onChange={(e) => setSelectedSubject(e.target.value || null)}
        >
          <option value="">Todas las materias</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
          ))}
        </select>

        <PostForm onPostCreated={prependPost} subjectId={selectedSubject} />
        <PostList posts={posts} loading={loading} error={error} />
      </main>
    </div>
  )
}
