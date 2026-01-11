import { Navigate } from 'react-router'
import { LoadingOverlay } from '@mantine/core'
import { useAuth } from '@features/auth/hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return <LoadingOverlay visible />

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return <>{children}</>
}
