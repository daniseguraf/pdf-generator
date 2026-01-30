import { Navigate } from 'react-router'
import { LoadingOverlay, Stack, Text } from '@mantine/core'
import { useAuth } from '@features/auth/hooks/useAuth'
import type { UserRole } from '@my-buildings/shared/index'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth()

  if (isLoading) return <LoadingOverlay visible />

  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (allowedRoles && allowedRoles.length > 0) {
    if (!user?.role || !allowedRoles.includes(user.role)) {
      return (
        <Stack align="center" justify="center" h="100vh">
          <Text size="xl" fw={700}>
            Access denied
          </Text>
          <Text c="dimmed">You don't have permission to access this page</Text>
          <Navigate to="/" replace />
        </Stack>
      )
    }
  }

  return <>{children}</>
}
