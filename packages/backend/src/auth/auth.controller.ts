import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/auth/dto/create-user.dto'
import { LoginUserDto } from 'src/auth/dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from 'src/common/decorators/get-user.decorator'
import { UserRole } from 'generated/prisma/client'
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard'
import { UserRoles } from 'src/auth/decorators/user-roles.decorator'

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
  @UserRoles(UserRole.RESIDENT)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoute2(
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
}
