import { Controller, Post, Body, Get, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterUserDto as RegisterUserDto } from 'src/auth/dto/register-user.dto'
import { LoginUserDto } from 'src/auth/dto/login-user.dto'
import { GetUser } from 'src/common/decorators/get-user.decorator'
import { User, UserRole } from 'generated/prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { AuthResponse } from 'src/auth/entities/auth-response.entity'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Auth(UserRole.ADMIN)
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
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<AuthResponse> {
    const { accessToken, ...user } = await this.authService.login(loginUserDto)

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 1000,
      path: '/',
    })

    return user
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

  @Post('logout')
  @Auth()
  @ApiOperation({ summary: 'Logout user' })
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    })

    return { message: 'Session closed successfully' }
  }
}
