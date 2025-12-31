import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { CreateUserDto } from 'src/auth/dto/create-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from 'src/auth/dto/login-user.dto'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prismaService.user.create({
        data: {
          ...createUserDto,
          password: bcrypt.hashSync(createUserDto.password, 10),
        },
      })

      return user
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async login(loginUserDto: LoginUserDto) {
    /*
     * 1. Check if user exists
     * 2. Check if password is correct
     * 3. Generate JWT token
     * 4. Return token
     */

    const user = await this.prismaService.user.findUnique({
      where: { email: loginUserDto.email },
      select: {
        email: true,
        password: true,
      },
    })

    console.log(user)

    if (!user) throw new UnauthorizedException('User not found')

    const isPasswordValid = bcrypt.compareSync(
      loginUserDto.password,
      user.password
    )

    if (!isPasswordValid) throw new UnauthorizedException('Invalid password')

    return {
      message: 'Login successful',
      user: user,
    }
  }
}
