import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { CreateBuildingDto } from './dto/create-building.dto'
import { UpdateBuildingDto } from './dto/update-building.dto'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

@Injectable()
export class BuildingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBuildingDto: CreateBuildingDto, userId: number) {
    try {
      return await this.prismaService.building.create({
        data: { ...createBuildingDto, managerId: userId },
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // P2002: Unique constraint violation
        if (error.code === 'P2002') {
          throw new ConflictException('Building with that email already exists')
        }

        // P2003: Foreign key constraint violation
        if (error.code === 'P2003') {
          throw new NotFoundException('User not found')
        }
      }

      throw new InternalServerErrorException('Error creating building')
    }
  }

  async findAll() {
    return await this.prismaService.building.findMany({
      where: { deletedAt: null },
      omit: this.removeDateFields(),
      include: this.setManager(),
      orderBy: {
        id: 'desc',
      },
    })
  }

  async findOne(id: number) {
    const building = await this.prismaService.building.findUnique({
      where: { id },
      omit: {
        deletedAt: true,
      },
      include: this.setManager(),
    })

    if (!building) {
      throw new NotFoundException(`Building with id ${id} not found`)
    }

    return building
  }

  async update(id: number, updateBuildingDto: UpdateBuildingDto) {
    await this.findOne(id)

    try {
      return await this.prismaService.building.update({
        where: { id },
        omit: this.removeDateFields(),
        data: updateBuildingDto,
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Ya existe un edificio con ese email')
        }

        if (error.code === 'P2025') {
          throw new NotFoundException(`Edificio con id ${id} no encontrado`)
        }

        throw new InternalServerErrorException('Error updating building')
      }
    }
  }

  async remove(id: number) {
    await this.findOne(id)

    try {
      return await this.prismaService.building.update({
        where: { id },
        data: { deletedAt: new Date() },
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Building with id ${id} not found`)
        }

        throw new InternalServerErrorException('Error deleting building')
      }
    }
  }

  async restore(id: number) {
    const building = await this.prismaService.building.findUnique({
      where: { id },
    })

    if (!building) {
      throw new NotFoundException(`Building with id ${id} not found`)
    }

    if (!building.deletedAt) {
      throw new ConflictException('Building is not deleted')
    }

    try {
      return await this.prismaService.building.update({
        where: { id },
        data: { deletedAt: null },
        omit: this.removeDateFields(),
        include: this.setManager(),
      })
    } catch (error) {
      throw new InternalServerErrorException('Error restoring building')
    }
  }

  private setManager() {
    return {
      manager: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    }
  }

  private removeDateFields() {
    return {
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    }
  }
}
