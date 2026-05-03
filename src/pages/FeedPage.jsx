import { useState } from 'react'
import { useAuth } from '../features/auth/hooks/useAuth'
import { usePosts } from '../features/posts/hooks/usePosts'
import { useProfile } from '../features/profile/hooks/useProfile'
import { useSubjects } from '../features/subjects/hooks/useSubjects'
import PostForm from '../features/posts/components/PostForm'
import PostList from '../features/posts/components/PostList'
import PageLayout from '../components/layout/PageLayout'
import { Button } from '../components/ui'

export default function FeedPage() {
  const { logout } = useAuth()
  const { profile } = useProfile()
  const { subjects } = useSubjects()
  const [selectedSubject, setSelectedSubject] = useState(null)
  const { posts, loading, error, prependPost } = usePosts(selectedSubject)

  const headerActions = (
    <div className="flex flex-wrap items-center gap-2 text-white">
      <span className="text-sm font-medium hidden sm:inline">👤 {profile?.nombre ?? 'Usuario'}</span>
      <Button variant="secondary" size="md" className="bg-white text-lasalle-dark hover:bg-lasalle-yellow" onClick={logout}>
        Cerrar sesión
      </Button>
    </div>
  )

  return (
    <PageLayout actions={headerActions}>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold font-display text-lasalle-dark mb-2">Feed de Publicaciones</h1>
          <p className="text-slate-600">Comparte y descubre publicaciones de tu comunidad académica</p>
        </div>

        {/* Subject Selector */}
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <div>
            <label htmlFor="subject-select" className="block text-sm font-semibold text-slate-700 mb-3">📚 Filtrar por Materia</label>
            <select
              id="subject-select"
              className="w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 font-medium shadow-sm outline-none transition focus:border-lasalle-dark focus:ring-4 focus:ring-lasalle-yellow/20"
              value={selectedSubject ?? ''}
              onChange={(e) => setSelectedSubject(e.target.value || null)}
            >
              <option value="">Todas las materias</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Posts Section */}
        <div className="space-y-8">
          <PostForm onPostCreated={prependPost} subjectId={selectedSubject} />
          <PostList posts={posts} loading={loading} error={error} />
        </div>
      </div>
    </PageLayout>
  )
}
