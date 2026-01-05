import { Module } from '@nestjs/common'
import { BuildingsService } from './buildings.service'
import { BuildingsController } from './buildings.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [BuildingsController],
  providers: [BuildingsService],
  imports: [PrismaModule, AuthModule],
})
export class BuildingsModule {}
