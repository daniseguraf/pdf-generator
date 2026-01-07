import { Navigate } from 'react-router'
import { LoadingOverlay } from '@mantine/core'
import { useAuthContext } from '@features/auth/hooks/useAuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthContext()

  if (isLoading) {
    return <LoadingOverlay visible />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
