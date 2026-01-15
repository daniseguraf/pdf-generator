import { Injectable } from '@nestjs/common'
import { CreateCommonAreaDto } from './dto/create-common-area.dto'
import { UpdateCommonAreaDto } from './dto/update-common-area.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CommonAreasService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCommonAreaDto: CreateCommonAreaDto) {
    return await this.prismaService.commonArea.create({
      data: createCommonAreaDto,
    })
  }

  async findAllByBuildingId(buildingId: number) {
    return await this.prismaService.commonArea.findMany({
      where: { buildingId, deletedAt: null },
    })
  }

  async findOne(id: number) {
    return await this.prismaService.commonArea.findUnique({
      where: { id, deletedAt: null },
    })
  }

  async update(commonAreaId: number, updateCommonAreaDto: UpdateCommonAreaDto) {
    return await this.prismaService.commonArea.update({
      where: { id: commonAreaId },
      data: updateCommonAreaDto,
    })
  }

  remove(id: number) {
    return `This action removes a #${id} commonArea`
  }
}
