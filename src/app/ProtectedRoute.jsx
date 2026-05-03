import { Navigate, Outlet } from 'react-router-dom'
import { useSession } from './AuthContext'

export default function ProtectedRoute() {
  const { session, isLoading } = useSession()

  if (isLoading) return <p>Cargando...</p>
  if (!session) return <Navigate to="/login" replace />

  return <Outlet />
}
