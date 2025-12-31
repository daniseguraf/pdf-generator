import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from 'src/prisma/prisma.service'

type JwtPayload = {
  email: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prismaService: PrismaService,
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') as string,
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.prismaService.user.findUnique({
      where: { email: payload.email },
    })

    if (!user) throw new UnauthorizedException('Invalid token')

    if (!user.isActive) throw new UnauthorizedException('User is not active')

    return user
  }
}
