import { Module } from '@nestjs/common'
import { SeedService } from './seed.service'
import { SeedController } from './seed.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [PrismaModule, AuthModule],
})
export class SeedModule {}
