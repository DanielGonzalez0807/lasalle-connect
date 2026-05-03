import PostCard from './PostCard'

export default function PostList({ posts, loading, error }) {
  if (loading) return (
    <p style={{ fontSize: '14px', color: '#94a3b8', textAlign: 'center', padding: '32px 0' }}>
      Cargando publicaciones...
    </p>
  )
  if (error) return (
    <p style={{ fontSize: '14px', color: '#dc2626', textAlign: 'center', padding: '32px 0' }}>{error}</p>
  )
  if (posts.length === 0) return (
    <div style={{ textAlign: 'center', padding: '48px 0' }}>
      <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>No hay publicaciones aún. ¡Sé el primero!</p>
    </div>
  )

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
