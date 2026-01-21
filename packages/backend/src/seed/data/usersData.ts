import { UserRole } from 'generated/prisma/client'

export const usersData = [
  {
    id: 1,
    firstName: 'Usuario 1',
    lastName: 'Administrador',
    email: 'admin@edificios.com',
    role: UserRole.ADMIN,
    isActive: true,
  },
  {
    id: 2,
    firstName: 'Usuario 2',
    lastName: 'Manager',
    email: 'manager1@edificios.com',
    role: UserRole.MANAGER,
    isActive: true,
  },
  {
    id: 3,
    firstName: 'Usuario 3',
    lastName: 'Manager',
    email: 'manager2@edificios.com',
    role: UserRole.MANAGER,
    isActive: true,
  },
  {
    id: 4,
    firstName: 'Usuario 4',
    lastName: 'Residente',
    email: 'resident1@edificios.com',
    role: UserRole.RESIDENT,
    isActive: true,
    buildingId: 1,
  },
  {
    id: 5,
    firstName: 'Usuario 5',
    lastName: 'Residente',
    email: 'resident2@edificios.com',
    role: UserRole.RESIDENT,
    isActive: true,
    buildingId: 2,
  },
]
