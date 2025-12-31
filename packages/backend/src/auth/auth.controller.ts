import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/auth/dto/create-user.dto'
import { LoginUserDto } from 'src/auth/dto/login-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto)
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }
}
