import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator'

export const IsRequiredString = (
  minLength: number,
  maxLength: number,
  example: string,
  description: string
) => {
  return applyDecorators(
    ApiProperty({ example, description }),
    IsString(),
    IsNotEmpty(),
    Length(minLength, maxLength),
    Transform(({ value }) =>
      typeof value === 'string' ? value.trim() : (value as string)
    )
  )
}

export const IsOptionalString = (
  maxLength: number,
  example: string,
  description: string
) => {
  return applyDecorators(
    ApiPropertyOptional({ example, description }),
    IsString(),
    IsOptional(),
    MaxLength(maxLength),
    Transform(({ value }) => {
      if (!value || value === '0') return null

      if (typeof value === 'string' && value.trim().length > 0)
        return value.trim()

      return null
    })
  )
}

export const IsRequiredInt = (
  min: number,
  max: number,
  example: number,
  description: string
) => {
  return applyDecorators(
    ApiProperty({ example, description }),
    IsInt(),
    Min(min),
    Max(max),
    Transform(({ value }) =>
      typeof value === 'string' ? parseInt(value, 10) : Number(value)
    )
  )
}
