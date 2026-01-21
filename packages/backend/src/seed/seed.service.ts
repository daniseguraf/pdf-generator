import { Injectable } from '@nestjs/common'
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

    await this.seedUsers()
    await this.seedBuildings()
    await this.seedResidentUsers()

    return 'The database has been seeded'
  }

  async deleteAllData() {
    await this.prismaService.building.deleteMany()
    await this.prismaService.user.deleteMany()
    await this.prismaService.commonArea.deleteMany()
    await this.prismaService.reservation.deleteMany()

    console.log('All data has been deleted')
  }

  private async seedUsers() {
    const hashedPassword = await bcrypt.hash('1234ABCabc$', 10)

    const users = await Promise.all(
      usersData.map(user => {
        const { buildingId, ...userData } = user

        return this.prismaService.user.create({
          data: { ...userData, password: hashedPassword },
        })
      })
    )

    return users
  }

  private async seedBuildings() {
    const buildings = await Promise.all(
      buildingsData.map(building =>
        this.prismaService.building.create({
          data: building,
        })
      )
    )

    return buildings
  }

  private async seedResidentUsers() {
    const residentUsers = usersData.filter(user => user.buildingId)

    await Promise.all(
      residentUsers.map(residentUser => {
        return this.prismaService.user.update({
          where: { id: residentUser.id },
          data: { buildingId: residentUser.buildingId },
        })
      })
    )
  }
}
