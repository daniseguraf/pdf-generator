import { Injectable } from '@nestjs/common'
import { CreateCommonAreaDto } from './dto/create-common-area.dto'
import { UpdateCommonAreaDto } from './dto/update-common-area.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CommonAreasService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCommonAreaDto: CreateCommonAreaDto, userId: number) {
    // return this.prismaService.commonArea.create({
    //   data: { ...createCommonAreaDto, buildingId: {where:} },
    // })
  }

  findAll() {
    return `This action returns all commonAreas`
  }

  findOne(id: number) {
    return `This action returns a #${id} commonArea`
  }

  update(id: number, updateCommonAreaDto: UpdateCommonAreaDto) {
    return `This action updates a #${id} commonArea`
  }

  remove(id: number) {
    return `This action removes a #${id} commonArea`
  }
}
