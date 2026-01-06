import { UserRole } from 'generated/prisma/client'

export const usersData = [
  {
    firstName: 'Usuario Admin 1',
    lastName: 'Administrador',
    email: 'admin@edificios.com',
    role: UserRole.ADMIN,
    isActive: true,
  },
  {
    firstName: 'Usuario Manager 1',
    lastName: 'Manager',
    email: 'manager1@edificios.com',
    role: UserRole.MANAGER,
    isActive: true,
  },
  {
    firstName: 'Usuario Manager 2',
    lastName: 'Manager',
    email: 'manager2@edificios.com',
    role: UserRole.MANAGER,
    isActive: true,
  },
  {
    firstName: 'Usuario Residente 1',
    lastName: 'Residente',
    email: 'resident1@edificios.com',
    role: UserRole.RESIDENT,
    isActive: true,
  },
]
