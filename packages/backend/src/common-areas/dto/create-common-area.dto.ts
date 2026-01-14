import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsArray, IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator'
import { CommonAreas, DaysOfWeek } from 'generated/prisma/enums'
import { IsOptionalString } from 'src/common/decorators/validation.decorators'

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

  @ApiPropertyOptional({
    example: 20,
    description: 'Common area capacity',
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  capacity?: number

  @ApiPropertyOptional({
    example: 4,
    description: 'Common area maximum hours per reservation',
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  maxHoursPerReservation?: number

  @IsOptionalString(200, '8:00 AM', 'Common area open time')
  openTime?: string

  @IsOptionalString(200, '10:00 PM', 'Common area close time')
  closeTime?: string

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
