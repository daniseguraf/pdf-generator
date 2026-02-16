import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateReservationDto } from './create-reservation.dto'
import { IsEnum } from 'class-validator'
import { ReservationStatus } from 'generated/prisma/enums'

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @ApiProperty({
    example: ReservationStatus.CONFIRMED,
    description: 'Reservation status',
    enum: ReservationStatus,
  })
  @IsEnum(ReservationStatus)
  status: ReservationStatus
}
