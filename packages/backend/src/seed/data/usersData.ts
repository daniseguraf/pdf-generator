import { UserRole } from 'generated/prisma/client'

export const usersData = [
  {
    firstName: 'Usuario 1',
    lastName: 'Administrador',
    email: 'admin@edificios.com',
    role: UserRole.ADMIN,
    isActive: true,
  },
  {
    firstName: 'Usuario 2',
    lastName: 'Manager',
    email: 'manager1@edificios.com',
    role: UserRole.MANAGER,
    isActive: true,
  },
  {
    firstName: 'Usuario 3',
    lastName: 'Manager',
    email: 'manager2@edificios.com',
    role: UserRole.MANAGER,
    isActive: true,
  },
  {
    firstName: 'Usuario 4',
    lastName: 'Residente',
    email: 'resident1@edificios.com',
    role: UserRole.RESIDENT,
    isActive: true,
  },
]
