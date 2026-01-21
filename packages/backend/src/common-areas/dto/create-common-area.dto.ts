import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsArray, IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator'
import { CommonAreas, DaysOfWeek } from 'generated/prisma/enums'
import {
  IsOptionalString,
  IsRequiredString,
} from 'src/common/decorators/validation.decorators'

export class CreateCommonAreaDto {
  @ApiProperty({
    example: CommonAreas.CAFETERIA,
    description: 'Common area type',
    enum: CommonAreas,
  })
  @IsEnum(CommonAreas)
  type: CommonAreas

  @ApiProperty({
    example: 1,
    description: 'Building ID',
  })
  @IsInt()
  @IsPositive()
  buildingId: number

  @IsOptionalString(1000, 'Common area description', 'Common area description')
  description?: string

  @ApiProperty({
    example: 20,
    description: 'Common area capacity',
  })
  @IsInt()
  @IsPositive()
  capacity: number

  @ApiProperty({
    example: 4,
    description: 'Common area maximum hours per reservation',
  })
  @IsInt()
  @IsPositive()
  maxHoursPerReservation: number

  @IsRequiredString(1, 8, '08:00:00', 'Common area open time (HH:MM:SS format)')
  openTime: string

  @IsRequiredString(
    1,
    200,
    '22:00:00',
    'Common area close time (HH:MM:SS format)'
  )
  closeTime: string

  @ApiPropertyOptional({
    example: [DaysOfWeek.MONDAY, DaysOfWeek.TUESDAY],
    description: 'Common area days available',
    enum: DaysOfWeek,
  })
  @IsArray()
  @IsEnum(DaysOfWeek, { each: true })
  @IsOptional()
  daysAvailable: DaysOfWeek[]
}
