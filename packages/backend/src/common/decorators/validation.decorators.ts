import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
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
    Transform(({ value }) =>
      typeof value === 'string' ? value.trim() || undefined : undefined
    )
  )
}
