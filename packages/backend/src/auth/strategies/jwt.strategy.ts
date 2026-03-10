import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtPayload } from 'src/auth/types/jwt-payload.types'
import { Request } from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prismaService: PrismaService,
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.accessToken as string,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') as string,
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.prismaService.user.findUnique({
      where: { id: payload.id },
    })

    if (!user) throw new UnauthorizedException('Invalid token')

    if (!user.isActive)
      throw new UnauthorizedException(
        'User is not active, ask admin to activate your account'
      )

    return user
  }
}
