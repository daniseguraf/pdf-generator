import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsStrongPassword,
} from 'class-validator'
import { IsRequiredString } from 'src/common/decorators/validation.decorators'

export class RegisterUserDto {
  @IsRequiredString(1, 255, 'John Doe', 'User first name')
  firstName: string

  @IsRequiredString(1, 255, 'Doe', 'User last name')
  lastName: string

  @IsRequiredString(1, 255, 'john.doe@example.com', 'User email')
  @IsEmail()
  email: string

  @IsRequiredString(8, 255, 'password', 'User password')
  @IsStrongPassword()
  password: string

  @IsOptional()
  @IsInt()
  @IsPositive()
  buildingId?: number
}
