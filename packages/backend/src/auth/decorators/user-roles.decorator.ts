import { SetMetadata } from '@nestjs/common'
import { UserRole } from 'generated/prisma/client'

export const USER_ROLES_KEY = 'user_roles'

export const UserRoles = (...roles: UserRole[]) =>
  SetMetadata(USER_ROLES_KEY, roles)
