import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterUserDto as RegisterUserDto } from 'src/auth/dto/register-user.dto'
import { LoginUserDto } from 'src/auth/dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from 'src/common/decorators/get-user.decorator'
import { User, UserRole } from 'generated/prisma/client'
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard'
import { Roles } from 'src/auth/decorators/roles.decorator'
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

  @Get('private')
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoute(
    @GetUser('id') id: number,
    @GetUser('email') email: string,
    @GetUser('role') role: UserRole
  ) {
    return {
      id,
      email,
      role,
    }
  }

  @Get('private2')
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Roles(UserRole.RESIDENT)
  testingPrivateRoute2(
    @GetUser('id') id: number,
    @GetUser('firstName') firstName: string,
    @GetUser('lastName') lastName: string,
    @GetUser('email') email: string,
    @GetUser('role') role: UserRole
  ) {
    return {
      id,
      firstName,
      lastName,
      email,
      role,
    }
  }

  @Get('me')
  @Auth()
  me(@GetUser() user: User) {
    return user
  }
}
