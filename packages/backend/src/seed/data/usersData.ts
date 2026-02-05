import { UserRole } from 'generated/prisma/client'

export const usersData = [
  {
    id: 1,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@mybuildings.com',
    role: UserRole.ADMIN,
    isActive: true,
  },
  {
    id: 2,
    firstName: 'Manager 1',
    lastName: 'User',
    email: 'manager1@mybuildings.com',
    role: UserRole.MANAGER,
    isActive: true,
  },
  {
    id: 3,
    firstName: 'Manager 2',
    lastName: 'User',
    email: 'manager2@mybuildings.com',
    role: UserRole.MANAGER,
    isActive: true,
  },
  {
    id: 4,
    firstName: 'Resident 1',
    lastName: 'User',
    email: 'resident1@mybuildings.com',
    role: UserRole.RESIDENT,
    isActive: true,
    buildingId: 1,
  },
  {
    id: 5,
    firstName: 'Resident 2',
    lastName: 'User',
    email: 'resident2@mybuildings.com',
    role: UserRole.RESIDENT,
    isActive: true,
    buildingId: 2,
  },
]
