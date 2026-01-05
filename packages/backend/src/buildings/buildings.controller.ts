import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common'
import { BuildingsService } from './buildings.service'
import { CreateBuildingDto } from './dto/create-building.dto'
import { UpdateBuildingDto } from './dto/update-building.dto'
import { ApiTags } from '@nestjs/swagger'
import { Building } from 'src/buildings/entities/building.entity'
import {
  ApiCreateOperation,
  ApiDeleteOperation,
  ApiFindAllOperation,
  ApiFindOneOperation,
  ApiUpdateOperation,
} from 'src/common/decorators/api-responses.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { UserRole } from 'generated/prisma/client'
import { GetUser } from 'src/common/decorators/get-user.decorator'

@ApiTags('Buildings')
@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Post()
  @Auth(UserRole.MANAGER)
  @ApiCreateOperation('Create a new building', 'building', Building)
  create(
    @Body() createBuildingDto: CreateBuildingDto,
    @GetUser('id') userId: number
  ) {
    return this.buildingsService.create(createBuildingDto, userId)
  }

  @Get()
  @ApiFindAllOperation('Get all buildings', 'buildings', Building)
  findAll() {
    return this.buildingsService.findAll()
  }

  @Get(':id')
  @ApiFindOneOperation('Get a building by id', 'building', Building)
  findOne(@Param('id', ParseIntPipe) id: number) {
    if (id <= 0) {
      throw new BadRequestException('ID must be a positive number')
    }

    return this.buildingsService.findOne(id)
  }

  @Patch(':id')
  @Auth(UserRole.MANAGER)
  @ApiUpdateOperation('Update a building by id', 'building', Building)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBuildingDto: UpdateBuildingDto
  ) {
    return this.buildingsService.update(id, updateBuildingDto)
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN)
  @ApiDeleteOperation('Delete a building by id', 'building', Building)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.buildingsService.remove(id)
  }

  @Patch(':id/restore')
  @Auth(UserRole.ADMIN)
  @ApiUpdateOperation('Restore a deleted building', 'building', Building)
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.buildingsService.restore(id)
  }
}
