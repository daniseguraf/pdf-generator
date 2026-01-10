import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsArray, IsEmail, IsEnum, IsOptional } from 'class-validator'
import { Amenities, PropertyType } from 'generated/prisma/enums'
import {
  IsOptionalString,
  IsRequiredInt,
  IsRequiredString,
} from 'src/common/decorators/validation.decorators'

const CURRENT_YEAR = new Date().getFullYear()
const MIN_YEAR_BUILT = 1800

export class CreateBuildingDto {
  @IsRequiredString(1, 255, 'Main Building', 'Building name')
  name: string

  @IsOptionalString(1000, 'New building in the city', 'Building description')
  description?: string

  @IsRequiredInt(MIN_YEAR_BUILT, CURRENT_YEAR, 2020, 'Year built')
  yearBuilt: number

  @ApiProperty({
    example: PropertyType.RESIDENTIAL,
    description: 'Property type',
    enum: PropertyType,
  })
  @IsEnum(PropertyType)
  propertyType: PropertyType

  @IsRequiredString(5, 500, 'Main Street', 'Building address')
  address: string

  @IsRequiredString(1, 100, 'Main District', 'Building district')
  district: string

  @IsRequiredString(1, 100, 'Main City', 'Building city')
  city: string

  @IsRequiredString(1, 100, 'Main Province', 'Building province')
  province: string

  @IsOptionalString(100, '15001', 'Building postal code')
  postalCode?: string

  @IsRequiredInt(1, 200, 10, 'Number of floors')
  floors: number

  @IsOptionalString(20, '+51 987 654 321', 'Building phone number')
  phoneNumber?: string

  @ApiPropertyOptional({
    example: 'contact@building.com',
    description: 'Building email',
  })
  @IsOptional()
  @IsEmail()
  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.trim().toLowerCase() || undefined
      : undefined
  )
  email?: string

  @ApiProperty({
    example: [Amenities.ELEVATOR, Amenities.PARKING],
    description: 'Building amenities',
    isArray: true,
    enum: Amenities,
  })
  @IsArray()
  amenities: Amenities[]
}
