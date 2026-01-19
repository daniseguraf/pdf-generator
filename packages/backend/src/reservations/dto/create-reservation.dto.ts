import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsInt, IsNotEmpty, IsPositive } from 'class-validator'
import {
  IsOptionalString,
  IsRequiredString,
} from 'src/common/decorators/validation.decorators'

export class CreateReservationDto {
  @ApiProperty({
    example: 1,
    description: 'Common area ID',
  })
  @IsInt()
  @IsPositive()
  commonAreaId: number

  @ApiProperty({
    example: '2026-01-20',
    description: 'Reservation date',
  })
  @IsDate()
  @IsNotEmpty()
  date: Date

  @IsRequiredString(1, 200, '08:00', 'Reservation start time')
  startTime: string

  @IsRequiredString(1, 200, '10:00', 'Reservation end time')
  endTime: string

  @IsOptionalString(1000, 'Reservation notes', 'Reservation notes')
  notes?: string

  @ApiProperty({ example: 1, description: 'Number of attendees' })
  @IsInt()
  @IsPositive()
  attendees: number
}
