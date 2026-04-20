import PostCard from './PostCard'

export default function PostList({ posts, loading, error }) {
  if (loading) return <p>Cargando publicaciones...</p>
  if (error) return <p>{error}</p>
  if (posts.length === 0) return <p>No hay publicaciones aún. ¡Sé el primero!</p>

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
