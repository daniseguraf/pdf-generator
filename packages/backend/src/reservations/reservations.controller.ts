import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ReservationsService } from './reservations.service'
import { CreateReservationDto } from './dto/create-reservation.dto'
import { UpdateReservationDto } from './dto/update-reservation.dto'
import { UserRole } from 'generated/prisma/enums'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { GetUser } from 'src/common/decorators/get-user.decorator'

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @Auth(UserRole.RESIDENT)
  create(
    @Body() createReservationDto: CreateReservationDto,
    @GetUser('id') userId: number
  ) {
    return this.reservationsService.create(createReservationDto, userId)
  }

  @Get()
  @Auth(UserRole.RESIDENT)
  findAll() {
    return this.reservationsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id)
  }

  @Patch(':id')
  @Auth(UserRole.RESIDENT)
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto
  ) {
    return this.reservationsService.update(+id, updateReservationDto)
  }

  @Delete(':id')
  @Auth(UserRole.RESIDENT)
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id)
  }
}
