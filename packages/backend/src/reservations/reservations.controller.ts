import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common'
import { ReservationsService } from './reservations.service'
import { CreateReservationDto } from './dto/create-reservation.dto'
import { UserRole } from 'generated/prisma/enums'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { GetUser } from 'src/common/decorators/get-user.decorator'
import { User } from 'generated/prisma/client'
import { UpdateReservationDto } from 'src/reservations/dto/update-reservation.dto'

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

  @Get('building')
  @Auth(UserRole.RESIDENT)
  findBuildingByResidentId(@GetUser() user: User) {
    return this.reservationsService.findBuildingByResidentId(user)
  }

  @Patch(':id')
  @Auth(UserRole.MANAGER)
  updateReservationStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservationDto: UpdateReservationDto
  ) {
    return this.reservationsService.updateReservationStatus(
      id,
      updateReservationDto
    )
  }

  @Delete(':reservationId')
  @Auth(UserRole.RESIDENT, UserRole.MANAGER)
  remove(@Param('reservationId') reservationId: string) {
    return this.reservationsService.remove(+reservationId)
  }

  @Get('manager')
  @Auth(UserRole.MANAGER)
  findAllReservationsInBuildingsByManagerId(
    @GetUser('id') userId: number,
    @GetUser('role') role: UserRole
  ) {
    return this.reservationsService.findAllReservationsInBuildingsByManagerId(
      userId,
      role
    )
  }
}
