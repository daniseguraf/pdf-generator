import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate, IsInt, IsNotEmpty, IsPositive } from 'class-validator'
import { IsOptionalString } from 'src/common/decorators/validation.decorators'

export class CreateReservationDto {
  @IsOptionalString(255, 'Reservation title', 'Reservation title')
  title?: string

  @ApiProperty({
    example: 1,
    description: 'Common area ID',
  })
  @IsInt()
  @IsPositive()
  commonAreaId: number

  @ApiProperty({
    example: '2026-01-20T14:00:00.000Z',
    description: 'Reservation start time (ISO 8601 format)',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startTime: Date

  @ApiProperty({
    example: '2026-01-20T15:00:00.000Z',
    description: 'Reservation end time (ISO 8601 format)',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  endTime: Date

  @IsOptionalString(1000, 'Reservation notes', 'Reservation notes')
  notes?: string

  @ApiProperty({ example: 1, description: 'Number of attendees' })
  @IsInt()
  @IsPositive()
  attendees: number
}
