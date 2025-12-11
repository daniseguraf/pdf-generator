import { Injectable } from '@nestjs/common'
import { CreateBuildingDto } from './dto/create-building.dto'
import { UpdateBuildingDto } from './dto/update-building.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class BuildingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBuildingDto: CreateBuildingDto) {
    try {
      const response = await this.prismaService.building.create({
        data: createBuildingDto,
      })

      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async findAll() {
    return await this.prismaService.building.findMany({
      include: {
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    })
  }

  async findOne(id: number) {
    try {
      const building = await this.prismaService.building.findFirst({
        where: { id },
      })

      if (!building) {
        return `Building with id ${id} does not exist`
      }

      return building
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  update(id: number, updateBuildingDto: UpdateBuildingDto) {
    console.log('updateBuildingDto', id, updateBuildingDto)

    const updatedBuilding = this.prismaService.building.update({
      where: { id },
      data: updateBuildingDto,
    })

    return updatedBuilding
  }

  remove(id: number) {
    return `This action removes a #${id} building`
  }
}
