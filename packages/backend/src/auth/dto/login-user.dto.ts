import { IsEmail } from 'class-validator'
import { IsRequiredString } from 'src/common/decorators/validation.decorators'

export class LoginUserDto {
  @IsRequiredString(1, 255, 'john.doe@example.com', 'User email')
  @IsEmail()
  email: string

  @IsRequiredString(8, 255, 'password', 'User password')
  password: string
}
