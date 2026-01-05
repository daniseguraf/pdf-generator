import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  IsPhoneNumber,
  IsArray,
} from 'class-validator'
import { Amenities, PropertyType } from 'generated/prisma/enums'
import {
  IsOptionalString,
  IsRequiredString,
} from 'src/common/decorators/validation.decorators'

const CURRENT_YEAR = new Date().getFullYear()
const MIN_YEAR_BUILT = 1800

export class CreateBuildingDto {
  @IsRequiredString(1, 255, 'Main Building', 'Building name')
  name: string

  @IsOptionalString(
    1000,
    'This is a building description',
    'Building description'
  )
  description?: string

  @ApiProperty({
    example: 2020,
    description: 'Year built',
  })
  @IsInt()
  @Min(MIN_YEAR_BUILT)
  @Max(CURRENT_YEAR)
  @Transform(({ value }) =>
    typeof value === 'string' ? parseInt(value, 10) : Number(value)
  )
  yearBuilt: number

  @ApiProperty({
    example: PropertyType.RESIDENTIAL,
    description: 'Property type',
    enum: PropertyType,
  })
  @IsEnum(PropertyType)
  propertyType: PropertyType

  @ApiProperty({
    example: 'Main Street',
    description: 'Building address',
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 500)
  @Transform(
    ({ value }) => (typeof value === 'string' ? value.trim() : value) as string
  )
  address: string

  @ApiProperty({
    example: 'Main District',
    description: 'Building district',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @Transform(
    ({ value }) => (typeof value === 'string' ? value.trim() : value) as string
  )
  district: string

  @ApiProperty({
    example: 'Main City',
    description: 'Building city',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @Transform(
    ({ value }) => (typeof value === 'string' ? value.trim() : value) as string
  )
  city: string

  @ApiProperty({
    example: 'Main Province',
    description: 'Building province',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @Transform(
    ({ value }) => (typeof value === 'string' ? value.trim() : value) as string
  )
  province: string

  @ApiProperty({
    example: '15001',
    description: 'Building postal code',
  })
  @IsString()
  @IsOptional()
  @Length(4, 10)
  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.trim().toUpperCase() || undefined
      : undefined
  )
  postalCode?: string

  @ApiProperty({
    example: 10,
    description: 'Number of floors',
  })
  @IsInt()
  @Min(1)
  @Max(200)
  @Transform(({ value }) =>
    typeof value === 'string' ? parseInt(value, 10) : Number(value)
  )
  floors: number

  @ApiProperty({
    example: '+51 987 654 321',
    description: 'Building phone number',
  })
  @IsOptional()
  @IsPhoneNumber()
  @Transform(({ value }) =>
    typeof value === 'string' && value.trim() ? value.trim() : undefined
  )
  phoneNumber?: string

  @ApiProperty({
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
    example: [Amenities.ELEVATOR],
    description: 'Building amenities',
    enum: Amenities,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(Amenities, { each: true })
  amenities?: Amenities[]
}
