import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { RegisterUserDto } from 'src/auth/dto/register-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from 'src/auth/dto/login-user.dto'
import { JwtPayload } from 'src/auth/types/jwt-payload.types'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    try {
      const user = await this.prismaService.user.create({
        data: {
          ...registerUserDto,
          password: bcrypt.hashSync(registerUserDto.password, 10),
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      })

      const accessToken = this.generateJwtToken({ id: user.id })

      return { ...user, accessToken }
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginUserDto.email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
      },
    })

    if (!user) throw new UnauthorizedException('User not found')

    const isPasswordValid = bcrypt.compareSync(
      loginUserDto.password,
      user.password
    )

    if (!isPasswordValid) throw new UnauthorizedException('Invalid password')

    const accessToken = this.generateJwtToken({ id: user.id })

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken,
    }
  }

  private generateJwtToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload)
  }
}
