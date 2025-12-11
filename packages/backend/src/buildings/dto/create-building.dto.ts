import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
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
  MaxLength,
  Min,
  IsPhoneNumber,
} from 'class-validator'
import { PropertyType } from 'generated/prisma/enums'

const CURRENT_YEAR = new Date().getFullYear()
const MIN_YEAR_BUILT = 1800

export class CreateBuildingDto {
  @ApiProperty({
    description: 'Building name',
    example: 'Main Building',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  @Transform(
    ({ value }) => (typeof value === 'string' ? value.trim() : value) as string
  )
  name: string

  @ApiPropertyOptional({
    description: 'Building description',
    example: 'This is a building description',
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() || undefined : undefined
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
  @IsPhoneNumber('ES')
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
    example: 1,
    description: 'Manager ID',
  })
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? parseInt(value, 10) : Number(value)
  )
  managerId: number
}
