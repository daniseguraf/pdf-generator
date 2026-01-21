import { useAuth } from './useAuth'
import { UserRoleValues, type UserRole } from '@my-buildings/shared/index'

export const useRole = () => {
  const { user } = useAuth()
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user?.role) return false

    const rolesArray = Array.isArray(roles) ? roles : [roles]
    return rolesArray.includes(user.role)
  }

  const isAdmin = (): boolean => hasRole(UserRoleValues.ADMIN)
  const isManager = (): boolean => hasRole(UserRoleValues.MANAGER)
  const isResident = (): boolean => hasRole(UserRoleValues.RESIDENT)
  const isAdminOrManager = (): boolean =>
    hasRole([UserRoleValues.ADMIN, UserRoleValues.MANAGER])

  return {
    role: user?.role,
    hasRole,
    isAdmin,
    isManager,
    isResident,
    isAdminOrManager,
  }
}
