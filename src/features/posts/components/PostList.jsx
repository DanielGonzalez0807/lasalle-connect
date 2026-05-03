import PostCard from './PostCard'

export default function PostList({ posts, loading, error }) {
  if (loading) return <p className="text-sm text-slate-500">Cargando publicaciones...</p>
  if (error) return <p className="text-sm text-rose-700">{error}</p>
  if (posts.length === 0) return <p className="text-sm text-slate-500">No hay publicaciones aún. ¡Sé el primero!</p>

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
