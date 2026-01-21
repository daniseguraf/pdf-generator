import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { CreateCommonAreaDto } from './dto/create-common-area.dto'
import { UpdateCommonAreaDto } from './dto/update-common-area.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { PrismaClientKnownRequestError } from 'generated/prisma/internal/prismaNamespace'

@Injectable()
export class CommonAreasService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCommonAreaDto: CreateCommonAreaDto) {
    const { openTime, closeTime, ...commonAreaData } = createCommonAreaDto

    const openTimeDate = new Date(`1970-01-01T${openTime}Z`)
    const closeTimeDate = new Date(`1970-01-01T${closeTime}Z`)

    return await this.prismaService.commonArea.create({
      data: {
        ...commonAreaData,
        openTime: openTimeDate,
        closeTime: closeTimeDate,
      },
    })
  }

  async findAllByBuildingId(buildingId: number) {
    return await this.prismaService.commonArea.findMany({
      where: { buildingId, deletedAt: null },
      orderBy: {
        id: 'desc',
      },
    })
  }

  async findOne(id: number) {
    return await this.prismaService.commonArea.findUnique({
      where: { id, deletedAt: null },
    })
  }

  async update(commonAreaId: number, updateCommonAreaDto: UpdateCommonAreaDto) {
    const { openTime, closeTime, ...commonAreaData } = updateCommonAreaDto

    const openTimeDate = new Date(`1970-01-01T${openTime}Z`)
    const closeTimeDate = new Date(`1970-01-01T${closeTime}Z`)

    return await this.prismaService.commonArea.update({
      where: { id: commonAreaId },
      data: {
        ...commonAreaData,
        openTime: openTimeDate,
        closeTime: closeTimeDate,
      },
    })
  }

  async remove(commonAreaId: number) {
    await this.findOne(commonAreaId)

    try {
      return await this.prismaService.commonArea.update({
        where: { id: commonAreaId },
        data: { deletedAt: new Date() },
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Common area with id ${commonAreaId} not found`
          )
        }

        throw new InternalServerErrorException('Error deleting common area')
      }
    }
  }
}
