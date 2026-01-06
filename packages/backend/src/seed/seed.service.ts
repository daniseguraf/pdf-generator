import { Injectable } from '@nestjs/common'
import {
  Amenities,
  PropertyType,
  User,
  UserRole,
} from 'generated/prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class SeedService {
  constructor(private readonly prismaService: PrismaService) {}

  async generateSeed() {
    console.log('Generating seed...')

    await this.deleteAllData()

    const users = await this.seedUsers()
    await this.seedBuildings(users)

    console.log('The database has been seeded')

    return 'The database has been seeded'
  }

  async deleteAllData() {
    await this.prismaService.building.deleteMany()
    await this.prismaService.user.deleteMany()

    console.log('All data has been deleted')
  }

  private async seedUsers() {
    const hashedPassword = await bcrypt.hash('1234ABCabc$', 10)

    const users = await Promise.all([
      this.prismaService.user.create({
        data: {
          firstName: 'Usuario Admin',
          lastName: 'Administrador',
          email: 'admin@edificios.com',
          password: hashedPassword,
          role: UserRole.ADMIN,
          isActive: true,
        },
      }),
      this.prismaService.user.create({
        data: {
          firstName: 'Usuario Manager 1',
          lastName: 'Manager',
          email: 'manager1@edificios.com',
          password: hashedPassword,
          role: UserRole.MANAGER,
          isActive: true,
        },
      }),
      this.prismaService.user.create({
        data: {
          firstName: 'Usuario Manager 2',
          lastName: 'Manager',
          email: 'manager2@edificios.com',
          password: hashedPassword,
          role: UserRole.MANAGER,
          isActive: true,
        },
      }),
      this.prismaService.user.create({
        data: {
          firstName: 'Usuario Residente 1',
          lastName: 'Residente',
          email: 'resident1@edificios.com',
          password: hashedPassword,
          role: UserRole.RESIDENT,
          isActive: true,
        },
      }),
    ])

    console.log(`${users.length} usuarios creados`)
    return users
  }

  private async seedBuildings(users: User[]) {
    const managers = users.filter(u => u.role === UserRole.MANAGER)

    const buildings = await Promise.all([
      this.prismaService.building.create({
        data: {
          name: 'Torre Vista Hermosa',
          description: 'Edificio residencial de lujo con vista panorámica',
          yearBuilt: 2020,
          propertyType: PropertyType.RESIDENTIAL,
          address: 'Av. Principal 123',
          district: 'San Isidro',
          city: 'Lima',
          province: 'Lima',
          postalCode: '15073',
          floors: 15,
          phoneNumber: '+51 1 234-5678',
          email: 'contacto@torrevistahermosa.com',
          isActive: true,
          managerId: managers[0].id,
          amenities: [
            Amenities.PARKING,
            Amenities.SECURITY_24_7,
            Amenities.ELEVATOR,
            Amenities.FIRE_ALARM,
            Amenities.CAMERAS,
          ],
        },
      }),
      this.prismaService.building.create({
        data: {
          name: 'Centro Empresarial Los Olivos',
          description: 'Moderno edificio de oficinas en zona comercial',
          yearBuilt: 2018,
          propertyType: PropertyType.COMMERCIAL,
          address: 'Jr. Comercio 456',
          district: 'Miraflores',
          city: 'Lima',
          province: 'Lima',
          postalCode: '15074',
          floors: 10,
          phoneNumber: '+51 1 987-6543',
          email: 'info@centrolosolivos.com',
          isActive: true,
          managerId: managers[1].id,
          amenities: [
            Amenities.PARKING,
            Amenities.SECURITY_24_7,
            Amenities.ELEVATOR,
            Amenities.WHEELCHAIR_ACCESS,
            Amenities.CAMERAS,
          ],
        },
      }),
      this.prismaService.building.create({
        data: {
          name: 'Residencial Las Flores',
          description: 'Complejo residencial familiar con áreas verdes',
          yearBuilt: 2015,
          propertyType: PropertyType.RESIDENTIAL,
          address: 'Calle Las Rosas 789',
          district: 'Surco',
          city: 'Lima',
          province: 'Lima',
          postalCode: '15023',
          floors: 8,
          phoneNumber: '+51 1 555-1234',
          email: 'administracion@lasflores.com',
          isActive: true,
          managerId: managers[0].id,
          amenities: [
            Amenities.PARKING,
            Amenities.ELEVATOR,
            Amenities.FIRE_ALARM,
          ],
        },
      }),
    ])

    console.log(`${buildings.length} edificios creados`)
    return buildings
  }
}
