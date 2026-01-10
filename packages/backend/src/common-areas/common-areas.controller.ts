import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { CommonAreasService } from './common-areas.service'
import { CreateCommonAreaDto } from './dto/create-common-area.dto'
import { UpdateCommonAreaDto } from './dto/update-common-area.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { UserRole } from 'generated/prisma/enums'
import { GetUser } from 'src/common/decorators/get-user.decorator'

@Auth(UserRole.MANAGER)
@Controller('common-areas')
export class CommonAreasController {
  constructor(private readonly commonAreasService: CommonAreasService) {}

  @Post()
  create(
    @Body() createCommonAreaDto: CreateCommonAreaDto,
    @GetUser('id') userId: number
  ) {
    return this.commonAreasService.create(createCommonAreaDto, userId)
  }

  @Get()
  findAll() {
    return this.commonAreasService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commonAreasService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommonAreaDto: UpdateCommonAreaDto
  ) {
    return this.commonAreasService.update(+id, updateCommonAreaDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commonAreasService.remove(+id)
  }
}
