import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsInt, IsPositive, IsString } from 'class-validator'

export class AuthResponse {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  id: number

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsString()
  firstName: string

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsString()
  lastName: string

  @ApiProperty({
    description: 'User email',
    example: 'john.doe@example.com',
  })
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  accessToken: string
}
