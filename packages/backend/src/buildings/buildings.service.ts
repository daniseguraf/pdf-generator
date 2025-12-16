import { Injectable, NotFoundException } from '@nestjs/common'
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
      where: { deletedAt: null },
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
    const building = await this.prismaService.building.findUnique({
      where: { id },
    })

    if (!building) {
      throw new NotFoundException(`Building with id ${id} not found`)
    }

    return building
  }

  update(id: number, updateBuildingDto: UpdateBuildingDto) {
    const updatedBuilding = this.prismaService.building.update({
      where: { id },
      data: updateBuildingDto,
    })

    return updatedBuilding
  }

  async remove(id: number) {
    const deletedBuilding = await this.prismaService.building.update({
      where: { id },
      data: { deletedAt: new Date() },
    })

    if (!deletedBuilding) {
      throw new NotFoundException(`Building with id ${id} not found`)
    }

    return deletedBuilding
  }

  async restore(id: number) {
    const restoredBuilding = await this.prismaService.building.update({
      where: { id },
      data: { deletedAt: null },
    })

    if (!restoredBuilding) {
      throw new NotFoundException(`Building with id ${id} not found`)
    }

    return restoredBuilding
  }
}
