import { Controller, Body, Get } from '@nestjs/common'
import { SeedService } from './seed.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { UserRole } from 'generated/prisma/client'

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(UserRole.ADMIN)
  seedDB() {
    return this.seedService.generateSeed()
  }
}
