import { Controller, Post, Body, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterUserDto as RegisterUserDto } from 'src/auth/dto/register-user.dto'
import { LoginUserDto } from 'src/auth/dto/login-user.dto'
import { GetUser } from 'src/common/decorators/get-user.decorator'
import { User } from 'generated/prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { AuthResponse } from 'src/auth/entities/auth-response.entity'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: AuthResponse,
  })
  register(@Body() registerUserDto: RegisterUserDto): Promise<AuthResponse> {
    return this.authService.register(registerUserDto)
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully logged in',
    type: AuthResponse,
  })
  login(@Body() loginUserDto: LoginUserDto): Promise<AuthResponse> {
    return this.authService.login(loginUserDto)
  }

  @Get('check-auth-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user)
  }

  @Get('me')
  @Auth()
  me(@GetUser() user: User) {
    return this.authService.me(user)
  }
}
