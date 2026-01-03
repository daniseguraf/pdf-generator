import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common'
import { User } from 'generated/prisma/client'

export const GetUser = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: User }>()
    const user = request.user

    if (!user)
      throw new InternalServerErrorException('User not found (request)')

    return data ? user[data] : user
  }
)
