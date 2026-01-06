import { Injectable } from '@nestjs/common'
import { User, UserRole } from 'generated/prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { usersData } from 'src/seed/data/usersData'
import { buildingsData } from 'src/seed/data/buildingsData'

@Injectable()
export class SeedService {
  constructor(private readonly prismaService: PrismaService) {}

  async generateSeed() {
    console.log('Generating seed...')

    await this.deleteAllData()

    const users = await this.seedUsers()
    await this.seedBuildings(users)

    return 'The database has been seeded'
  }

  async deleteAllData() {
    await this.prismaService.building.deleteMany()
    await this.prismaService.user.deleteMany()

    console.log('All data has been deleted')
  }

  private async seedUsers() {
    const hashedPassword = await bcrypt.hash('1234ABCabc$', 10)

    const users = await Promise.all(
      usersData.map(user =>
        this.prismaService.user.create({
          data: { ...user, password: hashedPassword },
        })
      )
    )

    return users
  }

  private async seedBuildings(users: User[]) {
    const managers = users.filter(u => u.role === UserRole.MANAGER)

    const buildings = await Promise.all(
      buildingsData.map(building =>
        this.prismaService.building.create({
          data: { ...building, managerId: managers[0].id },
        })
      )
    )

    return buildings
  }
}
